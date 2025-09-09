<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	let { session } = $props();
</script>

<header class="mb-6 flex items-center justify-between border-b px-4 py-2">
	<NavigationMenu.Root viewport={false}>
		<NavigationMenu.List>
			<NavigationMenu.Item>
				<NavigationMenu.Link href="/"
					><img src="brand-logo.png" alt="brand-logo" class="w-[100px]" /></NavigationMenu.Link
				>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>

	<NavigationMenu.Root viewport={false} class="flex-grow">
		<NavigationMenu.List class="flex w-full items-center justify-between gap-4">
			<!-- Editions link -->
			<NavigationMenu.Item>
				<NavigationMenu.Link href="/editions">Editions</NavigationMenu.Link>
			</NavigationMenu.Item>

			<!-- Announcements link -->
			<NavigationMenu.Item>
				<NavigationMenu.Link href="/announcements">Announcements</NavigationMenu.Link>
			</NavigationMenu.Item>

			<!-- Auth dropdown / login -->
			<div>
				{#if session?.user}
					<NavigationMenu.Item>
						<NavigationMenu.Trigger>
							<Avatar.Root class="mx-2">
								<Avatar.Image src={session.user.user_metadata.avatar_url} alt="user avata" />
								<Avatar.Fallback>{session.user.email?.slice(0, 1).toUpperCase()}</Avatar.Fallback>
							</Avatar.Root>
							{session.user.user_metadata.name}
						</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<ul class="grid min-w-[150px] gap-1 p-2">
								{#if session.user.role === 'admin'}
									<li>
										<NavigationMenu.Link href="/admin-dashboard"
											>Admin Dashboard</NavigationMenu.Link
										>
									</li>
								{:else}
									<li>
										<NavigationMenu.Link href="/account">My Account</NavigationMenu.Link>
									</li>
								{/if}
								<li>
									<NavigationMenu.Link href="/auth/logout">Logout</NavigationMenu.Link>
								</li>
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
				{:else}
					<NavigationMenu.Item>
						<NavigationMenu.Link href="/auth/login">Login</NavigationMenu.Link>
					</NavigationMenu.Item>
				{/if}
			</div>

			<!-- Theme Toggler -->
			<Button onclick={toggleMode} variant="outline" size="icon">
				<SunIcon
					class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
				/>
				<MoonIcon
					class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</NavigationMenu.List>
	</NavigationMenu.Root>
</header>
