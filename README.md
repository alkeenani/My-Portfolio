
# Alkenani Portfolio

A modern, high-performance, and interactive portfolio website built with React, TypeScript, and Firebase. This project showcases a professional developer portfolio with dynamic content management, multi-language support (English/Arabic), and a sleek, dark-themed design.

## 🚀 Features

-   **Dynamic Project Management**: Add, edit, and delete projects directly from a secure Admin Dashboard.
-   **Multi-Language Support**: Full localization for English and Arabic (RTL support).
-   **Dark/Light Mode**: User-toggleable themes with persistent preference storage.
-   **Responsive Design**: Fully responsive layout optimized for all devices (Mobile, Tablet, Desktop).
-   **Interactive UI**: Smooth animations, hover effects, and a custom cursor for an enhanced user experience.
-   **Technology Showcase**: Display technologies used for each project with visual badges.
-   **Secure Authentication**: Admin login protected by Firebase Authentication.

## 🛠️ Technologies Used

### Frontend Core
-   **[React 19](https://react.dev/)**: The library for building the user interface.
-   **[TypeScript](https://www.typescriptlang.org/)**: For type-safe code and better developer experience.
-   **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for fast builds and development.

### State Management & Routing
-   **React Hooks**: `useState`, `useEffect`, `useContext` for local state and side effects.
-   **[React Router DOM](https://reactrouter.com/)**: For client-side routing and navigation.
-   **Context API**: For global state management (Theme, Language, Authentication).

### Backend & Services
-   **[Firebase](https://firebase.google.com/)**:
    -   **Firestore**: NoSQL cloud database for storing project data.
    -   **Authentication**: Secure email/password authentication for the admin area.

### Styling & Graphics
-   **CSS3**: Custom CSS with CSS Variables for theming and responsive design.
-   **[Three.js](https://threejs.org/)**: For 3D graphics and immersive background effects.

### Development Tools
-   **ESLint**: For code linting and quality assurance.
-   **npm**: Dependency management.

## 📂 Project Structure

```bash
src/
├── components/       # Reusable UI components
│   ├── About/        # About section
│   ├── Background/   # 3D/Interactive background
│   ├── Contact/      # Contact form and info
│   ├── Dashboard/    # Admin dashboard components
│   ├── Hero/         # Hero section components
│   ├── Navbar/       # Navigation bar
│   ├── ProjectCard/  # Individual project display card
│   ├── Projects/     # Projects grid section
│   ├── Skills/       # Skills showcase components
│   └── TopScroll/    # Scroll-to-top button
├── context/          # React Context providers (Auth, Theme, Language)
├── hooks/            # Custom React hooks
├── lib/              # Library configurations (Firebase)
├── pages/            # Main page views (Home, Login, Dashboard)
├── styles/           # Global styles and component-specific CSS
└── App.tsx           # Main application entry point
```

## 🔧 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/alkenani-portfolio.git
    cd alkenani-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Firebase:**
    -   Create a project in the [Firebase Console](https://console.firebase.google.com/).
    -   Enable **Firestore Database** and **Authentication** (Email/Password).
    -   Create a `.env` file in the root directory and add your Firebase configuration:
        ```env
        VITE_FIREBASE_API_KEY=your_api_key
        VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
        VITE_FIREBASE_PROJECT_ID=your_project_id
        VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
        VITE_FIREBASE_APP_ID=your_app_id
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Build for production:**
    ```bash
    npm run build
    ```

## 🛡️ Admin Dashboard Access

The dashboard is protected. To access it:
1.  Navigate to `/login`.
2.  Sign in with your configured Firebase credentials.
3.  Once authenticated, you will be redirected to `/dashboard` where you can manage your projects.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License.
