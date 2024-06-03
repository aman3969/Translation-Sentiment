 // async function predictSentiment() {
//     try {
//         const text = document.getElementById('transcriptionOutput').textContent;
        
//         // Ensure the text is not empty before making the request
//         if (!text) {
//             alert('No text found in the transcription output.');
//             return;
//         }
        
//         const response = await fetch('http://127.0.0.1:5000/sentiment', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ text }) // Sending text as JSON
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json(); // Parse JSON response

 
//         predictedSentimentBox.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`; // Render data as HTML
//         predictedSentimentBox.textContent = JSON.stringify(data, null, 2); // Pretty print JSON//         console.log('Sentiment Analysis Results:', data);
        
//         const predictedSentimentBox =  document.getElementById('predictedSentiment');
//         predictedSentimentBox.style.color = 'blue';
//         predictedSentimentBox.style.fontSize = '16px';
//         predictedSentimentBox.style.fontWeight = 'bold';
//         predictedSentimentBox.style.textAlign = 'center';
        
//         // Show the side box after sentiment analysis
//         openSideBox();
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Error occurred during sentiment prediction.');
//     }
// }
function openSideBox() {
    document.getElementById('predictedSentiment').parentElement.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function openSideBoxWithLoading() {
const predictedSentimentBox = document.getElementById('predictedSentiment');
predictedSentimentBox.textContent = '';
predictedSentimentBox.parentElement.style.display = 'block';
document.body.style.overflow = 'hidden'; 
}
function closeSideBox() {
document.getElementById('predictedSentiment').parentElement.style.display = 'none';
document.body.style.overflow = 'auto';
}

async function predictSentiment() {
    try {
        const text = document.getElementById('transcriptionOutput').textContent;
        // const text = "Good morning, welcome to ShopX answering service, speaking with Jake. Good morning, mate. Hi there, you've come through to the answering service. Can I take a few details and get someone to give you a call back? Okay, you have my number? No, what's your number? 0470 0470 370 370 134 134, and your name? Sam. And your name? Sam. And your surname, Sam? Kashana. K-A-S-H-A-N-A. And do you know the four to five digit product code? The code of... If you don't, don't worry. It's fine. Don't worry. I have one minute. I want triple three. The LD? The LD code? Right. That one, 13337? 13337, thank you. And what seems to be the issue? 13337, I think. I think 13337, yeah. 13337, yeah. Okay, and what's the issue? I had some problems with the assembled. I read the guarantee. They say if you have any problem, you can call this number. Okay, no worries. So what I'll do is I'll send the details over now and I'll get someone to give you a call back as soon as they can. Okay. Okay, just a question mate. Do they charge any fees for the assembled? I'm not too sure just because I'm on the answering service and the office doesn't open until 9 o'clock. 9 o'clock, okay. Yeah. No worries. Okay. Just to be, my name is Sam, it's a short name, Samir, it's a S-A-M-E-R. Yeah, no worries. Okay, thank you. Thank you, bye."
        if (!text) {
            alert('No text found in the transcription output.');
            return;
        }
        const response = await fetch('/sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Sentiment Analysis Results:', data);

        // Extract labels and values from the sentiment data object
        const labels = Object.keys(data);
        const values = Object.values(data);
        // Render pie chart with the extracted data
        renderCharts(labels, values);
        // Show the side box after sentiment analysis
        openSideBox();
        // showLoader();
 
        document.getElementById('sideBoxText').innerText = text;
        const sentimentText = `Sentiment Analysis Results:\n\nLabels: ${labels.join(', ')}\nValues: ${values.join(', ')}`;
    } catch (error) {
        console.error('Error:', error);
        alert('Error occurred during sentiment prediction.');
    }
} 
let sentimentChartPie,sentimentChartBar,sentimentChartLine;
function renderCharts(labels, values) {
    const ctxPie = document.getElementById('sentimentChartPie').getContext('2d');
    const ctxBar = document.getElementById('sentimentChartBar').getContext('2d');
    const ctxLine = document.getElementById('sentimentChartLine').getContext('2d');
    // Destroy the previous chart instances if they exist
    if (sentimentChartPie) {
        sentimentChartPie.destroy();
    }
    if (sentimentChartBar) {
        sentimentChartBar.destroy();
    }
    if (sentimentChartLine) {
        sentimentChartLine.destroy();
    }

    // Create a new pie chart instance
    sentimentChartPie = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sentiment Analysis',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)', // Red
                    'rgba(54, 162, 235, 1)', // Blue
                    'rgba(255, 206, 86, 1)', // Yellow
                    'rgba(75, 192, 192, 1)', // Green
                    'rgba(153, 102, 255, 1)', // Purple
                    'rgba(255, 159, 64, 1)', // Orange
                    'rgba(199, 199, 199, 1)', // Grey
                    'rgba(83, 102, 255, 1)', // Indigo
                    'rgba(255, 0, 0, 1)', // Bright Red
                    'rgba(0, 255, 0, 1)', // Bright Green
                    'rgba(0, 0, 255, 1)', // Bright Blue
                    'rgba(255, 102, 204, 1)', // Pink
                    'rgba(102, 0, 51, 1)', // Dark Purple
                    'rgba(153, 153, 0, 1)', // Olive
                    'rgba(0, 102, 102, 1)', // Teal
                    'rgba(255, 255, 102, 1)', // Light Yellow
                    'rgba(255, 51, 51, 1)', // Light Red
                    'rgba(51, 255, 51, 1)', // Light Green
                    'rgba(102, 255, 255, 1)', // Light Cyan
                    'rgba(0, 51, 102, 1)', // Navy
                    'rgba(255, 128, 0, 1)', // Dark Orange
                    'rgba(128, 0, 0, 1)', // Maroon
                    'rgba(255, 102, 102, 1)', // Salmon
                    'rgba(153, 204, 255, 1)', // Sky Blue
                    'rgba(204, 255, 153, 1)', // Light Green
                    'rgba(204, 204, 255, 1)', // Lavender
                    'rgba(255, 204, 153, 1)', // Peach
                    'rgba(204, 153, 255, 1)' // Mauve
                ],
                borderColor: [
                   'rgba(255, 99, 132, 2.0)', // Red
                   'rgba(54, 162, 235, 2.0)', // Blue
                   'rgba(255, 206, 86, 2.0)', // Yellow
                   'rgba(75, 192, 192, 2.0)', // Green
                   'rgba(153, 102, 255, 2.0)', // Purple
                   'rgba(255, 159, 64, 2.0)', // Orange
                   'rgba(199, 199, 199, 2.0)', // Grey
                   'rgba(83, 102, 255, 2.0)', // Indigo
                   'rgba(255, 0, 0, 2.0)', // Bright Red
                   'rgba(0, 255, 0, 2.0)', // Bright Green
                   'rgba(0, 0, 255, 2.0)', // Bright Blue
                   'rgba(255, 102, 204, 2.0)', // Pink
                   'rgba(102, 0, 51, 2.0)', // Dark Purple
                   'rgba(153, 153, 0, 2.0)', // Olive
                   'rgba(0, 102, 102, 2.0)', // Teal
                   'rgba(255, 255, 102, 2.0)', // Light Yellow
                   'rgba(255, 51, 51, 2.0)', // Light Red
                   'rgba(51, 255, 51, 2.0)', // Light Green
                   'rgba(102, 255, 255, 2.0)', // Light Cyan
                   'rgba(0, 51, 102, 2.0)', // Navy
                   'rgba(255, 128, 0, 2.0)', // Dark Orange
                   'rgba(128, 0, 0, 2.0)', // Maroon
                   'rgba(255, 102, 102, 2.0)', // Salmon
                   'rgba(153, 204, 255, 2.0)', // Sky Blue
                   'rgba(204, 255, 153, 2.0)', // Light Green
                   'rgba(204, 204, 255, 2.0)', // Lavender
                   'rgba(255, 204, 153, 2.0)', // Peach
                   'rgba(204, 153, 255, 2.0)' // Mauve
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Sentiment Analysis (Pie Chart)'
            }
        }
    });
    // Create a new bar chart instance
    sentimentChartBar = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sentiment Analysis',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)', // Red
                    'rgba(54, 162, 235, 0.8)', // Blue
                    'rgba(255, 206, 86, 0.8)', // Yellow
                    'rgba(75, 192, 192, 0.8)', // Green
                    'rgba(153, 102, 255, 0.8)', // Purple
                    'rgba(255, 159, 64, 0.8)', // Orange
                    'rgba(199, 199, 199, 0.8)', // Grey
                    'rgba(83, 102, 255, 0.8)', // Indigo
                    'rgba(255, 0, 0, 0.8)', // Bright Red
                    'rgba(0, 255, 0, 0.8)', // Bright Green
                    'rgba(0, 0, 255, 0.8)', // Bright Blue
                    'rgba(255, 102, 204, 0.8)', // Pink
                    'rgba(102, 0, 51, 0.8)', // Dark Purple
                    'rgba(153, 153, 0, 0.8)', // Olive
                    'rgba(0, 102, 102, 0.8)', // Teal
                    'rgba(255, 255, 102, 0.8)', // Light Yellow
                    'rgba(255, 51, 51, 0.8)', // Light Red
                    'rgba(51, 255, 51, 0.8)', // Light Green
                    'rgba(102, 255, 255, 0.8)', // Light Cyan
                    'rgba(0, 51, 102, 0.8)', // Navy
                    'rgba(255, 128, 0, 0.8)', // Dark Orange
                    'rgba(128, 0, 0, 0.8)', // Maroon
                    'rgba(255, 102, 102, 0.8)', // Salmon
                    'rgba(153, 204, 255, 0.8)', // Sky Blue
                    'rgba(204, 255, 153, 0.8)', // Light Green
                    'rgba(204, 204, 255, 0.8)', // Lavender
                    'rgba(255, 204, 153, 0.8)', // Peach
                    'rgba(204, 153, 255, 0.8)' // Mauve
                ],
                borderColor: [
                    'rgba(255, 99, 132, 0.8)', // Red
                    'rgba(54, 162, 235, 0.8)', // Blue
                    'rgba(255, 206, 86, 0.8)', // Yellow
                    'rgba(75, 192, 192, 0.8)', // Green
                    'rgba(153, 102, 255, 0.8)', // Purple
                    'rgba(255, 159, 64, 0.8)', // Orange
                    'rgba(199, 199, 199, 0.8)', // Grey
                    'rgba(83, 102, 255, 0.8)', // Indigo
                    'rgba(255, 0, 0, 0.8)', // Bright Red
                    'rgba(0, 255, 0, 0.8)', // Bright Green
                    'rgba(0, 0, 255, 0.8)', // Bright Blue
                    'rgba(255, 102, 204, 0.8)', // Pink
                    'rgba(102, 0, 51, 0.8)', // Dark Purple
                    'rgba(153, 153, 0, 0.8)', // Olive
                    'rgba(0, 102, 102, 0.8)', // Teal
                    'rgba(255, 255, 102, 0.8)', // Light Yellow
                    'rgba(255, 51, 51, 0.8)', // Light Red
                    'rgba(51, 255, 51, 0.8)', // Light Green
                    'rgba(102, 255, 255, 0.8)', // Light Cyan
                    'rgba(0, 51, 102, 0.8)', // Navy
                    'rgba(255, 128, 0, 0.8)', // Dark Orange
                    'rgba(128, 0, 0, 0.8)', // Maroon
                    'rgba(255, 102, 102, 0.8)', // Salmon
                    'rgba(153, 204, 255, 0.8)', // Sky Blue
                    'rgba(204, 255, 153, 0.8)', // Light Green
                    'rgba(204, 204, 255, 0.8)', // Lavender
                    'rgba(255, 204, 153, 0.8)', // Peach
                    'rgba(204, 153, 255, 0.8)' // Mauve
                ],
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
    sentimentData = {
    labels: labels,
    datasets:[{
        label: 'Sentiment Analysis',
        data: values,
        backgroundColor: [
            'rgba(255, 99, 132, 0.4)', // Red
            'rgba(54, 162, 235, 0.4)', // Blue
            'rgba(255, 206, 86, 0.4)', // Yellow
            'rgba(75, 192, 192, 0.4)', // Green
            'rgba(153, 102, 255, 0.4)', // Purple
            'rgba(255, 159, 64, 0.4)', // Orange
            'rgba(199, 199, 199, 0.4)', // Grey
            'rgba(83, 102, 255, 0.4)', // Indigo
            'rgba(255, 0, 0, 0.4)', // Bright Red
            'rgba(0, 255, 0, 0.4)', // Bright Green
            'rgba(0, 0, 255, 0.4)', // Bright Blue
            'rgba(255, 102, 204, 0.4)', // Pink
            'rgba(102, 0, 51, 0.4)', // Dark Purple
            'rgba(153, 153, 0, 0.4)', // Olive
            'rgba(0, 102, 102, 0.4)', // Teal
            'rgba(255, 255, 102, 0.4)', // Light Yellow
            'rgba(255, 51, 51, 0.4)', // Light Red
            'rgba(51, 255, 51, 0.4)', // Light Green
            'rgba(102, 255, 255, 0.4)', // Light Cyan
            'rgba(0, 51, 102, 0.4)', // Navy
            'rgba(255, 128, 0, 0.4)', // Dark Orange
            'rgba(128, 0, 0, 0.4)', // Maroon
            'rgba(255, 102, 102, 0.4)', // Salmon
            'rgba(153, 204, 255, 0.4)', // Sky Blue
            'rgba(204, 255, 153, 0.4)', // Light Green
            'rgba(204, 204, 255, 0.4)', // Lavender
            'rgba(255, 204, 153, 0.4)', // Peach
            'rgba(204, 153, 255, 0.4)' // Mauve
        ],
        borderColor: [
            'rgba(255, 99, 132, 0.4)', // Red
            'rgba(54, 162, 235, 0.4)', // Blue
            'rgba(255, 206, 86, 0.4)', // Yellow
            'rgba(75, 192, 192, 0.4)', // Green
            'rgba(153, 102, 255, 0.4)', // Purple
            'rgba(255, 159, 64, 0.4)', // Orange
            'rgba(199, 199, 199, 0.4)', // Grey
            'rgba(83, 102, 255, 0.4)', // Indigo
            'rgba(255, 0, 0, 0.4)', // Bright Red
            'rgba(0, 255, 0, 0.4)', // Bright Green
            'rgba(0, 0, 255, 0.4)', // Bright Blue
            'rgba(255, 102, 204, 0.4)', // Pink
            'rgba(102, 0, 51, 0.4)', // Dark Purple
            'rgba(153, 153, 0, 0.4)', // Olive
            'rgba(0, 102, 102, 0.4)', // Teal
            'rgba(255, 255, 102, 0.4)', // Light Yellow
            'rgba(255, 51, 51, 0.4)', // Light Red
            'rgba(51, 255, 51, 0.4)', // Light Green
            'rgba(102, 255, 255, 0.4)', // Light Cyan
            'rgba(0, 51, 102, 0.4)', // Navy
            'rgba(255, 128, 0, 0.4)', // Dark Orange
            'rgba(128, 0, 0, 0.4)', // Maroon
            'rgba(255, 102, 102, 0.4)', // Salmon
            'rgba(153, 204, 255, 0.4)', // Sky Blue
            'rgba(204, 255, 153, 0.4)', // Light Green
            'rgba(204, 204, 255, 0.4)', // Lavender
            'rgba(255, 204, 153, 0.4)', // Peach
            'rgba(204, 153, 255, 0.4)' // Mauve
        ],
        borderWidth: 1,
        fill: true,
        lineTension: 0.1
    }]
};
    sentimentChartLine = new Chart(ctxLine, {
    type: 'line',
    data: sentimentData,
    options: {
        title: {
            display: true,
            text: 'Sentiment Analysis (Multi-line Chart)'
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

}
