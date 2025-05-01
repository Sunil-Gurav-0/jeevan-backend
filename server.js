const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Route imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const profileRoutes = require("./routes/profileRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const productRoutes = require("./routes/productRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/products", productRoutes);
app.use("/api/delivery", deliveryRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("✅ JeevanAmrit Backend Server is Running Successfully!");
});

// 404 handler (for undefined routes)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "❌ 404 Not Found: This route doesn't exist."
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('🚨 Global Error Handler:', err);
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'development' ? err.message : 'Server error',
        message: 'An unexpected error occurred'
    });
});

// Export the app for Vercel
module.exports = app;