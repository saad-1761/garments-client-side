# Fabrica – Client Side

Frontend application for **Fabrica**, a role-based garment marketplace where users can browse products, place orders, track order progress, and manage accounts.

---

## 🛠 Tech Stack

- React 18 (Vite)
- React Router DOM
- TanStack React Query
- Tailwind CSS
- DaisyUI
- Firebase Authentication
- Axios
- Headless UI
- Framer Motion
- React Hook Form
- React Icons

---

## 👥 User Roles & Capabilities

### Customer

- Browse & search products
- Filter products by category
- Place orders (Cash on Delivery / Online)
- Track order progress
- View profile & order history
- Request to become a manager

### Manager

- Add & manage products
- Approve customer orders
- Update order tracking timeline
- Manage inventory

### Admin

- Manage users & roles
- Approve manager requests
- Suspend users
- Manage all products & orders

---

## ✨ Core Features

- Product listing with pagination, search & category filters
- Secure authentication (Email / Google)
- Role-based dashboard access
- Order tracking timeline (read-only for customers)
- Fully responsive, production-grade UI
- Optimized data fetching with React Query

---

## 🚀 Live Demo

👉 **Frontend URL:** [Fabrica](https://lafabrica61.vercel.app/)

---

## 📌 Notes

- Protected routes based on user role
- Automatic refetching after actions (orders, updates)
- Mobile-first design
