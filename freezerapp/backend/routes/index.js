let express = require('express');
let router = express.Router();
//jwt checking middleware
let jwt = require('express-jwt');
//setting secret in express
//let auth = jwt({secret: process.env.FREEZER_BACKEND_SECRET});

//Add the data objects via mongoose
let mongoose = require('mongoose');
let Item = mongoose.model('Item');
let Freezer = mongoose.model('Freezer');
let Compartment = mongoose.model('Compartment');

//region define parameter
//define parameter freezer by id WORKS
router.param('freezer', function(req, res, next, id) {
  let query = Freezer.findById(id).populate('compartments');
  query.exec(function(err, freezer) {
    if (err) {
      return next(err);
    }
    if (!freezer) {
      return next(new Error('not found ' + id));
    }
    req.freezer = freezer;
    return next();
  });
});
//define parameter compartment by id WORKS
router.param('comp', function(req, res, next, id) {
  let query = Compartment.findById(id).populate('items');
  query.exec(function(err, comp) {
    if (err) {
      return next(err);
    }
    if (!comp) {
      return next(new Error('not found ' + id));
    }
    req.compartment = comp;
    return next();
  });
});
//define parameter item by id
router.param('item', function(req, res, next, id){
  let query = Item.findById(id);
  query.exec(function(err, it){
    if(err){
      return next(err);
    }
    if(!it){
      return next(new Error('not found ' + id));
    }
    req.item = it;
    return next();
  })
})

//endregion

//region get 
//get 1 freezer WORKS
router.get('/API/freezers/:freezer', function(req, res, next) {
  res.json(req.freezer);
});

//get freezer array WORKS
router.get('/API/freezers/', function(req, res, next) {
  let query = Freezer.find().populate('compartments');
  query.exec(function(err, freezers) {
    if (err) return next(err);
    res.json(freezers);
  })
});

//get compartment in freezer by id WORKS
router.get('/API/freezers/:freezer/compartments/:comp', function(req, res, next){
  res.json(req.compartment);
});

//get all compartments in freezer WORKS
router.get('/API/freezers/:freezer/compartments/', function(req, res, next) {
  let query = Compartment.find().populate('items');
  query.exec(function(err, compartments) {
    if (err) return next(err);
    res.json(req.freezer.compartments);
  })
});

//get item in compartment by id WORKS
router.get('/API/freezers/:freezer/compartments/:comp/items/:item', function(req, res, next){
  res.json(req.item);
})

//get all items in compartment WORKS
router.get('/API/freezers/:freezer/compartments/:comp/items', function(req, res, next){
  let query = Item.find();
  query.exec(function(err, items) {
    if (err) return next(err);
    res.json(req.compartment.items);
  })
});

//get all items in freezer WORKS
router.get('/API/freezers/:freezer/items', function(req, res, next){
  let query =  Item.find();
  query.exec(function(err, items){
    if(err) return next(err);
    res.json(items);
  })
})

//endregion

//region post
//post new empty freezer without compartments WORKS
router.post('/API/freezers/', function (req, res, next) {
    let freezer = new Freezer({
      name: req.body.name, 
      created: req.body.created
    });
    freezer.compartments = [];
    freezer.save(function(err, fre) {
      if (err){
        return next(err);
      }
    });
});

//post new compartment in freezer  WORKS
router.post('/API/freezers/:freezer/compartments', function(req, res, next) {
  let comp = new Compartment({
      name : req.body.name
    });

  comp.save(function(err, compartment) {
    if (err) return next(err);


    req.freezer.compartments.push(compartment);
    req.freezer.save(function(err, compart) {
      if (err){ 
        Compartment.remove({ _id: { $in: req.freezer.compartments } });
        return next(err);
      }
      res.json(compartment);
    })
  });
});

//post new item in compartment
router.post('/API/freezers/:freezer/compartments/:comp/items', function(req, res, next){
  let item = new Item(req.body);
  
  item.save(function(err, item){
    if(err) return next(err);

    req.compartment.items.push(item);
    req.compartment.save(function(err, it){
      if(err){
        Item.remove({ _id: { $in: freezer.compartments } });
        return next(err);
      }
      res.json(item);
    })
  })
});
//endregion

//region delete
//delete freezer WORKS
router.delete('/API/freezers/:freezer', function(req, res) {
  Compartment.remove({ _id: {$in: req.freezer.compartments }}, 
    function (err) {
      if (err) return next(err);

      req.freezer.remove(function(err) {
        if (err) { return next(err); }   
        res.json(req.freezer);
      });
    })
})

//delete compartment in freezer WORKS
router.delete('/API/freezers/:freezer/compartments/:comp', function(req, res) {
  Item.remove({ _id: {$in: req.compartment.items}}, 
    function (err) {
      if (err) return next(err);

      req.compartment.remove(function(err) {
        if (err) return next(err);   
        res.json(req.compartment);
      });
    })
})

//delete item in compartment WORKS
router.delete('/API/freezers/:freezer/compartments/:comp/items/:item', function(req, res){
  Item.remove({ _id: {$in: req.item}},
  function(err){
    if(err) return next(err);
    
    req.item.remove(function(err){
      if(err) {return next(err);}
      res.json(req.item);
    })
  })
})
//endregion

//404 WORKS
router.get('**', function(req, res, next){
  res.send("404 try again");
});

module.exports = router;
