let mongoose = require('mongoose');

let ItemSchema = new mongoose.Schema({
  name : String,
  amount: { type: Number, default: 1},
  added : { type: Date, default: Date.now }
});	

ItemSchema.pre('remove', function (next) {
  this.model('Compartment').update(
    {}, 
    { $pull: { items: this._id } }, 
    { safe: true, multi: true }, 
    next
  );
});

mongoose.model('Item', ItemSchema);