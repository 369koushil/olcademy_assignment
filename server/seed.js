export const seedData = async () => {
  try {
    await Product.deleteMany({}); 

    const count = await Product.countDocuments();
    if (count === 0) {
      const products = [
        {
          name: "Midnight Rose",
          shortDesc: "A floral scent with a hint of mystery.",
          fullDesc: "Midnight Rose is an enchanting fragrance that captures the essence of a moonlit garden. With top notes of blackcurrant and raspberry, middle notes of jasmine and rose absolute, and base notes of vanilla and musk.",
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
          fullDesc: "Experience the refreshing calmness of the ocean. This perfume blends sea salt, sage, and driftwood to create a crisp, clean scent perfect for daily wear.",
          price: 60,
          sizes: ["50ml", "100ml", "150ml"],
          images: [
             "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
             "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
          ],
          reviews: []
        },
        {
          name: "Amber Wood",
          shortDesc: "Warm, spicy, and undeniably masculine.",
          fullDesc: "A rich and intense fragrance featuring oud wood, cardamom, and amber. Perfect for evening wear and special occasions.",
          price: 120,
          sizes: ["100ml"],
          images: [
            "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
          ],
          reviews: []
        },
        {
          name: "Citrus Bloom",
          shortDesc: "Zesty lemon meets sweet orange blossom.",
          fullDesc: "A vibrant explosion of citrus fruits and delicate flowers. This scent is energetic, bright, and perfect for the summer season.",
          price: 55,
          sizes: ["30ml", "50ml"],
          images: [
            "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
          ],
          reviews: []
        }
      ];
      await Product.insertMany(products);
      console.log("Mock Data Reseeded with Verified Images");
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

