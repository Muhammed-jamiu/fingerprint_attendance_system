# Biometric Fingerprint Attendance Management System

## Project Overview

The Biometric Fingerprint Attendance Management System is a web-based application designed to improve attendance management in educational institutions. The system provides an efficient platform for managing students, recording attendance, generating reports, and monitoring attendance activities.

The project includes a prototype fingerprint attendance module that demonstrates how biometric authentication can be integrated into an attendance management system. The current implementation focuses on the software platform and attendance workflow simulation rather than physical fingerprint hardware integration.

## Technology Stack

### Frontend

- HTML5
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose ODM

### Authentication

- JSON Web Token (JWT)

### Hosting Platforms

- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

---

## System Features

### User Authentication

- Secure login system using JWT authentication.
- Protected routes and role-based access control.

### Student Management

- Add new students.
- Update student information.

### Attendance Management

- Create attendance sessions.
- Record student attendance.
-

### Fingerprint Attendance Prototype

- Demonstrates the workflow of biometric attendance verification.
- Simulates fingerprint-based attendance recording.
- Serves as a foundation for future hardware integration.

### Dashboard and Reporting

- View attendance statistics.
- Monitor student participation.
- Generate attendance reports.

---

## System Workflow

1. User logs into the system.
2. JWT token is generated and stored.
3. Authorized users access the dashboard.
4. Administrators manage student records and attendance sessions.
5. Attendance is recorded through the attendance module.
6. Data is stored in MongoDB Atlas.
7. Reports and attendance records can be viewed and managed through the dashboard.

---

## Installation Guide

### Prerequisites

Ensure the following are installed:

- Node.js
- npm
- MongoDB Atlas Account
- Git

---

## Clone the Repository

```bash
git clone https://github.com/Muhammed-jamiu/fingerprint_attendance_system
```

Navigate to the project folder:

```bash
cd fingerprint-attendance-system
```

---

## Backend Setup

Navigate to the backend folder:

```bash
cd server
```

Install dependencies:

````bash
npm install


Start the backend server:

```bash
npm run dev
````

or

```bash
npm start
```

---

## Frontend Setup

Navigate to the frontend folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run the frontend application:

```bash
npm run dev
```

or

```bash
npm start
```

---

## Common Packages Used

### Backend Packages

```bash
## Navigate to the server folder and locate package.json to see all the below package:
npm install express
npm install mongoose
npm install jsonwebtoken
npm install bcryptjs
npm install cors
npm install dotenv


npm install nodemon --save-dev
```

### Frontend Packages

```bash
npm install
```

Additional frontend packages may vary depending on the implementation.

---

## Project Structure

```text
Fingerprint-attendance-system/
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## Deployment

### Frontend Deployment

Hosted on Netlify.

### Backend Deployment

Hosted on Render.

### Database Hosting

MongoDB Atlas.

---

## Future Improvements

- Integration with actual fingerprint hardware.
- Mobile application support.
- Advanced attendance analytics.
- Email and notification system.
- Integration with institutional management systems.

---

## Author

Developer: Muhammed Jamiu (Jamoskeydev)

GitHub Repository:https://github.com/Muhammed-jamiu
