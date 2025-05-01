const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const profileRoutes = require("./routes/profileRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const productRoutes = require("./routes/productRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");

dotenv.config(); // Load environment variables

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

// Default route (for root "/")
app.get("/", (req, res) => {
    res.send("✅ JeevanAmrit Backend Server is Running Successfully!");
});

// Global error handler (should come after all routes)
app.use((err, req, res, next) => {
    console.error('🚨 Global Error Handler:', err.stack);
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'development' ? err.message : 'Server Error',
        message: 'An unexpected error occurred'
    });
});

// 404 handler (if no route matches)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "❌ 404 Not Found: This route doesn't exist."
    });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});