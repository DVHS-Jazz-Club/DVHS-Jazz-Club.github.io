# Dougherty Valley High School Jazz Club Website

This repository contains the official website for the Dougherty Valley High School Jazz Club.

**Live Site:** [https://DVHS-Jazz-Club.github.io](https://DVHS-Jazz-Club.github.io)

---

## How to Update The Website

This guide is for club officers. The most common tasks are adding images to the gallery and updating event or officer information.

### Step 1: Add a New Image or Video

Before you can add new media to the gallery, you must upload the file to this repository.

1.  **Navigate to the Images Folder**: Go to the `public/images` folder in the GitHub repository. **[Click here for a direct link.](https://github.com/DVHS-Jazz-Club/DVHS-Jazz-Club.github.io/tree/main/public/images)**
2.  **Upload Your File**:
    - Click the **Add file** button and select **Upload files**.
    - Drag and drop your image file (e.g., `my-photo.jpg`) onto the page.
    - Click the **Commit changes** button.
3.  **Get the Public URL**: The URL for your image is predictable. For a file named `my-photo.jpg`, the URL is: `https://DVHS-Jazz-Club.github.io/images/my-photo.jpg`. **Copy this URL for the next step.**

*Note: For videos, it is highly recommended to upload them to YouTube and use the "Embed" link.*

### Step 2: Update the Website Content

This website is managed by a single file: `public/data.json`. The easiest way to update this file is through the Admin Panel.

1.  **Access the Admin Panel**: Navigate to the **[Admin Panel](https://DVHS-Jazz-Club.github.io/#/admin)**.
2.  **Enter Password**: The password is `jazzisawesome`.
3.  **Make Changes**:
    - Use the form-based **Gallery Management** tool to add, edit, or delete gallery items using the URL from Step 1.
    - For other changes (like updating officer names or performance details), you will need to edit the raw JSON in the text area at the bottom of the admin page. Be careful with syntax.
4.  **Save and Copy the New Data**:
    - After making changes, click the **"Copy Updated JSON"** button. This copies the entire website's data to your clipboard.
5.  **Commit the Changes to the Repository**:
    - Back on GitHub, navigate to the `public/data.json` file. **[Click here for a direct link.](https://github.com/DVHS-Jazz-Club/DVHS-Jazz-Club.github.io/blob/main/public/data.json)**
    - Click the **pencil icon** to edit the file.
    - Select all the text in the file and **paste** the new data you copied from the admin panel.
    - Scroll down and click the **"Commit changes"** button.

### Step 3: Deploy the Website

Making a change in the code doesn't automatically make it live. You need to run the deployment command. This is a more technical step. If you are not comfortable with the command line, ask the club President or a more technical member for help.

1. Follow the "Running Locally" instructions below to set up the project on your computer.
2. Once set up, run this single command in your terminal:
   ```sh
   npm run deploy
   ```
This will build the website and push the changes to the live server. The site will be updated within a few minutes.

---

## Technical Details

### About This Project

This project is a modern, dynamic single-page application created to showcase the club's activities, upcoming performances, and contact information. It is designed to be easily updated by club officers, even those with limited coding experience, through a user-friendly admin panel.

### Features

- **Dynamic Content**: All site content (performances, gallery, officers) is loaded from a central `data.json` file.
- **Admin Panel**: A password-protected route at `/#/admin` allows for easy management of the site's gallery.
- **User-Friendly Editing**: Add, edit, or delete gallery items through a form-based interface.
- **Simple Deployment**: Configured for one-command deployment to GitHub Pages.
- **Responsive Design**: Looks great on desktops, tablets, and mobile devices.

### Tech Stack

- **[React](https://react.dev/)**: A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A fast and modern build tool for web development.
- **[React Router](https://reactrouter.com/)**: For handling client-side routing.
- **[GitHub Pages](https://pages.github.com/)**: For hosting the live website.

### Development and Deployment

Follow these steps if you want to run the project locally or deploy a new version to the live site.

#### Running Locally

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

#### Deploying to GitHub Pages

After you've committed your changes (like updating the `data.json` file), you can deploy the site by running a single command:

```sh
npm run deploy
```
This command automatically builds the site and pushes it to the `gh-pages` branch, making your changes live within a few minutes.
