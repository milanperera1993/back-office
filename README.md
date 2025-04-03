# Back Office

This project is a back office system built with React, Redux Toolkit, and Ant Design. It allows you to manage products by logging in, browsing categories, viewing product lists and details, and editing product attributes. The application is fully responsive and provides custom widgets for key functionalities.

## Core Features

- **User Authentication:**  
  Login to the back office using your email and password (the login functionality is purely mocked, however the form is validated). Users can also log out to clear their session and any state (such as the last modified product).

- **Category Navigation:**  
  View and navigate a product category tree displayed in a drawer. It can ideally cater to nested sub-categories.

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

## Assumptions and Decisions

1. **Login Functionality:**  
   The login functionality is purely mocked. Although the form validates input, no real backend is used for authentication.

2. **Category Tree:**  
   The category tree is implemented in a drawer which can ideally cater to nested sub-categories.

3. **Configuration:**  
   Even though URLs and similar configuration values should be externalized into environment variables, they are included inline for simplicity.

4. **Design:**  
   The design was based on the existing platform's branding, color palette, and overall aesthetic.

5. **Data Generation:**  
   Products and categories are generated using a custom script with duplicated images and generic product names.

6. **Mock Data:**  
   The mock data is served by a JSON server hosted on Render.

## Improvements

1. **Nested Category Data:**  
   Incorporate more nested category data to make the use case more generic and robust.

2. **Loading States:**  
   Enhance the loading states with custom skeletons instead of simple spinners for better user experience.

3. **State Management:**  
   Expand state management by creating more Redux slices and accessing data using the Redux store directly, rather than solely relying on RTK Query.

4. **Design Enhancements:**  
   Improve the overall design with better imagery, typography, and UI refinements.

5. **Dynamic Form Enhancements:**  
   The current dynamic form for adding additional product attributes only supports string and number types. Ideally, users should be able to select the attribute type explicitly (e.g., text, number, boolean, URL, tags) and add validations accordingly.

6. **Responsive Issues on  Low Resolution Laptops:**  
   Some responsive issues have been noticed. These issues were not fully explored due to time constraints and should be revisited for enhanced compatibility.

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

## Running Tests

This project uses Jest along with React Testing Library for unit tests. Tests are organized alongside their respective components inside __test__ directories (e.g., `src/components/product/__test__/` and `src/components/table/__test__/`).

To run all tests, use:

```sh
npm run test
```

You can also run tests in watch mode during development:

```sh
npm run test:watch
```

For more details on the test configuration, check the [jest.config.js](jest.config.js) file.

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