require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const seedDB=require('./seed')
const Product = require('./models/Product');

const app = express();
const MONGO_URI = process.env.MONGOURI;
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');
    await seedDB();
  })
  .catch(err => console.error(err));



app.get("/",(req,res)=>{
     res.status(200).json({msg:"live"})
})

// Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Review
app.post('/api/products/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const newReview = {
      user: req.body.user || "Anonymous",
      rating: req.body.rating,
      comment: req.body.comment
    };
    product.reviews.push(newReview);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log('Server running on port 5000');
});
