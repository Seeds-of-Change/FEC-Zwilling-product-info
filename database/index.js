/* eslint-disable no-console */
const mongoose = require('mongoose');
const seed = require('./seed.js');

mongoose.connect('mongodb://localhost/UNZWILLING', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
});

/*----------------------------------------------------------------*/
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MONGO CONNECTED!');
});

// Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  category: String,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: Number,
  discount: String,
  review: {
    numberOfReviews: Number,
    fivStarReviews: Number,
    fourStarReviews: Number,
    threeStarReviews: Number,
    twoStarReviews: Number,
    oneStarReviews: Number,
    averageRating: Number,
  },
  description: String,
  specificationItemNo: { type: Number, unique: true },
  characteristics: {
    color: String,
    countryOfOrigin: String,
    substance: String,
    electricalPowerSupplyNeeded: String,
    voltage: Number,
    capacityMl: Number,
    safetyShutOff: String,
    motor: String,
    hiddenCordStorage: String,
    programs: Number,
    blade: String,
    speeds: Number,
    lcdDisplay: String,
    powerInput: Number,
  },
  measurement: {
    netWeight: Number,
    capacityQt: Number,
    lengthOfProduct: Number,
    widthOfProduct: Number,
    heightOfProduct: Number,
  },
  images: Array,
  mainImage: String,
});

// Model
const Product = mongoose.model('Product', productSchema);

const seedingData = () => {
  // drop collections before new seeding
  mongoose.connection.collections.products.drop((err) => {
    console.log('collection dropped');
  });

  const seeds = seed.bunchOfSeeds;

  Product.insertMany(seeds)
    .then(() => {
      console.log('Data inserted');// Success
      db.close();
    })
    .catch((error) => {
      console.log(error);// Failure
      db.close();
    });
};
/*----------------------------------------------------------------*/

const getOneProductData = (id, callback) => {
  Product.findOne({ id }, (err, productInfo) => {
    if (err) {
      callback(err);
    } else {
      callback(null, productInfo);
    }
  });
};

module.exports = {
  seedingData,
  getOneProductData,
};
