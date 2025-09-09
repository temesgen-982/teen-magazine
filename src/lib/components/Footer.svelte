<script lang="ts">
	import type { Session } from '@supabase/supabase-js';
	import { Send } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';

	let { session }: { session: Session | null } = $props();

	const currentYear = new Date().getFullYear();
</script>

<footer class="mt-15 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
	<div class="container mx-auto px-4 py-12">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			<div class="space-y-4">
				<a href="/" class="text-2xl font-bold text-gray-900 dark:text-white">Teen Magazine</a>
				<p class="max-w-md text-sm text-gray-600 dark:text-gray-400">
					Empowering teens through digital content that inspires, educates, and connects. Your voice
					matters, and we are here to amplify it.
				</p>
				<div class="flex space-x-4">
					<a
						href="https://t.me/teenEthiopia"
						class="flex items-center gap-1 rounded-full border-2 border-blue-500 px-3 py-1 text-blue-500 hover:text-gray-900 dark:hover:text-white"
						aria-label="telegram"
					>
						<Send size={16} />
						<p>@teenEthiopia</p>
					</a>
				</div>
			</div>

			<div class="md:justify-self-end">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Stay updated</h3>
				<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
					Get the latest issues and announcements delivered directly to your inbox.
				</p>

				{#if !session}
					<div class="mt-4">
						<a href="/login">
							<Button variant="outline">Login to Subscribe</Button>
						</a>
					</div>
				{/if}
			</div>
		</div>

		<div
			class="mt-12 border-t border-gray-200 pt-4 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400"
		>
			<p>&copy; {currentYear} Teen Magazine. All Rights Reserved.</p>
		</div>
	</div>
</footer>
