# Back Office

This project is a back office system built with React, Redux Toolkit, and Ant Design. It allows you to manage products by logging in, browsing categories, viewing product lists and details, and editing product attributes. The application is fully responsive and provides custom widgets for key functionalities.

## Core Features

- **User Authentication:**  
  Login to the back office using your email and password (it should be a valid email and any password). Users can also log out to clear their session and any state (such as the last modified product).

- **Category Navigation:**  
  View and navigate a product category tree to quickly filter products by category.

- **Product Listing:**  
  See a list of products in a selected category with configurable pagination (5, 10, 20, or 50 products per page).  
  *Sort products by various fields (e.g., id, name) in both ascending and descending order.*

- **Product Details:**  
  View detailed information about a product on a separate page. The details page displays product information including attributes.

- **Product Attribute Management:**  
  Add or modify attributes of a product. Supported attribute types include:  
  - **Number**
  - **Text**
  - **URL**
  - **Tags**
  - **Boolean**

- **Last Modified Product Widget:**  
  See the last modified product in a custom widget at the top of the page. This component is fully custom-styled (not relying on third-party design library components) to display the product image, name, price, and other attributes.

- **Logout:**  
  End your session to securely log out of the back office and clear any persistent product state.

## Demo

A live demo is available: [Back Office Demo](https://back-office-ecru.vercel.app/)

## Getting Started

### Prerequisites

- **Node.js** (>= 14.x)
- **npm** (>= 6.x)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/milanperera1993/back-office.git
   cd back-office
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

### Running the Project Locally

Start the development server with:

```sh
npm run dev
```

This command uses Vite to serve the application. Open your browser at the provided URL to view the back office.

## Project Structure

```
back-office/
├── public/                      # Static assets and the main HTML file
├── src/
│   ├── components/              # Reusable React components (e.g., Navbar, LastUpdatedProduct, LoadingSpinner)
│   ├── layouts/                 # Layout components (e.g., ProductLayout, LoginLayout)
│   ├── pages/                   # Page components (e.g., Login, Products, ProductDetails)
│   ├── provider/                # Context providers (e.g., AuthProvider)
│   ├── redux/                   # Redux Toolkit slices and API services (e.g., productSlice, productsApi)
│   ├── routes/                  # Application routing (e.g., PrivateRoute, routes)
│   ├── utils/                   # Utility functions (e.g., common functions, URL helpers)
│   ├── hooks/                   # Custom React hooks (e.g., useVh)
│   └── types/                   # TypeScript type definitions (e.g., Product, Category)
├── index.html                   # Main HTML file
├── package.json                 # Project metadata and scripts
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite configuration
```

## Available Scripts

- **`npm run dev`**: Start the development server with Vite.
- **`npm run build`**: Build the project for production.
- **`npm run preview`**: Preview the production build.
- **`npm run lint`**: Run ESLint to lint the code.

## Technologies

- **React**  
- **Redux Toolkit** & **RTK Query**  
- **Ant Design v5**  
- **Styled Components**  
- **Vite**

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Ant Design](https://ant.design/)
- [Vite](https://vitejs.dev/)