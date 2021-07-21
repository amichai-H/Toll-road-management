const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on("error", (error) => {
    console.error(error);
});

// this function take a given message and store it the given section hashset, and store the vehicle id as key, the rest as value
const storeData = messegeJson => 
{
    return new Promise((resolve, reject) => {
        const sectionNum = messegeJson.roadParts;
        const vehicleID = messegeJson.id;

        notifySections(vehicleID)
        .then(() =>
        {
            client.hset("Section" + sectionNum, [vehicleID, JSON.stringify(messegeJson)],(err, reply) =>
            {
                if (err) reject(err);
                resolve(reply); // json
            });
        }).catch(err => 
        {
            reject(err); // notifySections return err
        })
    });
};

const fetchSectionData = sectionNum => 
{
    return new Promise((resolve, reject) => {

        client.hgetall("Section" + sectionNum ,(err, reply) => 
        {
            if (err) reject(err);
            resolve(reply); // json
            //console.log("get " + JSON.stringify(reply)) // should be a list
        });
    });
};

// this function will delete the given vehicle id from each section, this function will call before we store the updated section of the vehicle
const notifySections = vehicleID => {
    return new Promise((resolve, reject) => {
        client.multi([
            ["hdel", ["Section1", vehicleID]],
            ["hdel", ["Section2", vehicleID]],
            ["hdel", ["Section3", vehicleID]],
            ["hdel", ["Section4", vehicleID]],
            ["hdel", ["Section5", vehicleID]]

        ]).exec((err, replies) => 
        {
            if(err) reject(err);
            resolve(replies);
        });
    });
};

// return the number of vehicles in given section
const numOfVehiclesBySection = sectionNum => 
{
   return new Promise((resolve, reject) => {
        client.hlen("Section" + sectionNum ,(err, reply) => 
        {
            if (err) reject(err);
            resolve(reply);
        });
    });
};


// return array of the total number of cars of each section 
const numOfVehicles = () => {
    return new Promise((resolve, reject) => {
        let numberofCars = 0;

        client.multi([
            ["hlen", ["Section1"]],
            ["hlen", ["Section2"]],
            ["hlen", ["Section3"]],
            ["hlen", ["Section4"]],
            ["hlen", ["Section5"]]

        ]).exec((err, replies) =>
            {
                if (err) reject(err);
                // sum the number of Vehicles in each section

                // replies.forEach(n =>
                // {
                //     numberofCars += n;
                // });
                resolve(replies);
            });
    });
};
/*
    return array of values, the values will be decided by the given 'field' string function
    options: 'carType', 'color', 'event'.
*/
const occurrenceOfFieldBySection = (sectionNum, callback, field, len)=> 
{
   return new Promise((resolve, reject) => {           
            //fetch all section values
            client.hvals("Section" + sectionNum ,(err, reply) => 
            {
                if (err) reject(err);
                callback(resolve, reply, field, len);
            })
    });
};


/** 
   return array of field inside a given resolve from the caller i.e
   array that contain the calculated number of occurrence in the loop of that 'field'.

   @param field - is of type string that represent a key in the reply inner objects
   @param len - is the number of the possible diffrent variants in the given field
*/
const multiValueCallback = (resolve, reply, field, len) => 
{
    let typesNum = new Array(len).fill(0);
     
    reply.forEach(dataObj => 
    {
        let typeIndex = JSON.parse(dataObj)[field];
        typesNum[typeIndex - 1]++;
    });
    resolve(typesNum);
}


const singleValueCallback = (resolve, reply, field) => 
{        
    resolve(JSON.parse(reply[0])[field]);
}

/**  
    return array of arrays that each one contain the number of color occurrence in each section
    i.e sum all the occurrence of each section
    @param len - is the number of possible vehicle colors
*/
const occurrenceOfColors = len => 
{
    return new Promise((resolve, reject) => {           

        // waiting for all promises resolve
        const array = (async() => 
                    {
                        const result = await Promise.all([
                            occurrenceOfFieldBySection(1, multiValueCallback, 'color', len),
                            occurrenceOfFieldBySection(2, multiValueCallback, 'color', len),
                            occurrenceOfFieldBySection(3, multiValueCallback, 'color', len),
                            occurrenceOfFieldBySection(4, multiValueCallback, 'color', len),
                            occurrenceOfFieldBySection(5, multiValueCallback, 'color', len),
                        ]);

                        console.log(result);

                        return result;
                    }
                    )();
        array.then(reply => resolve(reply))
             .catch(err => reject(err));
    });
}   
/**
    return array that each cell contain the number of the given field occurrence in all section
    i.e sum all the occurrence of each section
    the field options are: 
    event, carType
    @param field - is of type string that represent a key in the reply inner objects
    @param len - is the number of the possible diffrent variants in the given field

*/
const occurrenceOfField = (field, len) => 
{

    return new Promise((resolve, reject) => {           

        // waiting for all promises resolve
        const array = (async() => 
                    {
                        const result = await Promise.all([
                            occurrenceOfFieldBySection(1, multiValueCallback, field, len),
                            occurrenceOfFieldBySection(2, multiValueCallback, field, len),
                            occurrenceOfFieldBySection(3, multiValueCallback, field, len),
                            occurrenceOfFieldBySection(4, multiValueCallback, field, len),
                            occurrenceOfFieldBySection(5, multiValueCallback, field, len),
                        ]);
                        return result;
                    }
                    )();
        array.then(reply => 
        {
                let resArray = [];
                for(let i = 0; i < len; i++) // for each section 1 - 5, result is zero based
                    resArray[i] = reply[0][i] + reply[1][i] + reply[2][i] + reply[3][i] + reply[4][i];

                resolve(resArray);

        }).catch(err => reject(err));
    });
}


// clear the DB from redis client
const clearDB = () => 
{
    client.flushall('ASYNC', (err, reply) => 
    {
        if(err) console.log(err);
        else console.log(reply);
    });
}

/**
 * 
 * return the current day 
 */
const whatIsTheDay = () =>
{
    return new Promise((resolve, reject) => {           
        // same day for any section
        occurrenceOfFieldBySection(1, singleValueCallback, 'day')
        .then(reply => resolve(reply)) // list size must be 1
        .catch(err => reject(err));
    });
}

/**
 * return boolean if it is special day
 */
 const IsSpecialDay = () =>
 {
     return new Promise((resolve, reject) => {           
         // same day for any section
         occurrenceOfFieldBySection(1, singleValueCallback, 'Special')
         .then(reply => resolve(reply)) // list size must be 1
         .catch(err => reject(err));
     });
 }

module.exports = {
    storeData: storeData,
    fetchSectionData: fetchSectionData,
    numOfVehicles: numOfVehicles,
    numOfVehiclesBySection: numOfVehiclesBySection,
    occurrenceOfField: occurrenceOfField,
    whatIsTheDay: whatIsTheDay,
    IsSpecialDay: IsSpecialDay,
  };


