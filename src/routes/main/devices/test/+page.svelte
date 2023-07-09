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
			let tokenn= "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MWJiNGJkMWQwYzYxNDc2ZWIxYjcwYzNhNDdjMzE2ZDVmODkzMmIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQm9va3MgSG9yc2UiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZjhwcDNKU3IzYjZyeHNhTGltVDh2RkFsUUVHWEtQMXRrN1FRd1VJcjdkcGsxbj1zOTYtYyIsImFkbWluIjp0cnVlLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXJkdWlub2JjZyIsImF1ZCI6ImFyZHVpbm9iY2ciLCJhdXRoX3RpbWUiOjE2ODg4MzkzMzMsInVzZXJfaWQiOiJJSDJtRjRPMUJrWkJxWEtPZnUyYjF6OUFucm8xIiwic3ViIjoiSUgybUY0TzFCa1pCcVhLT2Z1MmIxejlBbnJvMSIsImlhdCI6MTY4ODg3MTY2NSwiZXhwIjoxNjg4ODc1MjY1LCJlbWFpbCI6ImF1Z3VzdC5qYTExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE4Mzc0Njk3OTcyNDE0OTU3MDQ1Il0sImVtYWlsIjpbImF1Z3VzdC5qYTExQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.fUTXYrZT45c4pfZCdc9OTNnaTvOp-OydJXynvfCnMeM-CqX8prQ-yczv2OI0ACPGInsJOHiCCUo6D39P3YlKFcokuVf9lc3i_L2DGOf8FGO8F_CwNNKq69oQdz_jaO-p5F54ftoszcLUTQ9MJ5736bfHwZnmdS0uoHrjRoT_olXP04OBoS-QgzXzhus4qSSg536Hqb34MX0c7KYgqgy_6cEhcUW2dN6uWUg44Q50loyZ8CImDWfu_v6ZlAV82-PHRqFWsxtFehWmr01Mn90DhDthhBCTJ1hrrLdzoEtbj4FElfp_sqzpLZpAz7DjohtDf8U8usXqew_GQ5l4zGEUKQ";
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