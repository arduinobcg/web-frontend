<script lang="ts">
	import { Button, OverflowMenu, Tile } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
	import { RainDrop } from 'carbon-icons-svelte';
	import type { SvelteComponentTyped } from 'svelte';
	export let name: string;
	export let selected: boolean = false;
	export let id: number = 0;
	export let icon: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	export let value:string;
	export let queueName:string;
	import { createEventDispatcher } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Iconrenderer from './iconrenderer.svelte';
	//style="width:min-content;padding:3em;margin:1em;transition: all 5s ease-in-out;transition-property: width height;transform: translate(0px);"
	const dispatch = createEventDispatcher();
	function disable() {
		dispatch('selected', {
			id
		});
	}
	let text:string;
	$: text = value[queueName]?.message;
	let linetorender = [];

	$:linetorender = text ? Object.keys(text).map(function(key) {
 return [key,text[key]]
}) : [];
// 	if (text) {
// 	Object.keys(text).forEach(function(key) {
//   linetorender = [...linetorender,(key,text[key])]
// })
// 	}
</script>

<div class={`hi${selected ? ' selected' : ''}`}>
	{#if !selected}
		<div class="dev">
			<Iconrenderer {icon} />
			<div style="width:max-content">
				<h5>{name}</h5>
				<!-- <p>{linetorender[0][0]}</p> -->
				<p>{linetorender[0] ? `${linetorender[0][0]}:${linetorender[0][1]}` : ''}</p>
			</div>
		</div>
	{/if}
	{#if selected}
		<div class="devq">
			<div class="justcenter">
				<Iconrenderer {icon} size="256" />
			</div>
			<div class="text">
				<h2>{name}</h2>
				<code>{queueName}</code>
				<p>
					<!-- {JSON.stringify(text)} -->
					<!-- {JSON.stringify(linetorender)} -->
					{#each linetorender as k}
					{k[0]}:{k[1]}
					<br>
					{/each}
				</p>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.text {
		max-width: 50%;
		text-overflow: ellipsis !important;
	}
	.ic {
		width: 48px;
		height: 48px;
		background-color: white;
	}
	.icbig {
		width: 256px;
		height: 256px;
		background-color: white;
	}
	.justcenter {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 50%;
	}
	.devq {
		display: flex;
		// grid-template-columns: 1fr 1fr 1fr;
		// grid-template-rows: 1fr ;
		// grid-auto-flow: column;
		width: 100%;
		height: 100%;
	}
	.dev {
		display: grid;
		// grid-template-columns: 1fr 1fr 1fr;
		// grid-template-rows: 1fr ;
		grid-auto-flow: column;
		width: 100%;
		height: 100%;
	}
	.hi {
		background-color: #262626;
		width: 20em;
		height: 10em;
		padding: 3em;
		// margin: 1em;
		transition: width 0.25s ease-out, height 0.125s ease-out;
		transform: scaleY();
	}
	.hi.selected {
		// position: absolute;
		width: inherit;
		height: inherit;
		transition: width 0.25s ease-out;
	}
</style>
