# Dougherty Valley High School Jazz Club Website

This repository contains the official website for the Dougherty Valley High School Jazz Club.

**Live Site:** [https://DVHS-Jazz-Club.github.io](https://DVHS-Jazz-Club.github.io)

---

## How to Update The Website

This guide is for club officers. All website content—including performances, images, and officer names—is managed through a user-friendly admin panel.

### The 3-Step Process

1.  **Make changes in the Admin Panel.**
2.  **Copy the generated data.**
3.  **Paste it into the `data.json` file on GitHub.**

That's it! Changes committed to the `main` branch are automatically deployed.

### Step 1: Log In to the Admin Panel

1.  **Access the Admin Panel**: Navigate to the **[Admin Panel](https://DVHS-Jazz-Club.github.io/#/admin)**.
2.  **Enter Password**: Ask a fellow officer for the admin password.

### Step 2: Manage Website Content

The admin panel is organized into sections that match the website's content.

#### Managing Performances
- **Upcoming & Past Performances**: Add, edit, or delete performances in their respective sections.
- **Editing**: Click "Edit" to open a form where you can change details like the date, time, location, and description. You can also assign images to a performance from the Image Library.

#### Managing Images
- **The Image Library**: This is the central hub for all website images. Forget manually uploading to GitHub—do it all from here.
- **Uploading**: Click **"Upload New Image"**. This uses a third-party service (`imgbb.com`) to host the image, so you don't need to worry about repository space.
- **Naming**: Images are identified by name. You can rename them at any time for clarity.
- **Assigning Images**: In the "Page Content Assignment" section, simply click on an image's name to assign it to the "About Us" page or the "Homepage Hero Slideshow".

### Step 3: Save and Commit Your Changes

This is the most important step. Your changes are not live until you save them to the repository.

1.  **Copy the New Data**:
    - At the bottom of the admin panel, you'll find a section called **"Save Your Changes"**.
    - Click the large **"Copy Updated JSON"** button. This copies all of your new content to the clipboard.
2.  **Update `data.json` on GitHub**:
    - Open the `public/data.json` file in the repository. **[Click here for a direct link.](https://github.com/DVHS-Jazz-Club/DVHS-Jazz-Club.github.io/blob/main/public/data.json)**
    - Click the **pencil icon** (Edit this file) in the top right.
    - Select all the existing text in the file (`Ctrl+A` or `Cmd+A`) and **delete it**.
    - **Paste** (`Ctrl+V` or `Cmd+V`) the new data you copied from the admin panel.
3.  **Commit the Changes**:
    - Scroll to the bottom of the page.
    - Add a brief, descriptive commit message (e.g., "Update upcoming concert details").
    - Click the green **"Commit changes"** button.

Your changes will be live on the website within a few minutes.

---

## Technical Details

### About This Project

This project is a modern, dynamic single-page application created with React and Vite. It is designed to be easily updated by non-technical club officers through a comprehensive, user-friendly admin panel.

### Key Data Structures (`data.json`)

- `performances`: An object containing two arrays: `upcoming` and `past`.
- `imagePool`: An array of image objects, each with a `url` and a `name`. This is the central library for all site images.
- `heroImages`: An array of image URLs to be displayed in the homepage slideshow.
- `aboutImage`: A single image URL for the "About Us" section.
- `officers`: An object mapping officer titles to names.

### Tech Stack

- **[React](https://react.dev/)**: A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A fast and modern build tool for web development.
- **[React Router](https://reactrouter.com/)**: For handling client-side routing (`HashRouter` is used for GitHub Pages compatibility).
- **[GitHub Pages](https://pages.github.com/)**: For hosting the live website.
- **[GitHub Actions](https://github.com/features/actions)**: For continuous deployment.

### Development

Follow these steps if you want to run the project locally.

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
3.  **Create Environment File**:
    - Create a file named `.env` in the root of the project.
    - Add the following line, which is required for the image upload functionality:
    ```
    VITE_IMGBB_API_KEY=your_api_key_here
    ```
    *(Note: The key is safe to expose as it is a free, public key with no associated account data.)*
4.  **Start the development server**:
    ```sh
    npm run dev
    ```
    This will open the site on [http://localhost:5173](http://localhost:5173). The server will automatically reload when you save changes.
