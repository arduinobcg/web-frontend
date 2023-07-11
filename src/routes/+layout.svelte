<script lang="ts">
	// import '@carbon/styles/css/styles.css';
	// import 'carbon-components-svelte/css/g100.css';
	import "carbon-components-svelte/css/all.css";
	import '@carbon/charts/styles.css';
	import { Theme} from "carbon-components-svelte";
</script>

<Theme
  theme="g100"
  tokens={{
    "interactive-01": "#004c6c",
    "hover-primary": "#374955",
    "active-primary": "#4c5b69",
  }}
/>


<slot />
