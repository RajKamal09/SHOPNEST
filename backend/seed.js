
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Product = require('./models/product');
const connectDB = require('./config/db');

const adminEmail = 'admin@shopnest.com';

const products = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description:
      'Immersive sound experience with advanced active noise cancellation.',
    price: 299.99,
    category: 'Electronics',
    stock: 15,
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ratings: 4.8,
    numReviews: 24
  },
  {
    name: 'Minimalist Modern Chair',
    description:
      'A stylish and comfortable addition to any contemporary living room.',
    price: 150.00,
    category: 'Furniture',
    stock: 30,
    imageUrl:
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ratings: 4.2,
    numReviews: 12
  },
  {
    name: 'Professional DSLR Camera',
    description:
      'Capture stunning moments with high-resolution clarity and speed.',
    price: 1199.99,
    category: 'Electronics',
    stock: 8,
    imageUrl:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ratings: 4.9,
    numReviews: 50
  },
  {
    name: 'Classic White Sneakers',
    description:
      'Versatile and comfortable, a staple for any casual outfit.',
    price: 85.00,
    category: 'Clothing',
    stock: 50,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ratings: 4.5,
    numReviews: 89
  }
];

const importData = async () => {
  try {
    // Connect to MongoDB before performing database operations
    await connectDB();

    // Create the admin only if it does not already exist
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        'password123',
        salt
      );

      adminUser = await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });

      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists; keeping existing account.');
    }

    // Insert new products or update matching products by name
    let insertedCount = 0;
    let updatedCount = 0;

    for (const product of products) {
      const result = await Product.updateOne(
        { name: product.name },
        { $set: product },
        { upsert: true, runValidators: true }
      );

      if (result.upsertedCount > 0) {
        insertedCount++;
      } else if (result.modifiedCount > 0) {
        updatedCount++;
      }
    }

    console.log('Data imported successfully!');
    console.log(`Admin: ${adminUser.email}`);
    console.log(`New products added: ${insertedCount}`);
    console.log(`Existing products updated: ${updatedCount}`);
    console.log(`Products processed: ${products.length}`);
  } catch (error) {
    console.error('Error importing data:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  }
};

importData();
