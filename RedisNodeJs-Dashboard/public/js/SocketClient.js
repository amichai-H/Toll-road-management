const socket = io('/');

let tds = document.getElementsByClassName("carNumInSection");
let whatDay = document.getElementById("CurrentDay");
let specialDay = document.getElementById("SpecialDay");
let totalNumOfVehicles = document.getElementById("TotalNum");

// this var store an interval the will used to ask the server for upadate with socket.io
let myInterval = null;


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

    // update total number of Vehicles
    totalNumOfVehicles.innerHTML = `Total Number Of Vehicles - <b>${totalVehicles}</b>`;

    // update gauge chart
    gaugeChart(NumOfVehiclesList, totalVehicles);
  
});

// update the column chart
socket.on('UpdateColumnChart', (ColorMat, sectionNum) => 
{
    columnChart(ColorMat, sectionNum);
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

const fetchChartsStats = () => 
{
    socket.emit('AllSectionStats');
}

const fetchSectionChartsStat = sectionNum => 
{
    socket.emit('SectionStat', sectionNum); 
}  

const fetchTrafficInfo = () => 
{
    socket.emit('TrafficInfo'); 
}  


const setMyInterval = (callback, param) => 
{
    clearInterval(myInterval); // clear prev interval before use
    // every 2 sec, param could be null
    myInterval = setInterval(callback, 1000, param);
}

/**
 * this function will be call on button click in the dashboard. for each section with diffrent paramter
 * @param sectionNum - could be null if user click on All Section button else if will be the section number
 */
const setViewType = sectionNum =>
{
    if(sectionNum == undefined)
        setMyInterval(fetchChartsStats);
    else
    setMyInterval(fetchSectionChartsStat, sectionNum);
}

// first time init
setInterval(fetchTrafficInfo, 1000);
setMyInterval(fetchChartsStats);
