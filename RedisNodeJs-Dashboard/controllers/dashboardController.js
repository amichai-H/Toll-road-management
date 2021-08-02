const path = require('path');

const renderDashboard = (req, res) => 
{
    res.render(path.join(__dirname, '../views/dashboard.ejs'));
}

const AllSectionStats = (socket, redis) => 
{
    redis.occurrenceOfField('carType', 3) // 3 possible types
    .then(reply => socket.emit('UpdatePieChart', reply, "In All Sections"))
    .catch(err => console.log(err));  

    redis.occurrenceOfField('event', 4) // 4 possible typesTrafficInfo
    .then(reply => socket.emit('UpdateBarChart', reply, 'In All Sections'))
    .catch(err => console.log(err));

    redis.occurrenceOfColors(5) // 5 possible colors
    .then(reply => socket.emit('UpdateColumnChart', reply))
    .catch(err => console.log(err)); 
}

const SectionStats = (socket, sectionNum, redis) => 
{
    redis.occurrenceOfFieldBySection(sectionNum, redis.multiValueCallback, 'carType', 3)// 3 possible types
    .then(reply => socket.emit('UpdatePieChart', reply, 'In Section ' + sectionNum))
    .catch(err => console.log(err));  

    redis.occurrenceOfFieldBySection(sectionNum, redis.multiValueCallback, 'event', 4)// 4 possible events
    .then(reply => socket.emit('UpdateBarChart', reply, 'In Section ' + sectionNum))
    .catch(err => console.log(err));

    redis.occurrenceOfFieldBySection(sectionNum, redis.multiValueCallback, 'color', 5) // 5 possible colors
    .then(reply => socket.emit('UpdateColumnChart', reply, sectionNum))
    .catch(err => console.log(err)); 
}

const TrafficInfo = (socket, redis) => 
{
  redis.numOfVehicles()
  .then(replies => socket.emit('UpdateStats', replies))
  .catch(err => console.log(err));

  redis.whatIsTheDay()
  .then(reply => socket.emit('UpdateDay', reply))
  .catch(err => console.log(err)); 

  redis.IsSpecialDay()
  .then(reply => socket.emit('UpdateSpecialDay', reply))
  .catch(err => console.log(err)); 
}

module.exports = {
    renderDashboard: renderDashboard,
    TrafficInfo: TrafficInfo,
    SectionStats: SectionStats,
    AllSectionStats: AllSectionStats
  };
