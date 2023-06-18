# WORKANA CHALLENGE

This project contains an API in PHP, React Template and PostgreSQL database.

## API

### Folder Structure

- api
- src/tests
- src/controllers/handler
- src/connection

### Getting Started

1. Install the Composer dependencies by running the following command: `composer require`

2. Import the "database.sql" file into pgAdmin 4 (postgree)

3. Edit the connection credentials in the src/connection/Config.php file:
```php
# Connection example:
<?php
namespace src\connection;

// Connection credentials
class Config {
    const HOST = "localhost";
    const USERNAME = "postgres";
    const PASSWORD = "root";
    const DATABASE = "softexpert_challenge";
}
?>
```
5. To start the API, run the following command in the terminal: `php -S your_ip`. It is recommended to use the IP or some domain other than localhost for the application to work properly.

6. If you want to run tests, make sure you have PHPUnit installed. If not, install it using the following command: `composer require phpunit/phpunit`

7. The test files are located in the `src/tests` folder. To run the tests, use the following command: `phpunit src/tests/File.php`

## Frontend

### Folder Structure

- frontend
- build
- public
- src
- src/assets
- src/components
- src/layouts
- src/views

### Getting Started

1. Install the Node dependencies by running the following command: `npm install --legacy-peer-deps`

2. To start the development server, use the following command: `npm start`

3. To build the production-ready bundle, use the following command: `npm run build`

4. To change the API call domain, open the file: src/components/api/api.js and change the line: `const API_URL = "";` to your api domain

5. To login, enter email: admin@admin.com password: 1234

