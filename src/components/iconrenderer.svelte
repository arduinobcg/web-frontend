<script lang="ts">
	export let icon: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	export let size = 48;
</script>

{#if icon === 0}<div
		style={`background-color: white;width:${size}px;height:${size}px;max-width:${size}px;max-height:${size}px;mask-image:url(/icon/air--conditioner.svg)`}
	/>{/if}
{#if icon === 1}<div
		style={`background-color: white;width:${size}px;height:${size}px;max-width:${size}px;max-height:${size}px;mask-image:url(/icon/alarm.svg)`}
	/>{/if}
{#if icon === 2}<div
		style={`background-color: white;width:${size}px;height:${size}px;max-width:${size}px;max-height:${size}px;mask-image:url(/icon/chip--circuit.svg)`}
	/>{/if}
{#if icon === 3}<div
		style={`background-color: white;width:${size}px;height:${size}px;max-width:${size}px;max-height:${size}px;mask-image:url(/icon/electric.svg)`}
	/>{/if}
{#if icon === 4}<div
		style={`background-color: white;width:${size}px;height:${size}px;max-width:${size}px;max-height:${size}px;mask-image:url(/icon/faucet.svg)`}
	/>{/if}
{#if icon === 5}<div
		style={`background-color: white;width:${size}px;height:${size}px;max-width:${size}px;max-height:${size}px;mask-image:url(/icon/home--front.svg)`}
	/>{/if}
{#if icon === 6}<div
		style={`background-color: white;width:${size}px;height:${size}px;max-width:${size}px;max-height:${size}px;mask-image:url(/icon/wifi.svg)`}
	/>{/if}
