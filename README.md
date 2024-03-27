![image](https://github.com/momosetti/flixflex/assets/29590613/4ebc2aab-5aa8-4c21-a458-5ba24764c45d)
# FlixFlex

A movie app built with Next.js and TailwindCSS using Firebase for authentication.

## Deployment

The project is deployed on Vercel at the following link: https://flixflex-app.vercel.app
To test the app use the following credentials to login:
email: `demo@example.com`
password: `Demo2023!`

## Technologies Used

- [Next.js](https://nextjs.org/) - A React framework for building fast and scalable web applications.
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [Firebase](https://firebase.google.com/) - A Backend-as-a-Service (BaaS) platform for authentication and real-time data management.
- [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api) - A RESTful API for accessing movie and TV show information.
- [Yarn](https://yarnpkg.com/) - A package manager for managing dependencies and project setup.

## Why These Technologies Were Chosen

**Next.js** was chosen for its ability to provide server-side rendering and optimized performance. This is important for delivering a fast and responsive user experience, especially for a movie app that requires fetching and rendering large amounts of data. Also this is important for FlixFlex because it helps us avoid exposing the TMDb API key, and use the `api` folder in Next.js to create custom APIs.

**TailwindCSS** was chosen for its utility-first approach to CSS, allowing for rapid development of custom designs. This was crucial in order to meet the project's deadline and ensure a consistent design across all pages.

**Firebase** was chosen for its ease of use and robust authentication features. It allowed for a simple and secure login process for users, without the need for building a backend from scratch.

**The TMDb API** was chosen for its extensive library of movie and TV show information, as well as its robust documentation and easy integration into the app.

**Yarn** was chosen as the package manager due to its speed and reliability, as well as its ability to better handle conflicts and dependencies compared to npm.

## Prerequisites

Before running the project locally, you will need to create a `.env` file in the root directory and add your TMDb API key as `TMDB_API_KEY`.

## How to Run the Project Locally

To run FlixFlex locally, follow these steps:

1.  Clone the repository `git clone https://github.com/momosetti/FlixFlex.git`
2.  Navigate to the project directory `cd FlixFlex`
3.  Install the dependencies `yarn install`
4.  Start the development server `yarn dev`
5.  Open your browser and navigate to `http://localhost:3000`

## Features

- Search movies or TV shows
- View movie or TV show details
- View the top rated movies and TV shows
- Watch trailers of movies or TV shows
- Login using Firebase

## Contributing

This project is open to contributions and improvements. If you have an idea or a bug fix, please feel free to open a pull request.
