
let mongoose = require('mongoose');

let FreezerSchema = new mongoose.Schema({
  name : String,
  compartments : [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Compartment'
    }
  ],
  created : {type: Date, default: Date.now}
});
	
mongoose.model('Freezer', FreezerSchema);