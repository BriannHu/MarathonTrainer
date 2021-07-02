# Marathon Trainer

🚧 Note: This is currently a work in progress. 🚧

## Introduction

Marathon Trainer is full-stack web app that aims to provide all the statistics and functionalities that a runner would need in their training of an upcoming race. It consists of a dashboard that contains a high-level overview of the different components of the app, which can be expanded into a separate, more detailed page.

![Dashboard Screenshot](client/public/screenshots/dashboard_screenshot.png)

## Technologies Used

- **React (Material UI)**: Styles frontend of the app using Material UI components, with additional React libraries used such as React-Chartjs-2 and React-Router.
- **MongoDB Atlas**: Stores all the information pertaining to each user and their run statistics (attributes includes name, date, distance, duration, pace).
- **Express.js + Node.js**: Contains models for URL routing as well as providing export functionality to allow client to save run data as a CSV file.

## Installation

To run this app on your local browser, first navigate to the folder you wish to store it in and clone it:

```
git clone https://github.com/BriannHu/MarathonTrainer.git
```

After the repository has been cloned, the necessary dependencies will need to be installed. Please ensure that you have the latest version of npm installed (you can install it [here](https://www.npmjs.com/)).

The necessary dependencies can be installed by navigating to **both** the `client` folder and the `server` folder (_refer to the Usage section for more details_), and running the following command:

```
npm install
```

## Usage

The folder structure of this project can be represented as the following:

```
MarathonTrainer
|   README.md
|
└───client
|   |   package.json
|   |   other client files
|   └───other client folders
|
└───server
    |   package.json
    |   other server files
    └───other server folders
```

_Note: Please ensure that the dependencies in **both** the `client` and `server` folders have already been installed._

Before starting the app locally, ensure that you already have a MongoDB cluster that you can connect to, with the `server/.env` file modified as necessary (instructions can be found [here](https://www.youtube.com/watch?v=rPqRyYJmx2g&ab_channel=MongoDB)).

To start the backend, navigate to the `server` folder and run the following command:

```
nodemon server
```

To start the frontend, navigate to the `client` folder and run the following command:

```
npm start
```

The app should now be running locally!

## Future Changes

My goal for this project is to continually improve it with additional features, the following having highest priority:

- User authentication (runners can make their own profiles)
- Increasing customizability based on runner's experience (ie. user can choose between beginner/intermediate/advanced)
- Implement a working scheduling system, with runner being able to set notifications and reminders
