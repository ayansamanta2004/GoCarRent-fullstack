<div align="center">

# 🚗 GoCarRent

### A Modern Full Stack Car Rental Platform Built with the MERN Stack

Book premium cars with ease or earn money by listing your own vehicles.

<br>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?style=for-the-badge&logo=tailwindcss)
![ImageKit](https://img.shields.io/badge/ImageKit-Image%20Hosting-blue?style=for-the-badge)

</div>

---

# 📖 Overview

GoCarRent is a **full-stack MERN car rental platform** where users can discover, book, and manage premium rental vehicles while owners can list, manage, and monitor their cars through a dedicated dashboard.

The platform includes secure authentication, booking management, image uploads, responsive UI, and an owner management system.

---

# ✨ Features

## 👤 User Features

- 🔐 Secure JWT Authentication
- 📝 User Registration & Login
- 🚗 Browse Available Cars
- 🔍 Search Cars
- 📄 Detailed Car Information
- 📅 Book Cars Online
- 📚 Booking History
- 📱 Responsive UI

---

## 🚘 Owner Features

- Become a Car Owner
- Upload Car Images
- Add New Cars
- Manage Listed Cars
- Toggle Availability
- Delete Cars
- View Dashboard
- Manage Customer Bookings
- Confirm / Cancel Bookings
- Update Profile Image

---

## 📊 Dashboard

- Total Cars
- Total Bookings
- Pending Bookings
- Confirmed Bookings
- Monthly Revenue
- Recent Bookings

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Tailwind CSS
- Motion (Framer Motion)
- Axios
- React Hot Toast

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- ImageKit

---

# 📁 Folder Structure

```text
GoCarRent
│
├── client
│   ├── assets
│   ├── components
│   ├── context
│   ├── pages
│   ├── App.jsx
│   └── main.jsx
│
├── server
│   ├── configs
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Application Flow

## User

```text
Register/Login
      │
      ▼
Browse Cars
      │
      ▼
View Car Details
      │
      ▼
Book Car
      │
      ▼
View My Bookings
```

---

## Owner

```text
Become Owner
      │
      ▼
Add New Car
      │
      ▼
Manage Cars
      │
      ▼
Receive Bookings
      │
      ▼
Approve / Cancel
```

---

# 🔒 Authentication

✔ JWT Authentication

✔ Protected Routes

✔ Password Hashing using bcrypt

✔ Owner Authorization

---

# 📷 Image Upload

Images are uploaded using **ImageKit**.

Features:

- Image Compression
- WebP Conversion
- Optimized Image Delivery

---

# 📅 Booking System

The booking system prevents double booking using date overlap checking.

```text
Existing Booking

Pickup ------------ Return

Requested Booking

        Pickup ------------ Return

❌ Booking Rejected
```

---

# 📊 Dashboard Analytics

The Owner Dashboard provides

- 🚗 Total Cars
- 📅 Total Bookings
- ⏳ Pending Bookings
- ✅ Confirmed Bookings
- 💰 Monthly Revenue
- 📝 Recent Bookings

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/ayansamanta2004/GoCarRent-fullstack.git
```

---

## Install Frontend

```bash
cd client

npm install

npm run dev
```

---

## Install Backend

```bash
cd server

npm install

npm run server
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=

MONGODB_URI=

JWT_SECRET=

IMAGEKIT_PUBLIC_KEY=

IMAGEKIT_PRIVATE_KEY=

IMAGEKIT_URL_ENDPOINT=
```

---

## Frontend (.env)

```env
VITE_BASE_URL=

VITE_CURRENCY=₹
```

---

# 📸 Screenshots

## 🏠 Home Page

> Add Screenshot Here

---

## 🚗 Cars Page

> Add Screenshot Here

---

## 📄 Car Details

> Add Screenshot Here

---

## 📅 My Bookings

> Add Screenshot Here

---

## 📊 Dashboard

> Add Screenshot Here

---

## 🚘 Manage Cars

> Add Screenshot Here

---

## 📖 Manage Bookings

> Add Screenshot Here

---

# 🌟 Future Improvements

- 💳 Online Payment Gateway
- 📧 Email Notifications
- ⭐ Reviews & Ratings
- ❤️ Wishlist
- 🔔 Real-time Notifications
- 📍 Google Maps Integration
- 🚘 Multiple Car Images
- 🔍 Advanced Search Filters
- 📱 Progressive Web App (PWA)
- 📊 Advanced Analytics
- 📈 Booking Reports

---

# 💡 Highlights

- Modern Responsive UI
- MERN Stack Architecture
- JWT Authentication
- Owner Dashboard
- Booking Management
- ImageKit Integration
- Responsive Design
- Reusable React Components
- RESTful APIs
- MongoDB Database

---

# 👨‍💻 Author

## Ayan Samanta

**Computer Science Engineering Student**

📧 Email: ayansamanta802@gmail.com

🔗 GitHub: https://github.com/ayansamanta2004

🔗 LinkedIn: https://www.linkedin.com/in/ayan-samanta-555922280/

---

<div align="center">

### ⭐ If you like this project, don't forget to Star the Repository ⭐

Made with ❤️ using the MERN Stack

</div>
