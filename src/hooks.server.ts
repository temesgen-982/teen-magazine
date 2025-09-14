import { createServerClient } from '@supabase/ssr'
import { type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

const supabase: Handle = async ({ event, resolve }) => {
  /**
   * Creates a Supabase client specific to this server request.
   *
   * The Supabase client gets the Auth token from the request cookies.
   */
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      /**
       * SvelteKit's cookies API requires `path` to be explicitly set in
       * the cookie options. Setting `path` to `/` replicates previous/
       * standard behavior.
       */
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      },
    },
  })

  /**
   * Unlike `supabase.auth.getSession()`, which returns the session _without_
   * validating the JWT, this function also calls `getUser()` to validate the
   * JWT before returning the session.
   */
  event.locals.safeGetSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    if (!session) {
      return { session: null, user: null }
    }

    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser()
    if (error) {
      // JWT validation has failed
      return { session: null, user: null }
    }

    return { session, user }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      /**
       * Supabase libraries use the `content-range` and `x-supabase-api-version`
       * headers, so we need to tell SvelteKit to pass it through.
       */
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })
}

const authGuard: Handle = async ({ event, resolve }) => {
  const { session } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = session?.user ?? null;

  if (session) {
    const { data: profile, error } = await event.locals.supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error.message);
    }
    
    event.locals.profile = profile;
  } else {
    event.locals.profile = null;
  }

  // --- Admin Route Guard ---
  if (event.url.pathname.startsWith('/admin')) {
    console.log('Checking admin access...');
    
    const isAdmin = event.locals.profile?.role === 'admin';

    if (!session || !isAdmin) {
      console.log('ACCESS DENIED. Redirecting to homepage.');
      redirect(303, '/'); // User is not an admin, kick them out.
    }
    
    console.log('ACCESS GRANTED. Proceeding to admin page.');
  }

  // --- General Protected Route Guard (Example for later) ---
  if (event.url.pathname.startsWith('/editions') || event.url.pathname.startsWith('/account')) {
    if (!session) {
      console.log('User not logged in. Redirecting to login.');
      redirect(303, '/auth/login');
    }
  }

  return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard)
