<script lang="ts">
  import { Chart } from "chart.js";
  import { generateColors } from "./Utils"
  import { onMount } from "svelte";

  // export let dataSource;
  export let type: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar"

  let canvas;
  let chart;
  export let data: any;
  let options: any;

  onMount(async () => {
    // data = await fetch(dataSource).then(res => res.json());

    if (type === "line") {
      options = { 
        backgroundColor: 'rgb(75, 192, 192)', 
        borderColor: 'rgb(75, 192, 192)',
      };
    }

    if (type === "scatter") {
      console.log(data)
      data = {
        value: {
          labels: [],
          numbers: data.value
        }
      }

      options = {
        backgroundColor: generateColors(data.value.numbers.length),
      }
    }
    
    render();

    
  });

  function render() {
    if (chart !== undefined) chart.destroy();
    chart = new Chart(canvas, {
      type,
      data: {
        labels: data.value.labels || [],
        datasets: [
          {
            backgroundColor: generateColors(data.value.labels.length),
            data: data.value.numbers,
            ...options
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

</script>

<canvas bind:this={canvas}></canvas>