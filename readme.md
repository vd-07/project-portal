# Project Portal &#127891;

[![Netlify Status](https://api.netlify.com/api/v1/badges/20df2997-7d7e-4a1d-93ac-9bad3ddc900b/deploy-status)](https://app.netlify.com/sites/projectify-portal/deploys)

- A portal where professors can add projects along with necessary details.
- Students can select the projects based on their preferences and contact the professors using the contact details.

> Frontend deployed using CI/CD at (Netlify)[https://projectify-portal.netlify.app/] <br>
> Backend deployed using CI/CD at (Heroku)[https://backend-project-portal.herokuapp.com/]
<br>

![ezgif com-optimize](https://user-images.githubusercontent.com/50241813/143494265-cbaac349-2cce-45cd-a051-e4befc8e599a.gif)

# Contents &#128218;

* [Why](#why) 
* [Features](#responsibilities)
* [Directory Structure](#directory-structure)
* [Installation](#installation)

#

<a name="why" />

## Why &#10067;

Before the pandemic, professors used to discuss projects they are mentoring and interested ones could go to their offices and apply for the same. 

During the pandemic, contacting professors one by one over call or social media can become a hassle. Moreover, students may not be familiar with the professors of different branches or of different areas of expertise and the projects they are offering. 


<a name="responsibilities" />

## Features &#127760;

#### Home Page:
- Enter as Student or Professor
- Professor Login/SignUp section: Basic authentication based on college id and password
- Students can directly see the projects

#### Project Page:
- A list of all projects along with details

#### Professor/Dashboard Page:
- Select and view a Project
- Edit a selected Project Description
- Delete a selected Project
- Add a new Project


<a name="directory-structure" />

## Directory Structure &#128193;

```
backend/
├── config : supporting configuration files
├── controllers : communication files between routes and services
├── loaders : files handling loading/boot up of the server
├── models : database model structure files
├── routes : end point files of backend
├── services : business logic
├── .env.example : environment variable examples
├── app.js : main server file
├── package-lock.json : lock dependencies 
├── package.json : project description and npm configurations

frontend/
├── public : main frontend files
├── src : react component files
├── .env.example : environment variable examples
├── package-lock.json : lock dependencies
├── package.json : project description

heroku.yml : heroku auto deployment configuration
readme.md : current readme file
.gitignore
```

<a name="installation" />

## Installation &#9881;

### Basic Requirements

#### Node

As `frontend` is a React application, and `backend` is a Node application, so Node and npm (Node Package Manager) are needed to be installed. Depending on your operating system, install the installer/binary/source code from the [official Node.js website](https://nodejs.org/en/download/), or [install using a package manager](https://nodejs.org/en/download/package-manager/).

Make sure to install the LTS version (currently 14.x) of Node. Alternatively, use [nvm](https://github.com/nvm-sh/nvm) to install and manage versions of Node and npm.

After node and npm have been installed, check their versions
```bash
node -v
npm -v
```

#### MongoDB Atlas Account

Create and Atlas account on the [official MongoDB Atlas website](https://www.mongodb.com/atlas/database). Deploy a Cluster and follow the steps to get the `credentials` which we will use to connect to the backend. The credential will be something like 
```
mongodb+srv://<user>:<password>@cluster0.ygl2g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

### Backend

1. `cd` into the `backend` directory
2. Install all dependencies 
    ```
    npm install
    ```

    > Make sure `npm` and `node` are preinstalled

3. Create `.env` file using the `.env.example` file
3. Start the server
    ```
    npm start
    ```

    > The default port is 8080, can be configured in `.env` file

### Frontend

1. `cd` into the `frontend` directory
2. Install all dependencies 
    ```
    npm install
    ```

    > Make sure `npm` and `node` are preinstalled

3. Create `.env` file using the `.env.example` file
3. Start the server
    ```
    npm start
    ```

    > The default port is 3000, can be configured in `.env` file
