<script lang="ts">
	let { children } = $props();
</script>

<div class="flex p-8">
	<aside class="min-h-screen border p-8">
		<h2 class="mb-6 text-xl font-bold">Admin Panel</h2>
		<nav class="flex flex-col gap-2">
			<a href="/admin-dashboard" class="rounded p-2 hover:bg-gray-700">Dashboard</a>
			<a href="/admin-editions" class="rounded p-2 hover:bg-gray-700">Editions</a>
			<a href="/admin-announcements" class="rounded p-2 hover:bg-gray-700">Announcements</a>
			<a href="/admin-users" class="rounded p-2 hover:bg-gray-700">Users</a>
		</nav>
	</aside>

	<main class="flex-1 p-8">
		{@render children()}
	</main>
</div>
