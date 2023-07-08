<script lang="ts">
	import { Button, OverflowMenu } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
	import { RainDrop } from 'carbon-icons-svelte';
	import Dev from '../../components/dev.svelte';
	import { onMount } from 'svelte';
	import type { device } from '../../types';
	import { userResult } from '../store';
	import type { User } from 'firebase/auth';

	let selected: number;
	let user: User | null;

	let data: string | undefined;
	let res = async (token: string) =>
		fetch('http://localhost:5043/GetDevice', {
			headers: { Authorization: `Bearer ${token}` }
		}).then((e) => e.json()); //.then(JSON.parse);

	userResult.subscribe((value) => {
		user = value;
	});

	// onMount(async () => {
	// 	data = await user?.getIdToken().then((d) => res(d));//[1, 2, 3, 4, 5];
	// 	console.log(data);

	// //	console.log(res);
	// });
</script>

<h1>Dashboard</h1>

<Button
	on:click={() => {
		goto('/main/devices');
	}}>Manage devices</Button
>
<!-- {#await devices then dd} -->
{#await user?.getIdToken().then((d) => res(d)) then data}
	<div class="devicegrid">
		{#if user}
			{#each data as dev, i}
				<!-- {void console.log("ddad",data)} -->
				<div
					on:click={() => {
						i === selected ? (selected = -1) : (selected = i);
					}}
					style={i == selected ? `width:100%;height:40em;order:-1` : null}
				>
					<Dev id={i} selected={i === selected} icon={dev.icon} name={dev.name} />
				</div>
			{/each}
		{/if}
	</div>
{/await}

<!-- {/await} -->
<style lang="scss">
	.devicegrid {
		display: flex;
		flex-wrap: wrap;
		transition: all 1s ease-in-out;
		column-gap: 1em;
		row-gap: 1em;
	}
</style>
