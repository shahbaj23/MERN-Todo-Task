# Todo App (MERN Stack)

A full-stack Todo application built using **MongoDB, Express, React, Node.js** with authentication and protected routes.

---

## Features

* User Authentication (Register & Login)
* Create Todo
* Edit Todo
* Delete Todo
* Toggle Complete (Checkbox)
* Protected API using JWT
* Persistent Login using LocalStorage
* Clean UI with Tailwind CSS

---

##  Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (Authentication)
* bcrypt (Password hashing)

---

##  Project Structure

```
client/
  ├── components/
  ├── context/
  ├── pages/
  └── App.jsx

server/
  ├── Controllers/
  ├── Models/
  ├── Routes/
  └── middleware/
```

---


### 2️⃣ Install Dependencies

#### Backend

```
cd server
npm install
```

#### Frontend

```
cd client
npm install
```



###  Run Project

#### Start Backend

```
cd server
npm run dev
```

#### Start Frontend

```
cd client
npm run dev
```

---

##  API Endpoints

### Auth

* `POST /user/register` → Register user
* `POST /user/login` → Login user

### Todo

* `POST /todo/create-todo` → Create todo
* `GET /todo/get-todo` → Get all todos
* `PUT /todo/update-todo/:id` → Update todo
* `PUT /todo/toggle-todo/:id` → Toggle complete
* `DELETE /todo/delete-todo/:id` → Delete todo

---

## Authentication Flow

1. User logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent in headers for protected routes

```
Authorization: Bearer <token>
```

---

## Future Improvements

*  Search Todos
*  Filter (All / Completed / Pending)
*  Dark Mode
*  Toast Notifications
*  Responsive Enhancements

---
##  Author

**Shahbaj**

---

⭐ If you like this project, don't forget to star the repo!
