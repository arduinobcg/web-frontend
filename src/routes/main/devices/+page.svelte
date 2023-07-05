<script lang="ts">
	import { Button, OverflowMenu, Tile,Modal,    FluidForm,TextInput} from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
	import { RainDrop } from 'carbon-icons-svelte';
	import Dev from '../../../components/dev.svelte';


    let plan:string;
    let open = false;
	let devices = [1, 2, 3, 4, 5];
    let forminvalid = false;
    $: forminvalid = !/^[a-zA-Z\d]{6,}$/.test(name);
    let name = "";
    function onsubmit() {
        if (name&&plan&&!forminvalid) {
        let json={name,icon:plan}
        console.log(JSON.stringify(json));
        open=false;
        }
    }

</script>

<h1>Devices</h1>

<Button on:click={()=>(open=true)}>Add a device</Button>

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
    <TextInput labelText="Display name" placeholder="Enter device display name..." invalid={forminvalid} invalidText="Length no less than 6, number and English alphabets only" bind:value={name} required />
    <p>Icon</p>
    <div role="group" aria-label="selectable tiles" class="gridd">
        <Button disabled={plan === "aircon"} on:click={() => {plan = "aircon"}}><div class="ic" style="mask-image:url(/icon/air--conditioner.svg)"/></Button>
        <Button disabled={plan === "alarm"} on:click={() => {plan = "alarm"}}><div class="ic" style="mask-image:url(/icon/alarm.svg)"/></Button>
        <Button disabled={plan === "chip"} on:click={() => {plan = "chip"}}><div class="ic" style="mask-image:url(/icon/chip--circuit.svg)"/></Button>
        <Button disabled={plan === "electric"} on:click={() => {plan = "electric"}}><div class="ic" style="mask-image:url(/icon/electric.svg)"/></Button>
        <Button disabled={plan === "faucet"} on:click={() => {plan = "faucet"}}><div class="ic" style="mask-image:url(/icon/faucet.svg)"/></Button>
        <Button disabled={plan === "home"} on:click={() => {plan = "home"}}><div class="ic" style="mask-image:url(/icon/home--front.svg)"/></Button>
        <Button disabled={plan === "wifi"} on:click={() => {plan = "wifi"}}><div class="ic" style="mask-image:url(/icon/wifi.svg)"/></Button>
      </div>
      <p>Icon: {plan||"None"}</p>
      
</Modal>

<style lang="scss">
    .ic {
        width:48px;
        height: 48px;
        background-color: white;
    }
    .gridd {
        display:grid;
        grid-template-columns: repeat(10, 1fr);
    }
</style>