# Muthugala Tours - Wildlife Safari Web Application

A full-stack MERN (MongoDB, Express, React, Node.js) web application for Muthugala Tours, a wildlife safari company offering tours, car rentals, and safari packages.

## Features

- 🦁 **Wildlife Tours**: Browse and book various wildlife safari tours
- 🚗 **Car Rentals**: Rent vehicles for your safari adventures
- 📦 **Safari Packages**: All-inclusive safari packages for different needs
- 📸 **Gallery**: View amazing safari experiences
- 📞 **Contact**: Get in touch with the company
- ℹ️ **About Us**: Learn about Muthugala Tours

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/muthugala-tours
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
test-safari/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Tour.js
│   │   ├── CarRental.js
│   │   └── Package.js
│   ├── routes/
│   │   ├── tours.js
│   │   ├── rentals.js
│   │   └── packages.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   ├── Gallery.js
│   │   │   ├── Tours.js
│   │   │   ├── Rentals.js
│   │   │   └── Packages.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## API Endpoints

### Tours
- `GET /api/tours` - Get all tours
- `GET /api/tours/:id` - Get single tour
- `POST /api/tours` - Create tour
- `PUT /api/tours/:id` - Update tour
- `DELETE /api/tours/:id` - Delete tour

### Car Rentals
- `GET /api/rentals` - Get all car rentals
- `GET /api/rentals/:id` - Get single car rental
- `POST /api/rentals` - Create car rental
- `PUT /api/rentals/:id` - Update car rental
- `DELETE /api/rentals/:id` - Delete car rental

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get single package
- `POST /api/packages` - Create package
- `PUT /api/packages/:id` - Update package
- `DELETE /api/packages/:id` - Delete package

## Usage

1. Make sure MongoDB is running
2. Start the backend server
3. Start the frontend development server
4. Open `http://localhost:3000` in your browser
5. Navigate through the website to explore tours, rentals, and packages

## Notes

- The application includes sample data that will be displayed if the API connection fails
- Make sure to configure your MongoDB connection string in the backend `.env` file
- For production, update the API URL in the frontend `.env` file

## License



