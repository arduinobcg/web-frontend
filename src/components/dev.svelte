<script lang="ts">
	import { Button, OverflowMenu, Tile ,TextInput} from 'carbon-components-svelte';
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
	import { Close } from 'carbon-icons-svelte';
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
	<div style="position:relative;height:inherit;width:inherit">
		<div class="devq">
			
			<div class="justcenter">
				<Iconrenderer {icon} size="256" />
			</div>
			<div class="text">
				
				<h2>{name}</h2>
				<code style="padding-bottom:10px">{queueName}</code>
				<div style={`background-color:#00000033;${ linetorender.length !== 0 ? "padding:1em;" : ""}position:relative`}>
				<p style="position:relative">
					<!-- {JSON.stringify(text)} -->
					<!-- {JSON.stringify(linetorender)} -->
					{#each linetorender as k}
					<div style="display:grid;grid-auto-flow:column;padding-bottom:2px"><strong>{k[0]}</strong>{k[1]}</div>
					{/each}
					{#if linetorender.length == 0}
					No live data yet (≧﹏ ≦)
					{/if}
				</p>
			</div>
			<div class="mqttsend" >
				<TextInput size="xl" hideLabel labelText="MQTT mesage" placeholder="Enter MQTT message..." />
				<Button>Send</Button>
				
			</div>
			<Button on:click={() => window.location = `http://localhost:5173/main/history/${queueName}`}>View History</Button>
			</div>
			
			
			<!-- <Button kind="ghost" iconDescription="Delete" icon={Close} style="position:absolute;top:0;right:0;" on:click={() => selected=false}/> -->
		
			<!-- <div style="position:relative;height:100%;width:100%">
			
		</div> -->
	</div>

</div>
	{/if}
</div>

<style lang="scss">
	.mqttsend {
		display:flex;
		min-width:100%;

		bottom:0;
		position: absolute;
	}
	.text {
		display: block;
		position:relative;
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
		//display: flex;
		display: flex;
		// grid-template-columns: 1fr 1fr 1fr;
		// grid-template-rows: 1fr ;
		// grid-auto-flow: column;
		width: 100%;
		padding:2em;
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
		padding: 0em;
		width: inherit;
		height: inherit;
		transition: width 0.25s ease-out;
	}
</style>
