import { redirect } from '@sveltejs/kit'

export const GET = async ({ locals: {supabase} }) => {

  await supabase.auth.signOut();

  // Redirect to homepage after logout
  redirect(307, "/");
}

