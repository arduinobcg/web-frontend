<script lang="ts">
	import {
		Button,
		OverflowMenu,
		Tile,
		Modal,
		FluidForm,
		TextInput
	} from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
	import { RainDrop, TrashCan } from 'carbon-icons-svelte';
	import Dev from '../../../components/dev.svelte';
	import { userResult } from '../../store';
	import type { User } from 'firebase/auth';
	import { onMount } from 'svelte';
	import Iconrenderer from '../../../components/iconrenderer.svelte';
	import {get, writable} from 'svelte/store'

	let plan: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 2;
	let open = false;
	let devices = [1, 2, 3, 4, 5];
	let forminvalid = false;
	$: forminvalid = !/^[a-zA-Z\d]{6,}$/.test(name);
	let name = '';
	let user: User | null;
	let rerender = false;
	userResult.subscribe((value) => {
		user = value;
	});

	async function onsubmit() {
		if (!forminvalid) {
			let json = { name, icon: plan };
			console.log(JSON.stringify(json));
			fetch(`${import.meta.env.VITE_API_URL}/AddDevice`, {
				headers: {
					Authorization: `Bearer ${await user?.getIdToken()}`,
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(json)
			}).then(() => open = false).then(() => rerender = !rerender);
			
		}
		
	}

	let data: string | undefined;
	let res = async (token: string) =>
		fetch(`${import.meta.env.VITE_API_URL}/GetDevice`, {
			headers: { Authorization: `Bearer ${token}` }
		}).then((e) => e.json()); //.then(JSON.parse);

	userResult.subscribe((value) => {
		user = value;
	});

    async function del(guid:string,token:string) {
        await fetch(`${import.meta.env.VITE_API_URL}/DeleteDevice?guid=${guid}`, {
			headers: { Authorization: `Bearer ${token}` },
            method:'DELETE'
		}).then(() => rerender = !rerender);
    }
</script>

<h1>Devices</h1>

<Button on:click={() => (open = true)}>Add a device</Button>

<Modal
	bind:open
	modalHeading="Add a device"
	primaryButtonText="Confirm"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:open
	on:close
	on:submit={onsubmit}
>
	<TextInput
		labelText="Display name"
		placeholder="Enter device display name..."
		invalid={forminvalid}
		invalidText="Length no less than 6, number and English alphabets only"
		bind:value={name}
		required
	/>
	<p>Icon</p>
	<div role="group" aria-label="selectable tiles" class="gridd">
		<Button
			disabled={plan === 0}
			on:click={() => {
				plan = 0;
			}}><div class="ic" style="mask-image:url(/icon/air--conditioner.svg)" /></Button
		>
		<Button
			disabled={plan === 1}
			on:click={() => {
				plan = 1;
			}}><div class="ic" style="mask-image:url(/icon/alarm.svg)" /></Button
		>
		<Button
			disabled={plan === 2}
			on:click={() => {
				plan = 2;
			}}><div class="ic" style="mask-image:url(/icon/chip--circuit.svg)" /></Button
		>
		<Button
			disabled={plan === 3}
			on:click={() => {
				plan = 3;
			}}><div class="ic" style="mask-image:url(/icon/electric.svg)" /></Button
		>
		<Button
			disabled={plan === 4}
			on:click={() => {
				plan = 4;
			}}><div class="ic" style="mask-image:url(/icon/faucet.svg)" /></Button
		>
		<Button
			disabled={plan === 5}
			on:click={() => {
				plan = 5;
			}}><div class="ic" style="mask-image:url(/icon/home--front.svg)" /></Button
		>
		<Button
			disabled={plan === 6}
			on:click={() => {
				plan = 6;
			}}><div class="ic" style="mask-image:url(/icon/wifi.svg)" /></Button
		>
	</div>
	<!-- <p>Icon: {plan||"None"}</p> -->
</Modal>
{#if user }
{#key rerender}
	{#await user?.getIdToken() then d}
    {#await res(d) then data}
		{#each data as a}
			<Tile style="margin:1em;padding:1em">
				<div class="card">
					<Iconrenderer icon={a.icon} size="48" />
					<div>
						<h2>{a.name}</h2>
						<b>MQTT Topic: </b><code>{a.queueName}</code>
					</div>
                    <Button kind="danger-tertiary" iconDescription="Delete" icon={TrashCan} on:click={async () => del(a.guid,d)}>Delete</Button>
				</div></Tile
			>
		{/each}
        {/await}
	{/await}
{/key}
{/if}
<style lang="scss">
	.card {
		display: grid;
	}
	.ic {
		width: 48px;
		height: 48px;
		background-color: white;
	}
	.gridd {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
	}
</style>
