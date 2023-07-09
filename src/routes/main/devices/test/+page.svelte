<script lang="ts">
	import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
	import type { User } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { userResult } from '../../../store';
	import { Button, OverflowMenu } from 'carbon-components-svelte';
    
let user:User|null;

let connection:HubConnection;
    userResult.subscribe((value) => {
            user = value;
        });


		// onMount(async () => {
		// 	await hubauth("")})
		async function dad() {
				await connection.invoke("NewMessage");
			}
        async function hubauth() {
			//console.error(token);
			let token = await user?.getIdToken();
			if (token == undefined)
			{
				console.log("token undef");
				token="";
			}
			connection = new HubConnectionBuilder()
		.withUrl('http://localhost:5043/test',{ transport:HttpTransportType.ServerSentEvents,accessTokenFactory: () => token||"" }) //headers:{"Authorization": `Bearer ${tokenn}`}
		.build();
		// connection.connection._accessToken=tokenn;

			console.log(connection);

			
			// connection.on("hi", (data) => {
			// 		console.log("data",data)
			// 	})
		let pro = await connection
			.start()
			.catch(function (err) {
				return console.error('d', err.toString());
			})
			.then(() => {
				let a = connection.stream('LiveRabbit').subscribe({
					next: (item) => {
						console.log('next', item);
					},
					complete: () => {
						console.log('complete');
						a.dispose();
					},
					error: (err) => {
						console.log('err', err);
					}

				 });
		 	});



}
</script>
{hubauth()}
{#if user}
{#await hubauth()}
dad
{:then}
dadad
{/await}
{/if}
<Button on:click={dad}>dadadd</Button>