var bigml = require('bigml');
var source = new bigml.Source();
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
let modelGlobal=""

function train() {
    source.create('./events.csv', function (error, sourceInfo) {
        if (!error && sourceInfo) {
            const dataset = new bigml.Dataset();
            dataset.create(sourceInfo, function (error, datasetInfo) {
                if (!error && datasetInfo) {
                    var model = new bigml.Model();
                    model.create(datasetInfo, function (error, modelInfo) {
                        if (!error && modelInfo) {
                            let prediction = new bigml.Prediction();
                            prediction.create(modelInfo, {"car": 3})
                            const localModel = new bigml.LocalModel(prediction.resource);
                            console.log("important: " + prediction.resource)
                            modelGlobal = prediction.resource
                            // save prediction.resource to file.txt
                            localModel.predict({"car": 3},
                                function (error, prediction) {
                                    // let pred = JSON.parse(prediction);
                                    // console.log("here: "+ pred)
                                    console.log("the prediction is: " + prediction.prediction)
                                });
                        }
                    });
                }
            });
        }
    });
}
function predict() {
    const localModel = new bigml.LocalModel(modelGlobal);
    localModel.predict({"car": 2, "color": "BLACK"},
        function (error, prediction) {
            // let pred = JSON.parse(prediction);
            // console.log("here: "+ pred)
            console.log("the prediction is: " + prediction.prediction)
        });
}


module.exports = "BIGML_CONTROLLER"