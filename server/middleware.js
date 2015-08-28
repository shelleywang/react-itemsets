var bodyParser     = require('body-parser'),
    itemController = require('./itemController.js');

module.exports = function(app, express){

  //This section handles the basic middleware
  app.use(bodyParser.json()); // Allows the body to be accessed
  // app.use(bodyParser.urlenxcoded({extended: true})); //Allows the URL to be accessed

  //Serves the public directory to the user
  app.use(express.static(__dirname + '/../public'));

  app.get('/items', itemController.getItems);

};