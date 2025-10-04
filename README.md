# 🏨 Wanderlust Hotel Listing Backend

**Wanderlust** is a backend-driven hotel listing application built with **Node.js**, **Express**, and **MongoDB**. It allows users to create, view, edit, and review hotel listings, providing a full-featured platform for managing hotel or staying place data.

The project uses **Passport.js** for user authentication, **Cloudinary** for image uploads, and **EJS templates** for frontend rendering.

🔗 **Repository:** [https://github.com/Anirudh-Singh-26/Hotel-Listing](https://github.com/Anirudh-Singh-26/Hotel-Listing)
🌐 **Live Demo:** [https://hotel-listing-fhib.onrender.com/listings](https://hotel-listing-fhib.onrender.com/listings)

---

## 💻 Project Overview

Wanderlust allows users to:

* List hotels or staying places with details and images
* View listings by other users
* Leave reviews and rate other listings
* Edit their own listings
* Use star-based rating for each hotel
* Authenticate via user-based login using Passport.js

The frontend uses **EJS templates** that are dynamically rendered with data from the backend, providing a seamless experience.

---

## 🛠 Technology Stack

* **Node.js** + **Express**: Backend framework
* **MongoDB**: Database
* **Passport.js**: User authentication
* **Cloudinary**: Image upload and management
* **EJS**: Templating engine for frontend rendering
* **dotenv**: Environment variable management

---

## ✨ Key Features

* User-based login and authentication
* Add, edit, and delete hotel listings
* View listings from other users
* Leave reviews and star ratings
* Cloudinary integration for hotel images
* EJS templates for dynamic frontend rendering
* Environment variable configuration for secure credentials
* Fully deployed backend on Render for easy access

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Anirudh-Singh-26/Hotel-Listing.git
cd Hotel-Listing
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
SESSION_SECRET=your-session-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) to view the application locally.

---

## 👤 Author

Anirudh Singh Rathore
[GitHub Profile](https://github.com/Anirudh-Singh-26)

---

## 📄 License

MIT © Anirudh Singh Rathore
