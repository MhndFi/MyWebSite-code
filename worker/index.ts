import { jwtVerify, createRemoteJWKSet } from 'jose';

export interface Env {
  ASSETS: Fetcher;
  AVATAR_BUCKET: R2Bucket;
  ACCESS_AUD: string;
  ACCESS_TEAM_DOMAIN: string;
}

const AVATAR_KEY = 'avatar';
const MAX_BYTES = 1.5 * 1024 * 1024;
const ALLOWED_MIME = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' } as const;

// Per-isolate cache for the Access JWKS keyset.
const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();
const getJwks = (teamDomain: string) => {
  let jwks = jwksCache.get(teamDomain);
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`https://${teamDomain}/cdn-cgi/access/certs`));
    jwksCache.set(teamDomain, jwks);
  }
  return jwks;
};

async function verifyAccessJwt(
  request: Request,
  env: Env,
): Promise<{ ok: true; email: string } | { ok: false; reason: string }> {
  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token) return { ok: false, reason: 'missing assertion' };
  if (!env.ACCESS_TEAM_DOMAIN || env.ACCESS_TEAM_DOMAIN.startsWith('REPLACE_ME')) {
    return { ok: false, reason: 'ACCESS_TEAM_DOMAIN not configured' };
  }
  try {
    const { payload } = await jwtVerify(token, getJwks(env.ACCESS_TEAM_DOMAIN), {
      issuer: `https://${env.ACCESS_TEAM_DOMAIN}`,
      audience: env.ACCESS_AUD,
    });
    const email = typeof payload.email === 'string' ? payload.email : '';
    return { ok: true, email };
  } catch (err) {
    return { ok: false, reason: (err as Error).message };
  }
}

async function handleGetAvatar(env: Env): Promise<Response> {
  const object = await env.AVATAR_BUCKET.get(AVATAR_KEY);
  if (!object) return new Response('not found', { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('cache-control', 'public, max-age=30, must-revalidate');
  return new Response(object.body, { headers });
}

async function handlePostAvatar(request: Request, env: Env): Promise<Response> {
  const auth = await verifyAccessJwt(request, env);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: 'unauthorized', detail: auth.reason }), {
      status: 401,
      headers: JSON_HEADERS,
    });
  }

  const contentType = request.headers.get('content-type') || '';
  let bytes: ArrayBuffer;
  let mime = '';

  if (contentType.startsWith('multipart/form-data')) {
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'missing file field' }), { status: 400, headers: JSON_HEADERS });
    }
    mime = file.type;
    bytes = await file.arrayBuffer();
  } else if (ALLOWED_MIME.has(contentType)) {
    mime = contentType;
    bytes = await request.arrayBuffer();
  } else {
    return new Response(JSON.stringify({ error: 'unsupported content-type' }), { status: 415, headers: JSON_HEADERS });
  }

  if (!ALLOWED_MIME.has(mime)) {
    return new Response(JSON.stringify({ error: 'unsupported image type' }), { status: 415, headers: JSON_HEADERS });
  }
  if (bytes.byteLength === 0 || bytes.byteLength > MAX_BYTES) {
    return new Response(JSON.stringify({ error: 'file size out of range', maxBytes: MAX_BYTES }), {
      status: 413,
      headers: JSON_HEADERS,
    });
  }

  await env.AVATAR_BUCKET.put(AVATAR_KEY, bytes, {
    httpMetadata: { contentType: mime, cacheControl: 'public, max-age=30, must-revalidate' },
    customMetadata: { uploadedBy: auth.email || 'unknown', uploadedAt: new Date().toISOString() },
  });

  return new Response(JSON.stringify({ ok: true, bytes: bytes.byteLength, mime }), { headers: JSON_HEADERS });
}

async function handleDeleteAvatar(request: Request, env: Env): Promise<Response> {
  const auth = await verifyAccessJwt(request, env);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: 'unauthorized', detail: auth.reason }), {
      status: 401,
      headers: JSON_HEADERS,
    });
  }
  await env.AVATAR_BUCKET.delete(AVATAR_KEY);
  return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
}

async function handleSession(request: Request, env: Env): Promise<Response> {
  const auth = await verifyAccessJwt(request, env);
  if (!auth.ok) {
    return new Response(JSON.stringify({ authenticated: false }), { headers: JSON_HEADERS });
  }
  return new Response(JSON.stringify({ authenticated: true, email: auth.email }), { headers: JSON_HEADERS });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Public read — served outside /api/* so Cloudflare Access doesn't intercept it.
    if (path === '/avatar' && (request.method === 'GET' || request.method === 'HEAD')) {
      return handleGetAvatar(env);
    }
    // Backwards-compat: redirect the old /api/avatar GET (when not behind Access) to /avatar.
    if (path === '/api/avatar' && (request.method === 'GET' || request.method === 'HEAD')) {
      return Response.redirect(new URL('/avatar', url), 308);
    }

    // Admin endpoints — Cloudflare Access protects /api/admin/* and injects the JWT.
    if (path === '/api/admin/avatar') {
      if (request.method === 'POST' || request.method === 'PUT') return handlePostAvatar(request, env);
      if (request.method === 'DELETE') return handleDeleteAvatar(request, env);
      return new Response('method not allowed', { status: 405, headers: { allow: 'POST, PUT, DELETE' } });
    }

    if (path === '/api/admin/session' && request.method === 'GET') {
      return handleSession(request, env);
    }

    // Backwards-compatible redirects for the old paths.
    if (path === '/api/session') {
      return Response.redirect(new URL('/api/admin/session', url), 308);
    }
    if (path === '/api/avatar') {
      // non-GET on the public path → guide to admin endpoint
      return new Response('method not allowed on public endpoint; use /api/admin/avatar', {
        status: 405,
        headers: { allow: 'GET, HEAD' },
      });
    }

    if (path.startsWith('/api/')) {
      return new Response('not found', { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
