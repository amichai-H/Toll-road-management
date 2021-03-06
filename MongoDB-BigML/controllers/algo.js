const fs = require('fs');
var stringify = require('csv-stringify');
var stringify = require('stringify');
var stringBuilder = '"in","car","day","Special","color","out"\n';

let cars = new Map();
let cars_final = new Map();

function create_json_cars(car_json_data){
    console.log(car_json_data.length);
    car_json_data.forEach(element => {
        if(element.event === 1){
            cars.set(element.id,{
                "in":element.roadParts,
                "car":element.carType,
                "day":element.day,
                "special":element.Special,
                "color":element.color      
            })
        }
        if(element.event === 3){
            let temp_car = cars.get(element.id)
            if (temp_car!= undefined){
            temp_car["out"] = element.roadParts;
            cars_final.set(element.id,temp_car);

            }
           }
        })
    }
function logMapElements(value, key, map) {
    if(value["out"] != undefined)
        stringBuilder = stringBuilder + value["in"]+","+value["car"]+","+value["day"]+","+value["special"]+","+value["color"]+","+value["out"]+"\n"
  }

const build_data = (car_json_data)=>{
create_json_cars(car_json_data);
console.log("finish create json cars");
cars_final.forEach(logMapElements)
console.log(stringBuilder)
const test = fs.writeFileSync('events.csv', stringBuilder);
}


module.exports = build_data;


