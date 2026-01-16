# 🧪 Rick and Morty App

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/vitest-%2344a833.svg?style=for-the-badge&logo=vitest&logoColor=white)

A modern, responsive web application exploring the [Rick and Morty API](https://rickandmortyapi.com/). Built with React, Vite, and TailwindCSS v4, featuring a clean architecture and comprehensive testing.

> **🚀 Live Demo:** [https://userlg.github.io/Rick-and-Morty---App](https://userlg.github.io/Rick-and-Morty---App)

## ✨ Features

- **Character Search**: Real-time filtering and search functionality.
- **Detailed Views**: Comprehensive character profiles with origin and location data.
- **Multiverse Explorer**: Browse Episodes and Locations with pagination.
- **Responsive Design**: Mobile-first layout with smooth 60fps animations.
- **Dark Mode**: Sleek dark theme with glassmorphism elements.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn or NPM

### 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/userlg/Rick-and-Morty---App

# Navigate to the project directory
cd rick-and-morty-app

# Install dependencies
yarn install
```

### 🏃‍♂️ Running the App

```bash
# Start the development server
yarn dev
```

### 🐳 Docker

You can also run the application in a Docker container.

```bash
# Build and start the container
docker-compose up --build

# The application will be available at http://localhost:3000
```

### 🧪 Running Tests

```bash
# Run unit and integration tests
yarn test

# Generate coverage report (Currently >93% coverage)
yarn coverage
```

## 🏗️ Architecture & Design Pattern

### Component-Based Architecture

The application follows a modular **Component-Based Architecture**, ensuring reusability and separation of concerns.

- **`src/components/`**: Reusable UI elements (`CharacterCard`, `SearchBar`, `Loader`).
- **`src/pages/`**: View components representing routes (`Home`, `Characters`, `Episodes`).
- **`src/layouts/`**: Structure wrappers (`Layout`, `Navbar`, `Container`).

### Service Layer Pattern

API logic is decoupled from UI components using a **Service Layer**.

- **`src/services/api.js`**: Handles all Axios HTTP requests and error interceptors.

### Custom Hooks

Business logic and data fetching are encapsulated in **Custom Hooks**.

- **`useCharacters`**, **`useEpisodes`**, **`useLocations`**: Manage data state, loading, and errors.
- **`useTitle`**: Manages document head metadata for SEO.

## 👤 Author

**userlg**

- GitHub: [@userlg](https://github.com/userlg)

---

Made with 💚 and Portal Fluid.
