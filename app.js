const path = require('path');

const express = require('express');

//const redis = require('./models/redis');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');
// const shopRoutes = require('./routes/shop');
// const authRoutes = require('./routes/auth');

app.use(express.static(path.join(__dirname, 'public')));


// app.use(shopRoutes);
// app.use(authRoutes);

app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'views/dashboard.ejs'));
});

// if got here return error 404
//app.use(errorController.get404);

app.listen(3003, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port");
})