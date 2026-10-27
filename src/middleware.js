import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async ({ cookies, url, redirect, locals }, next) => {
  const password = locals.runtime.env?.CALENDAR_PASSWORD;
  const sessionCookie = cookies.get('calendar_session')?.value;

  if (url.pathname.startsWith('/api') || url.pathname === '/') {
    if (sessionCookie !== password || !password) {
      if (url.pathname.startsWith('/api')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }
      return redirect('/login');
    }
  }
  
  return next();
});
