# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

This command will start a local development server. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages.

1.  **Update `package.json`**: Open the `package.json` file and replace `"your-username"` in the `homepage` field with your actual GitHub username.

2.  **Deploy**: Run the following command in your terminal:
    ```sh
    npm run deploy
    ```
    This command will build your site and push the contents of the `dist` folder to a new `gh-pages` branch on your GitHub repository.

3.  **Configure GitHub Repository**: Go to your repository's settings on GitHub and navigate to the "Pages" section. Set the source to the `gh-pages` branch. Your site should be live at the URL specified in your `homepage` field within a few minutes.
