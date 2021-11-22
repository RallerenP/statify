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
  
    $: if (canvas) {
        chart = new Chart(canvas, {
            type: "pie",
            data: {
                labels: ["Italy", "France", "Spain"],
                datasets: [{
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
  <div class="stat-desc">Overview over countries</div>
  