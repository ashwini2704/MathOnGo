Link of postman -- https://documenter.getpostman.com/view/31304454/2sA2xcaacm

This project is a simple Node.js server that provides user authentication using Google OAuth and issues JSON Web Tokens (JWT) upon successful login.

Features
Google OAuth for user authentication
JWT generation and HTTP-only cookie set upon successful login


Prerequisites
Node.js installed
MongoDB set up with a database and connection URI
Google Developer Console account set up with OAuth credentials
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/your-repo.git
Install dependencies:

bash
Copy code
cd your-repo
npm install
Set up environment variables:


Usage
Start the server:

npm start
Visit http://localhost:3000 in your browser for frontend.

Routes
/auth/google: Initiates the Google OAuth authentication process.
/auth/google/callback: Callback endpoint for Google OAuth. Handles user creation or login, issues a JWT, and sets it as an HTTP-only cookie.
http://localhost:3000 /dashboard: After successful authentication it will redirect to this page
