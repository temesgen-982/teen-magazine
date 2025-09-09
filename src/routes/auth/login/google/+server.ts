import { redirect } from '@sveltejs/kit'

export const GET =  async ({ request, locals: { supabase }, url }) => {
const { data } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${url.origin}/auth/callback`,
  },
})

if (data.url) {
  redirect(307, data.url) // use the redirect API for your server framework
}

    redirect(307, "/auth/error")
}
