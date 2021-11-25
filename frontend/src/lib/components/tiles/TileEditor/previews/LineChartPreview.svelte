<script lang="ts">
  import Chart from "chart.js/auto"

  export let value
  let chart;
  let canvas;

  $: if (canvas) render(value);

  function render(value) {
      if (chart !== undefined) chart.destroy();
      chart = new Chart(canvas, {
          type: "line",
          data: {
              labels: ["Italy", "France", "Spain"],
              datasets: [{
                  label: 'Dataset',
                  borderColor: 'rgb(75, 192, 192)',
                  data: value
              }]
          },
      options: {
          responsive: true,
          maintainAspectRatio: false,
      }
      }); 
  }
</script>

<div class="stat-value"><canvas width="100" bind:this={canvas}></canvas></div>
<div class="stat-desc">Overview over time</div>
