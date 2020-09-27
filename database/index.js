const mongoose = require('mongoose');
const faker = require('faker');
const seed = require('./seed.js');

mongoose.connect('mongodb://localhost/UNZWILLING', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });


/*----------------------------------------------------------------*/
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MONGO CONNECTED!")
});

// Schema
let productSchema = new mongoose.Schema({
  id: {type: Number,unique: true, required: true},
  name: {type: String, required: true},
  price: {type: Number, required: true},
  discount: Number,
  review: {
    number_of_reviews: Number,
    five_star_reviews: Number,
    four_star_reviews: Number,
    three_star_reviews: Number,
    two_star_reviews: Number,
    one_star_reviews: Number,
    average_rating: Number
  },
  description: String,
  specification_item_no: {type: Number,unique: true},
  characteristics: {
    color: String,
    country_of_origin: String,
    substance: String,
    electrical_power_supply_needed: Boolean,
    voltage: Number,
    capacity: Number,
    safety_shut_off: Boolean,
    motor: String,
    hidden_cord_storage: Boolean,
    programs: Number,
    blade: String,
    speeds: Number,
    lcd_display: Boolean,
    power_input: Number,
  },
  measurements: {
    net_weight: Number,
    capacity: Number,
    length_of_product: Number,
    width_of_product: Number,
    height_of_product: Number
  },
  images: Array,
  main_image: String
});

// Model
let Product = mongoose.model('Product', productSchema);

var seedingData = () => {
  // drop collections before new seeding
  mongoose.connection.collections['products'].drop(function(err) {
    console.log('collection dropped');
  });

  var bunchOfSeeds = seed.bunchOfSeeds;

  Product.insertMany(bunchOfSeeds)
  .then(() => {
    console.log("Data inserted")  // Success
  })
  .catch((error) => {
    console.log(error)      // Failure
  });
}
/*----------------------------------------------------------------*/

var getOneProductData = (id, callback) => {
  Product.findOne({id}, (err, productInfo) => {
    if (err) {
      callback(err);
    } else {
      callback(null, productInfo);
    }
  })
}

module.exports = {
  seedingData,
  getOneProductData
}