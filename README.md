# Exercise Tracker

This is my solution to the **Exercise Tracker** challenge from FreeCodeCamp. The project involves building a full-stack JavaScript application that allows users to track their workouts and log exercises with associated descriptions, durations, and dates.

## Project Description

The goal of this project is to create a simple exercise tracker where users can:
- Create a user by providing a username.
- Log exercises with descriptions, durations, and optional dates.
- Retrieve the exercise log of a user, with the ability to filter by date range and limit the number of records returned.

The app uses **Node.js**, **Express**, and a **MongoDB** database to manage user data and exercise logs. 

## Key Features
- **POST /api/users**: Allows a user to be created by providing a username.
- **GET /api/users**: Returns a list of all users.
- **POST /api/users/:_id/exercises**: Allows a user to log an exercise by providing a description, duration, and optional date.
- **GET /api/users/:_id/logs**: Retrieves a user's exercise log with optional parameters to filter by date range and limit the number of records.

## Learning Outcomes

Through completing this project, I learned and practiced the following:

### 1. **Building a Full-Stack JavaScript Application**
   - I learned how to integrate **Node.js** with **Express** to handle HTTP requests and interact with a **MongoDB** database. This helped me understand how to set up basic RESTful routes to handle the user and exercise log data.

### 2. **User Creation and Handling**
   - I learned how to set up the functionality to create and retrieve users. The application allows users to be created with just a username, and their unique ID is stored to reference exercises later.
   - I used **MongoDB** to store user data, and learned how to interact with MongoDB using **Mongoose**.

### 3. **Handling Exercise Logs**
   - I learned how to implement logging functionality where each user can log multiple exercises. Each exercise is associated with a description, duration, and date.
   - I became familiar with handling **optional parameters** like date (defaulting to the current date if not provided) and how to format and store the date in the correct string format using JavaScript's **Date API**.

### 4. **Advanced Querying**
   - I learned how to perform advanced querying using parameters like `from`, `to`, and `limit` to filter and paginate a user’s exercise log. This taught me how to manipulate date values in JavaScript and MongoDB to meet the user’s needs.

### 5. **API Integration and Testing**
   - I used **Postman** and **Insomnia** to test my API endpoints. This allowed me to ensure that each route was functioning as expected and that the correct data was returned for each request.

### 6. **Deploying the Application**
   - After building the app locally, I learned how to deploy it to **Glitch** or **Heroku** to make it publicly available, giving me hands-on experience with hosting a Node.js app.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB (via Mongoose)**
- **Date API (for formatting and manipulating dates)**

## How to Use

1. Clone the repository:
   ```bash
   git clone <repository-url>
