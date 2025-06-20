# Dougherty Valley High School Jazz Club Website

This repository contains the official website for the Dougherty Valley High School Jazz Club, built with React and Vite.

**Live Site:** [https://DVHS-Jazz-Club.github.io](https://DVHS-Jazz-Club.github.io)

## About This Project

This project is a modern, dynamic single-page application created to showcase the club's activities, upcoming performances, and contact information. It is designed to be easily updated by club officers, even those with limited coding experience, through a user-friendly admin panel.

## Features

- **Dynamic Content**: All site content (performances, gallery, officers) is loaded from a central `data.json` file.
- **Admin Panel**: A password-protected route at `/#/admin` allows for easy management of the site's gallery.
- **User-Friendly Editing**: Add, edit, or delete gallery items through a form-based interface.
- **Simple Deployment**: Configured for one-command deployment to GitHub Pages.
- **Responsive Design**: Looks great on desktops, tablets, and mobile devices.

## Tech Stack

- **[React](https://react.dev/)**: A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A fast and modern build tool for web development.
- **[React Router](https://reactrouter.com/)**: For handling client-side routing.
- **[GitHub Pages](https://pages.github.com/)**: For hosting the live website.

## How to Update Site Content

The most common task will be updating the gallery. For other content like officer lists or performance details, you can edit the `public/data.json` file directly.

### Managing the Gallery (Easy Method)

1.  **Access the Admin Panel**: Navigate to **[https://DVHS-Jazz-Club.github.io/#/admin](https://DVHS-Jazz-Club.github.io/#/admin)**.
2.  **Enter Password**: The password is `jazzisawesome`.
3.  **Make Changes**:
    - Click **"Add New Gallery Item"** to open the form for a new image or video.
    - Click **"Edit"** on any existing item to modify its details.
    - Click **"Delete"** to remove an item.
4.  **Save Your Changes**:
    - After making your changes, scroll to the "Save Your Changes" section.
    - Click the **"Copy Updated JSON"** button. This copies all the site data to your clipboard.
5.  **Apply Changes to the Code**:
    - In your code editor, open the `public/data.json` file.
    - Select all the text in the file and paste the content from your clipboard.
6.  **Deploy**: Follow the deployment instructions below to make your changes live.

## Development and Deployment

Follow these steps if you want to run the project locally or deploy a new version to the live site.

### Running Locally

1.  **Clone the repository**:
    ```sh
    git clone https://github.com/DVHS-Jazz-Club/DVHS-Jazz-Club.github.io.git
    cd DVHS-Jazz-Club.github.io
    ```
2.  **Install dependencies**:
    ```sh
    npm install
    ```
3.  **Start the development server**:
    ```sh
    npm run dev
    ```
    This will open the site on [http://localhost:5173](http://localhost:5173). The server will automatically reload when you save changes.

### Deploying to GitHub Pages

After you've committed your changes (like updating the `data.json` file), you can deploy the site by running a single command:

```sh
npm run deploy
```

This command automatically builds the site and pushes it to the `gh-pages` branch, making your changes live within a few minutes.
