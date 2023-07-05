<script lang="ts">
	import { get } from 'svelte/store';
	import { Button, Tile } from 'carbon-components-svelte';
	import { login, loginAnonymous } from './firebase';
	import { userResult } from './store';
	import { goto } from '$app/navigation';
	userResult.subscribe((user) => {
		if (user) {
			goto('/main');
		}
	});
</script>

<div class="center">
	<Tile>
		<div class="loginPanel">
			<h1>Login</h1>
			<Button on:click={login}>Sign in with Google</Button>
			<Button on:click={loginAnonymous}>Continue as Anonymous</Button>
			<p>hi</p>
		</div>
	</Tile>
</div>

<style lang="scss">
	.center {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
