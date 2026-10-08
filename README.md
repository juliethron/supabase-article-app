# Article App

A responsive article publishing application built with HTML, CSS, JavaScript and Supabase.

## About

This project was created as part of a frontend development assignment using Supabase as a backend service.

The application allows users to:

- Register an account
- Log in and log out
- Confirm their email address
- Browse published articles
- Create and publish articles when authenticated
- Store and retrieve article data using Supabase

## Technologies

- HTML5
- CSS3
- JavaScript
- Supabase
- Supabase Authentication
- Supabase PostgreSQL Database
- Row Level Security (RLS)

## Features

### Authentication

Users can register and log in using their email address and password. Email confirmation is enabled through Supabase Authentication.

The navigation changes depending on the user's authentication state. Logged-in users can access the article creation page, while logged-out users are redirected to the login page if they try to access it.

### Articles

Articles are stored in a Supabase database and displayed on the homepage.

Each article contains:

- Title
- Body
- Category
- Submission date
- User who submitted the article

### Security

Row Level Security is enabled on the articles table. Authenticated users are allowed to create articles, while the database ensures that articles are associated with the authenticated user.

## Design

The application uses a retro/Y2K-inspired desktop interface with window-style panels, blue gradients, grid backgrounds and system-status elements.

The design was created to give the application the appearance of an old desktop application while remaining responsive on different screen sizes.

## Project Structure

```text
article-app/
├── css/
│   └── style.css
├── js/
│   ├── articles.js
│   ├── auth.js
│   ├── main.js
│   └── supabase.js
├── create.html
├── index.html
├── login.html
├── register.html
└── README.md
