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
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email%20Notifications-0F9D58?style=for-the-badge&logo=nodemailer)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI%20Chatbot-6E56CF?style=for-the-badge)

</div>

---

# 📖 Overview

GoCarRent is a **full-stack MERN car rental platform** where users can discover, book, and manage rental vehicles while owners can list, manage, and monitor their cars through a dedicated dashboard.

The platform provides a complete car rental workflow including **secure authentication, email OTP verification, car listing and management, date-based booking validation, mock online payments, transaction tracking, automated mock refunds, refund status tracking, email notifications, AI-powered customer support, image uploads, and owner-side booking management**.

Users can securely register by verifying their email address through a **6-digit OTP**, browse available cars, select rental dates, complete a **mock payment**, and track their bookings and refund status from the **My Bookings** section.

Owners can add and manage their vehicles, receive booking requests through email, and **confirm or cancel bookings** from their dashboard. When an owner cancels a booking that has already been paid for, GoCarRent automatically initiates a **mock refund**, updates the refund status, and notifies the customer through email.

The project is designed with a **role-based architecture** separating customer and owner functionality while maintaining a responsive and modern user interface.

---

# ✨ Features

## 👤 User Features

- 🔐 Secure JWT Authentication
- 📝 User Registration & Login
- 🔐 Email OTP Verification during Signup
- 🚗 Browse Available Cars
- 🔍 Search Cars
- 📄 Detailed Car Information
- 📅 Book Cars Online
- 💳 Mock Payment System
- 🆔 Transaction ID Tracking
- 📚 Booking History
- 🔄 Refund Status Tracking
- 🔄 Automatic Refund-Status Updates in My Bookings
- 📩 Refund-Related Email Notifications
- 🤖 AI Chatbot using OpenRouter
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
- 💰 Mock Refund Workflow when an Owner Cancels a Paid Booking
- 📧 Email Notifications with Nodemailer
- Update Profile Image

---

## 📧 Email & Notification Features

- 📧 Email Notifications using **Nodemailer**
- 🔐 6-Digit Email OTP Verification during Signup
- 📩 New Booking Notification Emails to Owners
- ✅ Booking Confirmation Emails to Customers
- ❌ Booking Cancellation Emails to Customers
- 💰 Refund Notification Emails after Owner Cancellation
- 🔄 Refund Status Updates in Customer Bookings

---

## 💳 Payment & Refund Features

- 💳 Mock Payment System
- 💳 Multiple Payment Methods:
  - Card
  - UPI
  - Wallet
  - Net Banking
- 🆔 Unique Mock Transaction ID Generation
- 💰 Mock Refund Workflow for Paid Bookings
- 🔄 Refund Status Tracking
- 📩 Refund Confirmation Email Notifications
- 📊 Refund Information Displayed in **My Bookings**

---

## 🤖 AI Features

- 🤖 AI-Powered Customer Support Chatbot
- 🧠 OpenRouter API Integration
- 💬 Instant Assistance for Booking and Platform-Related Queries

---

## 📊 Dashboard

- Total Cars
- Total Bookings
- Pending Bookings
- Confirmed Bookings
- Monthly Revenue
- Recent Bookings
- 💰 Payment & Booking Information
- 🔄 Booking Cancellation & Refund Status

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
- Nodemailer
- OpenRouter API
- RESTful APIs
- Mock Payment & Refund System

---

# 📁 Folder Structure

```text
GoCarRent
│
├── client
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── vercel.json
│   └── vite.config.js
│
├── server
│   ├── configs
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── node_modules
│   ├── routes
│   ├── utils
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── vercel.json
│
├── .gitignore
└── README.md
```

---

# 🚀 Application Flow

## User

```text
Register
   │
   ▼
Email OTP Verification
   │
   ▼
Login
   │
   ▼
Browse / Search Cars
   │
   ▼
View Car Details
   │
   ▼
Select Pickup & Return Dates
   │
   ▼
Payment
   │
   ▼
Booking Created
   │
   ├──────────────► 📧 Booking Email → Owner
   │
   ▼
View My Bookings
   │
   ▼
Track Booking / Refund Status
```

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
Receive Booking
      │
      ▼
Confirm / Cancel Booking
      │
      ├──────────────────┐
      │                  │
   Confirm             Cancel
      │                  │
      ▼                  ▼
Booking Confirmed     Mock Refund
      │                  │
      │                  ▼
      │            Refund Status Updated
      │                  │
      └──────────┬───────┘
                 │
                 ▼
        📧 Status / Refund Email
                 │
                 ▼
             Customer
```
## Email Notification Flow
```text
Customer Books Car
       │
       ▼
📧 Booking Request Email
       │
       ▼
     Owner
```
```text
Owner Confirms / Cancels Booking
       │
       ▼
📧 Booking Status Email
       │
       ▼
    Customer
```
```text
Owner Cancels Paid Booking
       │
       ▼
💰 Mock Refund Initiated
       │
       ▼
🔄 Refund Status Updated
       │
       ▼
📧 Refund Notification Email
       │
       ▼
    Customer
```
## Payment & Refund Flow
```text
Select Payment Method
        │
        ▼
Mock Payment
        │
        ▼
Transaction ID Generated
        │
        ▼
Booking Created
        │
        ▼
Owner Confirms / Cancels
        │
        ├───────────────┐
        │               │
     Confirm         Cancel
        │               │
        ▼               ▼
Booking Confirmed   Mock Refund
                        │
                        ▼
                Refund Status Updated
                        │
                        ▼
                  My Bookings
```
## AI Support Flow
```text
User
 │
 ▼
AI Chatbot
 │
 ▼
OpenRouter API
 │
 ▼
AI Response
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
