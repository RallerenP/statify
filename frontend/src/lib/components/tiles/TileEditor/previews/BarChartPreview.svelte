<script lang="ts">
  import Chart from "chart.js/auto"

  export let value
  let barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
      "#1e7145"
  ];
  let chart;
  let canvas;

  $: if (canvas) render(value);

  function render(value) {
      if (chart !== undefined) chart.destroy();

      chart = new Chart(canvas, {
          type: "bar",
          data: {
              labels: ["Italy", "France", "Spain"],
              datasets: [{
                  label: 'Dataset',
                  backgroundColor: barColors,
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
<div class="stat-desc">Comparing values in a visual format</div>
