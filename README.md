# 📱 React Chat App

A modern, real-time chat application built with React, Tailwind CSS, and a PostgreSQL-powered backend.

---

## ✨ Features

- 🔄 Real-time messaging (text and image support)
- 🖼️ Image preview before sending
- 📱 Responsive UI built with Tailwind CSS
- 🎞️ Smooth animations using Framer Motion
- 👤 User authentication and online presence tracking
- 🕒 Message timestamps and user avatars
- ⚠️ Input validation and toast notifications (errors, success)
- 🚀 Smooth scrolling experience for chats

---

## 🛠️ Tech Stack

### Frontend:

- React 18+
- Tailwind CSS (with custom animations)
- Zustand (state management)
- Framer Motion (animations)
- Lucide React (icons)
- React Hot Toast (notifications)

### Backend:

- Node.js (v24+)
- PostgreSQL (via Supabase or self-hosted)
- Prisma ORM
- Express (assumed API layer)

---




### 1️⃣ Clone the Repository

```bash
git clone <your-github-repo-link>
cd your-repo-folder



### 🚀 Getting Started

***********Backend_Setup*************

Step 1 - npm install

Step 2 - Install postgresql (make setup in supabase and add connection string in .env file)

         postgres setup-
         1- npx prisma init
         2- npx prisma migrate dev --name init

Step 3 - npm run dev --prefix backend (Server will start running at Port:5000)


***************Frontend_Setup***********

Step 1 - npm install

Step 2 - npm run dev(frontend will start at http://localhost:5173/ )


**** Signup page and login, then you will see dashboard, go into message to chat with the users******
|

*************************************Thankyou***********************