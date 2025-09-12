# 📖 Hotel Booking System – Node.js + MongoDB

A **production-ready backend API** for hotel management and booking use cases.  
Features include:

-  Manage hotels with **default and special pricing**
-  Search hotels by **geo-coordinates**
-  Calculate **total stay price** with pricing rules
-  JWT authentication with **admin role**
-  Security middleware (Helmet, input validation)
-  Postman collection for easy testing

---

# Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/hotel-booking-system.git
cd hotel-booking-system/server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Copy `.env.example` into `.env` and update values:

```ini
PORT=4000
MONGO_URI=mongodb://localhost:27017/hotel_booking
JWT_SECRET=change_this_secret

```

### 4. Start MongoDB
If you have MongoDB installed locally:
```bash
mongod
```


### 5. Run the app
Development mode with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run at:  
👉 [http://localhost:4000](http://localhost:4000)

---

## 🔑 Authentication

### Admin login
```http
POST /api/auth/login
Content-Type: application/json
```

**Body:**
```json
{
    "username" : "admin",
    "password" : "AdminPass123!"
}
```

##  Postman Collection

You can import `HotelBookingApplication.postman_collection.json` into Postman to test all endpoints.

---

##  Future Enhancements

-  User model with `user` and `admin` roles  
- Redis caching for searches  
-  Jest tests for pricing & authentication  
-  Payment gateway integration  
-  Booking management system  
