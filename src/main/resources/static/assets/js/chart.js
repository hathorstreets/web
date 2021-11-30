import Chart from 'chart.js/auto';

export default new class Charto {
    constructor() {
      this.chart = '#myChart';
      this.handler();
    }
  
    handler() {
      $(() => {
        if($(this.chart).length){
          $.getJSON( "sales.json", ( data ) => {
            const ctx = $(this.chart);
            const myChart = new Chart(ctx, {
              type: 'line',
              data,
              options: {
                scales: {
                  y: {
                      beginAtZero: true
                    }
                  }
              }
            });
          })
        }
      })
    }
  }();
  