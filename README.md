#Task Management Application

Introduction

This project is a simple task management application designed to allow users to create, update, and delete tasks. Each task consists of a title, description, and status. Users can view a list of tasks and filter them by status. Additionally.


Technologies Used
    Backend: Node.js with Express
    Database: MongoDB
    
Backend API Endpoints

    GET /api/tasks: Retrieve all tasks.
    POST /api/tasks: Create a new task.
    PUT /api/tasks/:id: Update an existing task.
    DELETE /api/tasks/:id: Delete a task.

Setup Instructions

    Clone the repository: git clone <repository_url>
    Install dependencies:
        Backend: cd backend && npm install
    Set up the MongoDB database and configure the connection string in db.js.
    Start the backend server: cd backend && npm start

Security Measures

    Basic security measures are implemented, such as input validation and protection against common vulnerabilities like SQL injection and XSS attacks.

Thank you for reviewing this project!
