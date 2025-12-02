const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: String,
  shortDesc: String,
  fullDesc: String,
  price: Number,
  sizes: [String],
  images: [String],
  reviews: [reviewSchema]
});

module.exports = mongoose.model('Product', productSchema);