let mongoose = require('mongoose');

let CompartmentSchema = new mongoose.Schema({
  name : String,
  items : [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Item'
    }
  ],
  created : {type: Date, default: Date.now}
});	

CompartmentSchema.pre('remove', function (next) {
  this.model('Freezer').update(
    {}, 
    { $pull: { compartments: this._id } }, 
    { safe: true, multi: true }, 
    next
  );
});

mongoose.model('Compartment', CompartmentSchema);