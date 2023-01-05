# Code Portfolio
**by Liisa Törmäkangas**

This is a portfolio of some selected pieces of code I have written since I started studying coding in January 2022.

---
## Code written by Python
These three code examples are written in a Helsinki Open University course *Advanced Course in Programming* during Autumn 2022.

### **Clock**
in directory: clock_python
>Clock was one of the course tasks for practicing the use of Pygame, an open-source library for developing multimedia applications using Python language. The task was just to create a watch dial to show the current time with hour, minute, and second hands. 

>The Clock code is quite simple and the application is very small overall. However, making this code to work has been one of the most greatest "victories" during my (yet very short) career in coding when struggling to solve tasks that feel extremely hard to dissolve with the knowledge you have. With this task also knowing the basics of trigonometry helped to solve how to set the end points of the clock hands.

**To run a Pygame application:**
- first install Pygame to your computer by running a command-line command:
```bash
pip3 install pygame
```
- in your code editor/shell, run the file: clock.py
### **Robot Game**
in directory: robogame_python
>This game - also exploiting Pygame - was the final project of the *Advanced Course in Programming*. The task was to create a game with a moving character collecting some things and including a counter to show the progress in game.

**To run a Pygame application:**
- first install Pygame to your computer by running a command-line command:
```bash
pip3 install pygame
```
- run the file: game.py
- enjoy the fabulous game!!

### **Storage Application**
in directory: storageApp_python
>This application was an exam task of *Advanced Course in Programming* focused on object-oriented programming. The task was to create an application for handling a storage data: the app should ask user for the name of the data file, create this file, and use several different commands to add or remove items from the storage file, or to list the contents of the file.

**To run the application:**
- run the file: storage.py

---
## React JavaScript application
in directory: surveys_javascript
>This  is an application for creating surveys, collecting survey answers, and visualizing data from surveys. The application was a frontend UI project work on *Buutti JavaScript Trainee* course during June and July 2022. The project was originally a pair work done in co-operation with a course mate Tuomo Kurikka. The code presented here is modified and refactored since that, and in the present form, a wide majority of the code is written by me. At the moment, the application is using JSON server and json.db for data storage. The backend utilizing MongoDB is currently on my to-do-list.

The application is using following technologies and libraries:
- React and React router
- Axios for database calls
- npm JSON-server for creating REST API backend with bd.json file
- React Bootstrap for creating UI styling
- Chart.js to include charts and visualizing data

To start the application from the command line, run:
```bash
npm start
``` 
In addition, to get access to db.json, the JSON server needs to be started in another terminal by running:
```bash
npm run server
```
---
## Express MongoBD backend for library application
in directory: expressBackend_jacascript
>This folder includes a backend server files utilizing MongoDB for a simple library application. The library app UI is not written by me and is therefore not included here. However, the api requests from the frontend can be found in the apiRequests-directory. The library app allows unregistered users to view the books, but only registered users can modify book data or add or delete books.

The application is using following technologies and libraries:
- Express server library for Node
- Mongoose library with Node.JS for MongoDB
- Dotenv library to store authentication data
- Bcrypt library for password hashing
- Jsonwebtoten (jwt) to create tokens for password comparisons
- Passport library for authentication of users
- Node.JS Cors middleware to allow the frontend and backend connection

Since these files include only the backend part, the application cannot be run as a whole. In order to test the backend with REST client or Postman, you need to install MongoDB:

[MongoDB](https://www.mongodb.com/docs/manual/installation/)

You can connect the database either by command line tool mongosh or by GUI MongoDB Compass:

[Compass](https://www.mongodb.com/products/compass)