# 🛍️ Nexora Shop - E-Commerce Application

A full-stack e-commerce application built with React and Node.js, featuring product browsing, shopping cart, and order management.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)

## 🎯 Overview

Nexora Shop is a modern e-commerce platform that allows users to:
- Browse and view products
- Add products to cart
- Manage cart items
- Place orders with checkout information
- View order history

The application uses MongoDB for data persistence and includes a fallback mechanism to fetch products from Fake Store API if the database is empty.

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM 7** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Nexora-Assignment/
├── backend/
│   ├── data/
│   │   └── products.js          # Product data
│   ├── models/
│   │   ├── Cart.js              # Cart schema
│   │   ├── Order.js             # Order schema
│   │   ├── Product.js           # Product schema
│   │   ├── Receipt.js           # Receipt schema
│   │   └── User.js              # User schema
│   ├── routes/
│   │   ├── cartRoutes.js        # Cart API endpoints
│   │   ├── orderRoutes.js       # Order API endpoints
│   │   └── productRoutes.js     # Product API endpoints
│   ├── seed.js                  # Database seeding script
│   ├── server.js                # Express server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Cart.jsx          # Cart component
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   └── ProductCard.jsx   # Product card component
    │   ├── pages/
    │   │   ├── Home.jsx          # Home page (product listing)
    │   │   ├── Cart.jsx          # Cart page
    │   │   ├── Orders.jsx        # Orders history page
    │   │   └── ProductCard.jsx
    │   ├── services/
    │   │   └── api.js            # API configuration
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Global styles (Tailwind imports)
    ├── tailwind.config.js        # Tailwind configuration
    ├── postcss.config.js         # PostCSS configuration
    ├── vite.config.js            # Vite configuration
    └── package.json
```

## ✨ Features

### Product Management
- View all available products in a responsive grid layout
- Automatic product seeding from Fake Store API if database is empty
- Product details display (name, price)

### Shopping Cart
- Add products to cart
- View cart items with quantities
- Remove items from cart
- Calculate total price dynamically
- Persistent cart storage in MongoDB

### Order Management
- Place orders with customer information (name, email, address)
- View order history
- Order details include:
  - Order ID
  - Product list with quantities
  - Total amount
  - Order status
  - Order date

### User Interface
- Modern, responsive design with Tailwind CSS
- Clean navigation bar
- Intuitive user experience
- Mobile-friendly layout

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/home-page.png)
*Product listing page with grid layout*

### Shopping Cart
![Shopping Cart](./screenshots/cart-page.png)
*Cart page showing items with checkout functionality*

### Checkout Form
![Checkout](./screenshots/checkout-form.png)
*Checkout form for placing orders*

### Orders History
![Orders](./screenshots/orders-page.png)
*Order history page displaying past orders*

> **Note:** To add screenshots:
> 1. Create a `screenshots` folder in the root directory
> 2. Add your screenshot images (PNG, JPG, or GIF format)
> 3. Update the image paths above to match your screenshot filenames
> 4. Recommended screenshot names: `home-page.png`, `cart-page.png`, `checkout-form.png`, `orders-page.png`

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas connection string)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the backend directory:**
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/shopapp
   PORT=5001
   ```

4. **Start MongoDB** (if using local MongoDB):
   ```bash
   # On macOS/Linux
   mongod

   # Or if MongoDB is installed as a service, it may already be running
   ```

5. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

6. **Start the backend server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

   The backend server will run on `http://localhost:5001`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

### Running the Application

1. **Start MongoDB** (if not already running)

2. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start the frontend server** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 📡 API Endpoints

### Products

- `GET /api/products` - Get all products
  - Returns all products from database
  - If database is empty, fetches from Fake Store API and saves to database

### Cart

- `GET /api/cart` - Get user's cart
  - Returns cart with populated product details
  - Uses mock user ID: `mock_user`

- `POST /api/cart` - Add product to cart
  - Body: `{ productId: string, quantity?: number }`
  - Adds product to cart or increments quantity if already exists

- `DELETE /api/cart/:productId` - Remove product from cart
  - Removes specified product from cart

### Orders

- `GET /api/orders` - Get all orders for user
  - Returns all orders for mock user, sorted by creation date (newest first)

- `POST /api/orders` - Place a new order
  - Body: `{ name: string, email: string, address: string }`
  - Creates order from cart items
  - Clears cart after successful order placement
  - Calculates total amount automatically

## 💻 Usage

### Adding Products to Cart

1. Navigate to the Home page
2. Browse available products
3. Click "Add to Cart" button on any product
4. Product will be added to your cart

### Managing Cart

1. Click "Cart" in the navigation bar
2. View all items in your cart
3. Remove items by clicking "Remove" button
4. Click "Checkout" to proceed with order

### Placing an Order

1. Go to Cart page
2. Click "Checkout" button
3. Fill in the checkout form:
   - Full Name
   - Email
   - Address
4. Click "Place Order"
5. Cart will be cleared and order will be saved

### Viewing Orders

1. Click "Orders" in the navigation bar
2. View all your past orders
3. See order details including:
   - Order ID
   - Products and quantities
   - Total amount
   - Order status
   - Order date

## 🔧 Configuration

### Backend Configuration

- **Port**: Default `5001` (configurable via `PORT` environment variable)
- **MongoDB URI**: Default `mongodb://127.0.0.1:27017/shopapp` (configurable via `MONGO_URI` environment variable)

### Frontend Configuration

- **API Base URL**: `http://localhost:5001/api` (configured in `src/services/api.js`)
- **Tailwind CSS**: Configured in `tailwind.config.js` with content paths for proper purging

## 📝 Notes

- The application currently uses a mock user ID (`mock_user`) for all operations
- Product data is automatically fetched from Fake Store API if the database is empty
- Cart and orders are persisted in MongoDB
- The frontend uses Tailwind CSS v4 with the new `@import "tailwindcss"` syntax

## 🐛 Troubleshooting

### Tailwind CSS not working?
- Ensure you're using Tailwind v4 syntax: `@import "tailwindcss"` in `index.css`
- Restart the dev server after making CSS changes

### MongoDB connection issues?
- Verify MongoDB is running: `mongosh` or check MongoDB service status
- Check your `MONGO_URI` in `.env` file
- Ensure MongoDB is accessible on the specified port

### API requests failing?
- Verify backend server is running on port 5001
- Check CORS configuration in `server.js`
- Ensure API base URL in frontend matches backend port

## 📄 License

This project is part of the Nexora Assignment.

