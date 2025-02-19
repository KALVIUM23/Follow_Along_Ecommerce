# Milestone1
This project refers to the implementation of an e-commerce application containing a structured front-end and a back-end; 
the front end is responsible for the user's interface and experiences, while back-end is engaged in business logics, operations with databases and APIs.
# Milestone 2
# Login Page - React & CSS

## Overview
This project is a simple, modern login page made using **React.js** and **CSS**. Features include:
Email and Password input fields
"Remember Me" checkbox
"Forgot Password?" link
Submit button
Sign-up option
Icons for email input and password visibility toggle

## Features
Responsive UI Designed for smooth customer experience with varying screen sizes.
- **Password Visibility Toggle:** Users can toggle the password visibility.
- **Validation (Optional):** Can be extended with form validation.

## ????️ Technologies Used
- **React.js** - Component-based UI development
- **CSS** - Styling for the form and layout
- **React Icons** - Icons for email and password fields

- ## Milestone 7: User Login Functionality

### Learning Goals
- Validate user credentials during login.
- Compare the encrypted password with the user’s input.

### Login Authentication Process
1. User provides email/username and password on the login page.
2. Backend retrieves the user record based on the provided email/username.
3. If the user is not found, an error "User does not exist" is returned.
4. The user's input password is hashed using bcrypt and compared to the stored hashed password.
5. If they match, the user is authenticated; otherwise, an error is sent.

### Implementation
- Created a login endpoint in `login.js` that accepts user credentials and validates them.
- Used bcrypt to hash and compare passwords.

### How to Run
1. Install dependencies: `npm install`
2. Start the server: `node login.js`
3. Test the login endpoint using a tool like Postman or curl.
