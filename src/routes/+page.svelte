<script lang="ts">
import '@carbon/styles/css/styles.css';
import "carbon-components-svelte/css/g100.css";
import '@carbon/charts/styles.css';
import { LineChart } from "@carbon/charts-svelte";
import {Button} from "carbon-components-svelte";
import thLocaleObject from "date-fns/locale/th/index";
import {HttpTransportType, HubConnectionBuilder} from "@microsoft/signalr"
	import { onMount } from "svelte";
	import type { item } from '../types';
let hi;
let data:item;
let datatimeseries:item[]=[];
onMount(() => {
  async function foo() {
    hi = await a();
  }

  foo();

  return () => console.log('destroyed');
});

let connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5043/test",HttpTransportType.ServerSentEvents)
    .build();
connection.on("hi", res => {
    console.log(res);
    //data = [...data,res];
    // data=res.hi;
});

// console.log(connection);




async function a() {
    
await connection.start().catch(function (err) {
    return console.error("d",err.toString());
}).then(
  () => {
    let a = connection.stream("database")
    .subscribe({
        next: (item) => {
            console.log("next",item);
            data=JSON.parse(item)
            console.log(data);
            datatimeseries=[...datatimeseries,data]
        },
        complete: () => {
          console.log("complete")
          a.dispose()
        },
        error: (err) => {
          console.log("err",err)
        },
});
  }

)
}


</script>
<!-- {connection.invoke()} -->
<h1>LineGraph</h1>
{data && JSON.stringify(data,null)}
<br>
<Button on:click={ () => datatimeseries=[]}>Clear history</Button>

<LineChart
theme="g100"
  data={
    datatimeseries.map(item => {
      return { "group": "millis", "value": item.hi, "date": item.date.$date}
  })
  }
  options={{
    title: "Simple bar (discrete)",
    height: "400px",
    axes: {
      left: { mapsTo: "value" },
      bottom: { mapsTo: "date", scaleType: "time" },
    },
    timeScale:{
      localeObject:thLocaleObject
    }
  }}
/>
<style lang="scss">

  </style>