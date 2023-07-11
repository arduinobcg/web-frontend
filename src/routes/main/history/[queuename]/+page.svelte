<script lang="ts">
	import { DataTable } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import { userToken } from '../../../store';
  import { SkeletonPlaceholder } from "carbon-components-svelte";
	console.log($page.params);
	let loading = true;
	let token: string | null;
	let data;
	let f;
	let d;
	let s;
	let y;
	let error;
	let key = new Set();
	userToken.subscribe(async (tok) => {
		console.log('dadada', tok);
		token = tok;
		loading = false;
		if (token !== null) {
			data = await fetch(
				`${import.meta.env.VITE_API_URL}/GetDeviceHistory?queuename=${$page.params.queuename}`,
				{ headers: { Authorization: `Bearer ${token}` } }
			)
				.then((e) => e.json())
				.catch((e) => (error = e));
			// console.log("dada",data)
			// let ee = {...data};
			for (let i = 0; i < data.data.length; i++) {
				d = Object.keys(data.data[i].data)
					.map(function (key) {
						return [key, data.data[i].data[key]];
					})
					.map((x) => x[0])
					.map((x) => {
						return x;
					})
					.filter((x) => x.key !== '_id');
				if (d) {
					d.forEach((x) => key.add(x));
					console.log(d);
				}
				console.log('set', key);
				// console.log(s);
				f = data.data.map((x, index) => {
					x.id = index;
					return x;
				});
				console.log(f);
				y = [
					...d.map((x) => {
						return { key: `data.${x}`, value: x };
					}),
					// { key: "data.chise", value: "chise" },
					// { key: "data.kawaii", value: "kawaii" },
					{ key: 'date.$date', value: 'Date' }
				];
				console.log(y);
			}
		}
	});
</script>

{#if data && f && y}
	<!-- {JSON.stringify(data.data[0].date.$date)} -->
	{#if f.length !== 0}
		<DataTable sortable title={$page.params.queuename} headers={y} rows={f} />
	{/if}
{:else}
{#if !data}
<SkeletonPlaceholder />
{/if}
{/if}
{#if error}
	{error.toString()}
{/if}
{#if data}
	{#if data.data.length === 0}
		No data yet
	{/if}
{/if}
