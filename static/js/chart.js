document.addEventListener('DOMContentLoaded', function () {
    const sentiments = [
      "sadness", "annoyance", "neutral", "disapproval", "realization",
      "nervousness", "approval", "joy", "anger", "embarrassment",
      "caring", "remorse", "disgust", "grief", "confusion", "relief",
      "desire", "admiration", "optimism", "fear", "love", "excitement",
      "curiosity", "amusement", "surprise", "gratitude", "pride"
    ];
    const values = [15, 8, 20, 5, 10, 7, 18, 25, 12, 9, 14, 6, 4, 11, 17, 13, 16, 22, 19, 23, 28, 30, 21, 27, 24, 26, 29];
  
    // Dummy pie chart
    const ctxPie = document.getElementById('chartPie').getContext('2d');
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: sentiments,
        datasets: [{
          data: values,
          backgroundColor: [
            'red', 'blue', 'yellow', 'green', 'purple',
            'orange', 'pink', 'cyan', 'brown', 'teal',
            'lime', 'indigo', 'violet', 'salmon', 'navy',
            'olive', 'skyblue', 'lavender', 'peach', 'mauve',
            'maroon', 'gold', 'turquoise', 'plum', 'coral',
            'tan', 'orchid', 'slategray'
          ]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Sentiment Analysis (Pie Chart)'
        }
      }
    });
  
    // Dummy bar chart
    const ctxBar = document.getElementById('chartBar').getContext('2d');
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: sentiments,
        datasets: [{
          label: 'Sentiment Analysis',
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Sentiment Analysis (Bar Chart)'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  
    // Dummy line chart
    const ctxLine = document.getElementById('chartLine').getContext('2d');
    new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: sentiments,
        datasets: [{
          label: 'Sentiment Analysis',
          data: values,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Sentiment Analysis (Line Chart)'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  });
  
  
  