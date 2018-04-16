/* dependencies & app setup */
const pizzas = require('./db/pizza.js');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();


/* set the view engine */
app.set('views', './views');
app.set('view engine', 'ejs');

/* error logger, static routes */
app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get("/index", function(req,res){
	res.render('index.ejs', {pizzas: pizzas});
});

app.get("/pizzas", function(req,res){
	res.render('pizza/pizza-index.ejs', {pizzas: pizzas});
});

app.get("/pizzas/:id", function(req,res){
	console.log(req.params.id);
	let arrPizza = pizzas.filter(pizza => pizza.flavorKey == req.params.id);
	res.render('pizza/pizza-single.ejs', {pizzas: arrPizza});
});

/* error handler */
app.get('*', function(req, res) {
  res.status(404).send({message: 'Oops! Not found.'});
});

/* setting up port & listen */
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

