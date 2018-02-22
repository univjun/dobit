var ctx = document.getElementById("myChart").getContext("2d");

// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });

var options = {

};


var data = {
    labels: ['EV1', 'EV2', 'EV3', 'EV4', 'EV5'],
    datasets: [{
        label:"파울라너",
        backgroundColor: "rgba(200,0,0,0.2)",
        pointRadius: 6,
        pointStyle: "star",
        pointBorderColor: "rgba(150,0,0,0.5)",
        borderColor: "rgba(0,0,200,0.6)",
        data: [20, 10, 8, 14, 15]
    }]
};
var myRadarChart = new Chart(ctx, {
    type: 'radar',
    options: {
        responsive: false,
        scale:{
            beginAtZero: true,
            min: 0,
            max: 30,
            stepSize: 10
        }
    },
    data: data
});
