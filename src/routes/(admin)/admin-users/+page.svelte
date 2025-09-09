<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>

<div class="mx-auto max-w-2xl">
	<h1 class="mb-6 text-2xl font-bold">User Management</h1>

	<div class="rounded-md border">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Email</Table.Head>
					<Table.Head>Role</Table.Head>
					<Table.Head>Last Sign In</Table.Head>
					<Table.Head class="text-right">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.users as user (user.id)}
					<Table.Row>
						<Table.Cell class="font-medium">{user.email}</Table.Cell>
						<Table.Cell>
							<span
								class:text-green-500={user.role === 'admin'}
								class:font-bold={user.role === 'admin'}
							>
								{user.role}
							</span>
						</Table.Cell>
						<Table.Cell>
							{new Date(user.last_sign_in_at).toLocaleString()}
						</Table.Cell>
						<Table.Cell class="flex justify-end gap-2 text-right">
							{#if user.role === 'admin' && user.id !== data.session.user.id}
								<form method="POST" action="?/updateRole">
									<input type="hidden" name="userId" value={user.id} />
									<input type="hidden" name="newRole" value="user" />
									<Button variant="ghost" size="sm" type="submit">Remove Admin</Button>
								</form>
							{:else}
								<form method="POST" action="?/updateRole">
									<input type="hidden" name="userId" value={user.id} />
									<input type="hidden" name="newRole" value="admin" />
									<Button variant="outline" size="sm" type="submit">Make Admin</Button>
								</form>
							{/if}
							{#if user.id !== data.session.user.id}
								<form
									method="POST"
									action="?/deleteUser"
									use:enhance
									onsubmit={(e) => {
										e.preventDefault();
										if (
											confirm(
												`Are you sure you want to delete the user ${user.email}? This action cannot be undone.`
											)
										) {
											e.target.submit();
										}
									}}
								>
									<input type="hidden" name="userId" value={user.id} />
									<Button variant="destructive" size="sm" type="submit">Delete</Button>
								</form>
							{/if}
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
