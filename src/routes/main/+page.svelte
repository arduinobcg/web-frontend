<script lang="ts">

import { Button, OverflowMenu } from 'carbon-components-svelte';
import { goto } from '$app/navigation';
import { RainDrop } from 'carbon-icons-svelte';
import Dev from '../../components/dev.svelte';
let selected: number;
	let devices = [1, 2, 3, 4, 5];
</script>

<h1>Dashboard</h1>

<Button on:click={() =>{ goto("/main/devices")}}>Manage devices</Button>

<div class="devicegrid">
	{#each devices as dev, i}
		<div
			on:click={() => {
				i === selected ? (selected = -1) : (selected = i);
			}}
			style={i == selected ? `width:100%;height:40em;order:-1` : null}
		>
			<Dev id={i} selected={i === selected} Icon={RainDrop} name={`${i}`} />
		</div>
	{/each}
</div>

<style lang="scss">
	.devicegrid {
		display: flex;
		flex-wrap: wrap;
		transition: all 1s ease-in-out;
		column-gap: 1em;
		row-gap: 1em;
	}
</style>
