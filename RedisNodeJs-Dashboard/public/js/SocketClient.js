const socket = io('/');

let tds = document.getElementsByClassName("carNumInSection");
let whatDay = document.getElementById("CurrentDay");
let specialDay = document.getElementById("SpecialDay");
let totalNumOfVehicles = document.getElementById("TotalNum");


const mapNumToDay = 
{   
    1:'Sunday',
    2:'Monday',
    3:'Tuesday',
    4:'Wednesday',
    5:'Thursday',
    6:'Friday',
    7:'Saturday'
};

// update the stats table for each section
socket.on('UpdateStats', NumOfVehiclesList => 
{

    // update table
    if(NumOfVehiclesList.length != tds.length)
        console.log("error table length not match the input");
    else
    {
        for(i = 0; i < tds.length; i++) 
        {
            //console.log(NumOfCarsList[i]);
            tds[i].innerHTML = NumOfVehiclesList[i].toString();
        }
    }
    let totalVehicles = NumOfVehiclesList.reduce((a, b) => a + b, 0); // sum of all vehicles

    console.log(totalNumOfVehicles);
    // update total number of Vehicles
    totalNumOfVehicles.innerHTML = `Total Number Of Vehicles - <b>${totalVehicles}</b>`;

    // update gauge chart
    gaugeChart(NumOfVehiclesList, totalVehicles);
  
});

// update the pie chart
socket.on('UpdatePieChart', (carTypeArray, where) => 
{
    pieChart(carTypeArray, where);
});

// update the pie chart
socket.on('UpdateBarChart', (eventArray, where) => 
{
    barChart(eventArray, where);
});

// update the current Day
socket.on('UpdateDay', Day => 
{
    whatDay.innerHTML = "Current Day: " + mapNumToDay[Day];
});

// update the Special day
socket.on('UpdateSpecialDay', IsSpecialDay => 
{
    specialDay.innerHTML = "SpecialDay: " + IsSpecialDay;

});

