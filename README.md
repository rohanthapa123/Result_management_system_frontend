# Student Result Management System - Frontend

This repository contains the frontend code for the Student Result Management System, a web-based application designed to manage and display student results. The system is built using React.js and interacts with the backend to provide a seamless user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Demo Credentials](#demo-credentials)
- [Project Structure](#project-structure)
- [License](#license)
- [Contact](#contact)

## Features

- User authentication (Admin, Teacher, Student)
- Role-based access control
- Student result management
- Marksheet generation and viewing
- Class and subject management
- User-friendly interface with responsive design

## Technologies Used

- React.js
- Axios
- React Router
- jspdf
- jspdf-autotable
- react-csv
- react-icons
- chart.js
- react-select
- react-toastify
- HTML5
- CSS3
- JavaScript (ES6+)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
``` bash
   git clone https://github.com/rohanthapa123/Result_management_system_frontend
   cd Result_management_system_frontend
   npm install
```

Start the development server:

``` bash
   npm start
```
Environment Variable
``` bash
   REACT_APP_SERVER_URL = 'http://localhost:8080'
```
The application will be available at http://localhost:3000.

## Usage
After starting the development server, open your browser and navigate to http://localhost:3000.
Log in using the demo credentials provided below to explore different roles and functionalities.

## Demo Available at
https://srmss.netlify.app

Demo Credentials
- Admin
Username: admin@gmail.com
Password: admin123
- Teacher
Username: teacher@gmail.com
Password: teacher123
- Student
Username: student@gmail.com
Password: student123

```bash
student-result-management-frontend/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── services/
│   ├── utils   /
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── README.md
└── ...


```
- public/: Contains static files, including the HTML template.
- src/: Contains the main source code for the application.
- components/: Reusable components.
- pages/: Different pages of the application.
- services/: API service calls.
- App.js: The main app component.
- index.js: Entry point of the application.



License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or suggestions, please contact:

- **Rohan Thapa** - [Email](mailto:thaparohan2019@gmail.com)
- **LinkedIn**: [Rohan Thapa](https://www.linkedin.com/in/rohanthapa)
