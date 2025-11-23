# Quick API Testing Guide

## 🧪 Test Backend API Endpoints

### Using Browser
Simply open these URLs in your browser:

1. **Health Check:**
   ```
   http://localhost:5000/api/health
   ```

2. **Get All Tours:**
   ```
   http://localhost:5000/api/tours
   ```

3. **Get All Car Rentals:**
   ```
   http://localhost:5000/api/rentals
   ```

4. **Get All Packages:**
   ```
   http://localhost:5000/api/packages
   ```

### Using PowerShell (Windows)

```powershell
# Health Check
Invoke-RestMethod -Uri http://localhost:5000/api/health

# Get Tours
Invoke-RestMethod -Uri http://localhost:5000/api/tours | ConvertTo-Json

# Get Rentals
Invoke-RestMethod -Uri http://localhost:5000/api/rentals | ConvertTo-Json

# Get Packages
Invoke-RestMethod -Uri http://localhost:5000/api/packages | ConvertTo-Json
```

### Using curl (if installed)

```bash
# Health Check
curl http://localhost:5000/api/health

# Get Tours
curl http://localhost:5000/api/tours

# Get Rentals
curl http://localhost:5000/api/rentals

# Get Packages
curl http://localhost:5000/api/packages
```

### Expected Responses

**Health Check:**
```json
{
  "status": "OK",
  "message": "Muthugala Tours API is running"
}
```

**Tours/Rentals/Packages:**
```json
[
  {
    "_id": "...",
    "title": "...",
    ...
  }
]
```

Or empty array `[]` if no data in database (app will show sample data in frontend).

