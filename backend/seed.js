const Product = require('./models/Product');

const seedData = async () => {
  try {
    await Product.deleteMany({});

    await Product.insertMany([
      {
        name: "Midnight Rose",
        shortDesc: "A floral scent with a hint of mystery.",
        fullDesc: "Midnight Rose is an enchanting fragrance...",
        price: 85,
        sizes: ["50ml", "100ml"],
        images: [
          "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
        ],
        reviews: []
      },
      {
        name: "Ocean Breeze",
        shortDesc: "Fresh, aquatic notes for the modern soul.",
        fullDesc: "Experience the refreshing calmness of the ocean...",
        price: 60,
        sizes: ["50ml", "100ml", "150ml"],
        images: [
          "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
        ],
        reviews: []
      }
    ]);

    console.log("✅ Database seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
  }
};

module.exports = seedData;
