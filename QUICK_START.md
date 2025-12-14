# Quick Start Guide - Yala Safari Crew

## 🚀 Getting Started

### Step 1: Start MongoDB
Make sure MongoDB is running on your system. If you don't have MongoDB installed, you can:
- Install MongoDB locally, or
- Use MongoDB Atlas (cloud) and update the connection string in `backend/.env`

### Step 2: Configure Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Create a `.env` file (copy from `.env.example` if needed):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/yala-safari-crew
NODE_ENV=development
```

3. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Step 3: Start Frontend

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. (Optional) Create a `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the React development server:
```bash
npm start
```

The frontend will automatically open in your browser at `http://localhost:3000`

## 📱 Using the Application

1. **Home Page**: Overview of services and features
2. **About Us**: Company information and values
3. **Tours**: Browse and view wildlife tours
4. **Car Rentals**: View available vehicles for rent
5. **Packages**: Explore safari packages
6. **Gallery**: View safari experiences
7. **Contact**: Send inquiries and messages

## 🎨 Features

- ✅ Responsive design with Tailwind CSS
- ✅ Professional navbar with all sections
- ✅ RESTful API backend
- ✅ MongoDB database integration
- ✅ Sample data included (works even without database)
- ✅ Modern UI/UX design

## 📝 Notes

- The app includes sample data that displays if the API connection fails
- All packages are already installed
- Make sure MongoDB is running before starting the backend
- The frontend will work with sample data even if backend is not running

## 🛠️ Troubleshooting

**Backend won't start:**
- Check if MongoDB is running
- Verify the MongoDB connection string in `.env`
- Check if port 5000 is available

**Frontend won't connect to backend:**
- Ensure backend is running on port 5000
- Check CORS settings in backend
- The app will show sample data if API fails

**Port already in use:**
- Change the PORT in backend `.env` file
- Update `REACT_APP_API_URL` in frontend `.env` accordingly

Enjoy your Yala Safari Crew web application! 🦁🚗📦


# Section 2
__________________________________________________

# How to Run and Test  Yala Safari Crew Application

## 📋 Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (check with: `node --version`)
- ✅ npm installed (check with: `npm --version`)
- ✅ MongoDB installed and running (optional - app works with sample data too)

## 🚀 Step-by-Step Running Instructions

### Option 1: Run with MongoDB (Full Functionality)

#### Step 1: Start MongoDB
If you have MongoDB installed locally:
```bash
# On Windows (if MongoDB is installed as a service, it should start automatically)
# Or start it manually:
mongod
```

If using MongoDB Atlas (Cloud):
- No local setup needed, just use your connection string

#### Step 2: Configure Backend Environment

1. Navigate to backend folder:
```bash
cd backend
```

2. Create `.env` file (if it doesn't exist):
```bash
# On Windows PowerShell:
New-Item .env -ItemType File

# Or manually create a file named .env with this content:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/yala-safari-crew
NODE_ENV=development
```

For MongoDB Atlas, use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yala-safari-crew
```

#### Step 3: Start Backend Server

In the backend directory:
```bash
npm start
```

**Expected Output:**
```
MongoDB Connected: localhost:27017
Server is running on port 5000
```

✅ **Backend is running!** Keep this terminal open.

#### Step 4: Start Frontend (New Terminal)

Open a **NEW terminal window** and:

1. Navigate to frontend folder:
```bash
cd frontend
```

2. (Optional) Create `.env` file for custom API URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start React development server:
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view yala-safari-crew-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

✅ **Frontend is running!** Browser should open automatically.

---

### Option 2: Run Without MongoDB (Sample Data Only)

The application includes sample data and will work even without MongoDB!

1. **Start Backend** (it will show connection error but still work):
```bash
cd backend
npm start
```

2. **Start Frontend** (in new terminal):
```bash
cd frontend
npm start
```

The frontend will display sample data when the API connection fails.

---

## 🧪 Testing the Application

### Test 1: Backend API Health Check

Open your browser or use curl:
```
http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Yala Safari Crew API is running"
}
```

### Test 2: Test API Endpoints

#### Get All Tours:
```
http://localhost:5000/api/tours
```

#### Get All Car Rentals:
```
http://localhost:5000/api/rentals
```

#### Get All Packages:
```
http://localhost:5000/api/packages
```

### Test 3: Frontend Navigation

1. **Home Page** (`http://localhost:3000`)
   - ✅ Check hero section displays
   - ✅ Verify service cards are visible
   - ✅ Test "Explore Tours" and "View Packages" buttons

2. **About Us** (`http://localhost:3000/about`)
   - ✅ Verify company information displays
   - ✅ Check mission and values sections

3. **Tours** (`http://localhost:3000/tours`)
   - ✅ Verify tours are listed
   - ✅ Check tour details (price, duration, location)
   - ✅ Test "Book Now" buttons

4. **Car Rentals** (`http://localhost:3000/rentals`)
   - ✅ Verify vehicles are listed
   - ✅ Check vehicle details (type, capacity, price)
   - ✅ Test "Rent Now" buttons

5. **Packages** (`http://localhost:3000/packages`)
   - ✅ Verify packages are listed
   - ✅ Check package details (destinations, includes, highlights)
   - ✅ Test "Book Package" buttons

6. **Gallery** (`http://localhost:3000/gallery`)
   - ✅ Verify gallery images display
   - ✅ Check image categories

7. **Contact** (`http://localhost:3000/contact`)
   - ✅ Verify contact form displays
   - ✅ Test form submission
   - ✅ Check contact information

### Test 4: Responsive Design

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
4. Verify:
   - ✅ Navbar collapses to hamburger menu on mobile
   - ✅ Cards stack properly on small screens
   - ✅ Text remains readable

### Test 5: Navigation

1. Click through all navbar links
2. Verify:
   - ✅ Active page is highlighted in navbar
   - ✅ Smooth page transitions
   - ✅ Footer appears on all pages
   - ✅ Logo links back to home

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: MongoDB connection error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Start MongoDB service
- Or use MongoDB Atlas (cloud)
- Or ignore it - app works with sample data

**Problem: Port 5000 already in use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change PORT in `backend/.env` to another port (e.g., 5001)
- Update frontend `.env` with new API URL

### Frontend Issues

**Problem: Cannot connect to backend**
- Check if backend is running
- Verify `REACT_APP_API_URL` in frontend `.env`
- App will show sample data if API fails (this is normal)

**Problem: Tailwind CSS not working**
- Ensure `tailwind.config.js` exists
- Check `postcss.config.js` exists
- Restart the React dev server

**Problem: Port 3000 already in use**
```
Something is already running on port 3000
```
**Solution:**
- Choose 'Y' to run on different port
- Or close the other application using port 3000

---

## ✅ Success Checklist

- [ ] Backend server starts without errors
- [ ] Frontend opens in browser at localhost:3000
- [ ] All navbar links work
- [ ] Tours page displays tours
- [ ] Rentals page displays vehicles
- [ ] Packages page displays packages
- [ ] Contact form is functional
- [ ] Gallery displays images
- [ ] About page shows company info
- [ ] Mobile menu works on small screens
- [ ] API health check returns OK

---

## 🎯 Quick Test Commands

### Test Backend API (using PowerShell):
```powershell
# Health check
Invoke-WebRequest -Uri http://localhost:5000/api/health

# Get tours
Invoke-WebRequest -Uri http://localhost:5000/api/tours

# Get rentals
Invoke-WebRequest -Uri http://localhost:5000/api/rentals

# Get packages
Invoke-WebRequest -Uri http://localhost:5000/api/packages
```

### Test with Browser:
Just open these URLs:
- `http://localhost:5000/api/health`
- `http://localhost:5000/api/tours`
- `http://localhost:5000/api/rentals`
- `http://localhost:5000/api/packages`

---

## 📝 Notes

- The app works with **sample data** even without MongoDB
- Backend must be running for full API functionality
- Frontend will automatically reload when you make changes
- Use `Ctrl+C` to stop servers


