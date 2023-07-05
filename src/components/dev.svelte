<script lang="ts">
	import { Button, OverflowMenu, Tile } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
	import { RainDrop } from 'carbon-icons-svelte';
	import type { SvelteComponentTyped } from 'svelte';
	export let name: string;
	export let selected: boolean = false;
	export let id: number = 0;
	import { createEventDispatcher } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	//style="width:min-content;padding:3em;margin:1em;transition: all 5s ease-in-out;transition-property: width height;transform: translate(0px);"
	const dispatch = createEventDispatcher();
	function disable() {
		dispatch('selected', {
			id
		});
	}
</script>

<div class={`hi${selected ? ' selected' : ''}`}>
	{#if !selected}
		<div class="dev">
			<RainDrop size=128 />
			<div style="width:max-content">
				<h5>{name}</h5>
				<p>5 L/hour</p>
			</div>
		</div>
	{/if}
	{#if selected}
		<div class="devq">
			<div class="justcenter"><RainDrop size=128 /></div>
            <div class="text">
			<h2>hi {name}</h2>
            <p>hihihihihihihihihihihihhihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihi</p>
        </div>
		</div>
	{/if}
</div>

<style lang="scss">
    .text {
        max-width:50%;
        text-overflow:ellipsis !important;
    }
	.justcenter {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
        width:50%;
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
		height: 15em;
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
