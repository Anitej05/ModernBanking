# ModernBanking - A Full-Stack Banking Application

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](url_to_build_status)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](url_to_license)

ModernBanking is a comprehensive, full-stack web application designed to simulate a modern banking experience. It features user authentication, account management, and essential banking operations such as crediting, debiting, and transferring funds. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this project showcases a robust and scalable architecture for web applications.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Features

-   **User Authentication:**
    -   Secure user registration and login functionality.
    -   Protected routes accessible only to authenticated users.
-   **Account Management:**
    -   Create new bank accounts with customizable names and types.
    -   View details of all associated bank accounts.
    -   Dynamic display of account balances, formatted in INR.
-   **Banking Operations:**
    -   Credit money to accounts.
    -   Debit money from accounts with balance checks.
    -   Transfer funds between accounts, ensuring data consistency.
-   **Responsive Design:**
    -   User-friendly interface adaptable to various screen sizes.
    -   Visually appealing design with modern UI elements.
-   **Error Handling:**
    -   Comprehensive error handling for a seamless user experience.
    -   Informative error messages for invalid inputs and insufficient funds.

## Technologies Used

ModernBanking leverages the power of the MERN stack along with other notable technologies:

-   **Frontend:**
    -   [React](https://react.dev/): JavaScript library for building user interfaces.
    -   [React Router](https://reactrouter.com/): Declarative routing for React.
    -   [React Hook Form](https://react-hook-form.com/): Performant, flexible, and extensible forms with easy-to-use validation.
    -   [Bootstrap](https://getbootstrap.com/): CSS framework for responsive, mobile-first front-end development.
    -   [bootstrap-icons](https://www.npmjs.com/package/bootstrap-icons): Library of high quality, open source icons
-   **Backend:**
    -   [Node.js](https://nodejs.org/): JavaScript runtime environment.
    -   [Express.js](https://expressjs.com/): Web framework for Node.js.
    -   [MongoDB](https://www.mongodb.com/): NoSQL document database.
    -   [Mongoose](https://mongoosejs.com/): Elegant MongoDB object modeling for Node.js.
-   **Other:**
    -   [CORS](https://www.npmjs.com/package/cors): Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
## Installation

Follow these steps to set up ModernBanking locally:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/ModernBanking.git
    cd ModernBanking
    ```

2. **Install backend dependencies:**

    ```bash
    cd server
    npm install
    ```

3. **Install frontend dependencies:**

    ```bash
    cd ../client
    npm install
    ```

4. **Set up environment variables:**

    -   Create a `.env` file in the `server` directory.
    -   Add your MongoDB connection string:

        ```
        MONGODB_URI=mongodb://localhost:27017/accounts
        ```

5. **Start the application:**

    -   **Development mode:**

        ```bash
        # In the server directory
        npm start

        # In the client directory (in a separate terminal)
        npm run dev
        ```

    -   **Production mode:**
        -   Build the frontend first:
        ```bash
            cd client
            npm run build
        ```
        -   Then start the server:
        ```bash
            cd server
            node server.js
        ```
        This will serve the frontend files from the client/dist folder.

## Usage

After launching the application, open your web browser and navigate to `http://localhost:5173` (or the port specified by your frontend development server).

-   **Register** a new user or **Login** with existing credentials.
-   **Create** new accounts through the "Create Account" button.
-   **Credit** or **Debit** funds using the respective buttons.
-   **Transfer** money between accounts via the "Send Money" functionality.

## API Endpoints

The following API endpoints are available in the backend:

| Method | Endpoint               | Description                                          |
| ------ | ---------------------- | ---------------------------------------------------- |
| POST   | `/login`               | Authenticate a user.                                 |
| POST   | `/register`            | Register a new user.                                |
| POST   | `/accounts/get-account` | Retrieve user's accounts.                            |
| POST   | `/actions/credit`       | Credit money to an account.                          |
| POST   | `/actions/debit`        | Debit money from an account.                         |
| POST   | `/actions/transaction`  | Transfer money between two accounts.                 |
| POST   | `/actions/create`       | Create a new account for a user.                    |

## Contributing

Contributions to ModernBanking are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m "Add your commit message"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

-   Thanks to the developers of all the open-source libraries and frameworks used in this project.
-   Special thanks to the MERN stack community for providing excellent learning resources.

---

**Thank you for checking out ModernBanking!** We hope you find it a valuable learning resource and a solid foundation for building your own full-stack applications.
