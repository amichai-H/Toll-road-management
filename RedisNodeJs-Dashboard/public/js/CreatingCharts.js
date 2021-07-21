  
  
let initEventMat =      
[
  ['Event Type', 'Percentage'],
  ["Enter Road", 0],
  ["Enter Section", 0],
  ["Exit Road", 0],
  ["Exit Section", 0],
];

  
let initCarTypeMat =      
[
  ['Vehicle Type', 'occurrence'],
  ['Truck', 0],
  ['Van', 0],
  ['Car', 0],
];


const gaugeChart = (NumOfVehiclesList, totalNumOfVehicles) =>
{
      google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        let data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Section1', 0],
          ['Section2', 0],
          ['Section3', 0],
          ['Section4', 0],
          ['Section5', 0]
        ]);

        let options = {
          width: 880, height: 350,
          redFrom: 80, redTo: 100,
          yellowFrom:50, yellowTo: 80,
          greenFrom:0, greenTo:50,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('gaugeChart'));

        // update gauge char by the percentage of number of vehicles in each section dvided by total * 100 to show the change on the chart
    
        for(let i = 0; i < NumOfVehiclesList.length; i++)
        {
          let percentage = (NumOfVehiclesList[i] / totalNumOfVehicles) * 100;
          data.setValue(i, 1, parseInt(percentage, 10));
        }  
        chart.draw(data, options);

      }
  }
  
  // this function will create a pie chart of a given matrix that contain number of vehicle in sections sorted by type
  // where paramter is a string the represnt where the info are from i.e section 1 or 2 or in the all road
const pieChart = (carTypeArray, where) =>
{

  // Load google charts
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  
  // Draw the chart and set the chart values
  function drawChart() {

    for(let i = 0; i < carTypeArray.length; i++)
    {
      // carTypeArray is based 0, and initCarTypeMat is based 1.
      // get the second cell in the inner array of initCarTypeMat
      initCarTypeMat[i+1][1] = carTypeArray[i];
    }

    let data = google.visualization.arrayToDataTable(initCarTypeMat);


    // Optional; add a title and set the width and height of the chart
    let options = { title:'Vehicle Types Distributions ' + where, width:460, height: 270 , pieHole: 0.4 };
    // Display the chart inside the <div> element with id="piechart"
    let chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
} 

// this function will create a column chart of a given matrix that contain number of vehicle in sections sorted by color
// where paramter is a string the represnt where the info are from i.e section 1 or 2 or in the all road
const columnChart = SectionsColorMatrix =>
{
    // Load google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart(){
          // Draw the chart and set the chart values
    let data = google.visualization.arrayToDataTable(SectionsColorMatrix);

    /*
      [
        ['Color', 'Blue', 'Red', 'Orange', 'Green', 'Purple'],
        ['1', 10, 24, 20, 32,2],
        ['2', 16, 22, 23, 30,3],
        ['3', 28, 19, 29, 30, 4]
      ]
    */
      let options = {
        width: 460,
        height: 270,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
        title: 'Vehicle Colors',
        hAxis: {
          title: 'Sections',
        },
        vAxis: {
          title: 'Number of Vehicles'
        }
      };
      let chart = new google.visualization.ColumnChart(document.getElementById("columnchart"));
      chart.draw(data, options);
    }
}

// this function will create a bar chart of a given matrix that contain number each sorted by event
// where paramter is a string the represnt where the info are from i.e section 1 or 2 or in the all road
const barChart = (eventArray, where) =>
{

// Load google charts
      google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

          for(let i = 0; i < eventArray.length; i++)
          {
            // eventArray is based 0, and initEventMat is based 1.
            // get the second cell in the inner array of initEventMat
            initEventMat[i+1][1] = eventArray[i];
          }
          let data = new google.visualization.arrayToDataTable(initEventMat);

          let options = {
            title: 'Event occurrences',
            width: 460,
            height: 270,
            legend: { position: 'none' },
            chart: { title: 'Event Ocurrences ' + where,
                    subtitle: 'Occurrences by percentage' },
            bars: 'horizontal', // Required for Material Bar Charts.
            axes: {
              x: {
                0: { side: 'top', label: 'Percentage'} // Top x-axis.
              }
            },
            bar: { groupWidth: "80%" }
          };
          let chart = new google.charts.Bar(document.getElementById('barchart'));
          chart.draw(data, options);
      };
};