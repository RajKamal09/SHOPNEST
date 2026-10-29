# 🛍️ ShopNest — MERN E-Commerce Platform

ShopNest is a full-stack e-commerce web application built using the MERN stack. It is designed to provide users with an online shopping experience, including product browsing, cart management, and checkout.

## 🚀 Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- JWT-based authentication (if enabled in the project)

**Payment Integration**
- Razorpay Test Mode for payment integration and testing

## ✨ Features

- Product browsing and shopping interface
- Add products to the shopping cart
- Cart quantity and total price management
- Centralized cart state management using Redux Toolkit
- Backend API integration
- Checkout and Razorpay test payment flow
- Separate frontend and backend architecture

*Note: Features should match the functionality currently implemented in the project.*

## 📁 Project Structure

```text
SHOPNET-ECOM-MERN/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Prerequisites

Make sure you have installed:

- Node.js and npm
- MongoDB connection or MongoDB Atlas account
- Git

## 🛠️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/RajKamal09/SHOPNEST.git
cd SHOPNEST
```

### 2. Install root dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Install frontend dependencies

Open another terminal from the project root:

```bash
cd frontend
npm install
```

### 5. Configure environment variables

Create a `.env` file inside the backend folder and configure the variables required by your backend code.

For example:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

Use the exact variable names expected by your code. Add other required variables if your backend needs them.

**Security:** Never commit your real `.env` file, API secrets, database credentials, or payment secrets to GitHub.

### 6. Run the application

From the project root:

```bash
npm run dev
```

The root script is configured to start the backend and frontend together.

Typical local URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

Your actual API endpoints depend on the backend routes configured in the project.

## 💳 Payment Testing

ShopNest uses Razorpay Test Mode for payment integration development.

- Use Razorpay's official test credentials and supported test payment details.
- Test Mode payments do not represent real customer payments.
- Verify payment signatures on the backend before treating a payment as successful.
- Never expose the Razorpay Key Secret in frontend code.

## 🔐 Security Notes

- Keep secrets in environment variables.
- Do not upload `.env` files or `node_modules`.
- Validate payment details on the server.
- Recalculate product totals on the backend before creating payment orders.

## 📌 Project Status

- Development: Local environment
- Repository: GitHub
- Deployment: Not yet deployed

## 👨‍💻 Author

**Lakshya Pratap Singh**

GitHub: [RajKamal09](https://github.com/RajKamal09)

---

Built as a full-stack web development project to practise React, Node.js, Express, MongoDB, state management, REST APIs, and payment integration.