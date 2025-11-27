# Recipe Book

A modern, full-stack recipe management application built with React, Firebase, and Tailwind CSS. Users can create, edit, delete, and browse recipes with real-time authentication and a responsive mobile-first design.

## Features

- **User Authentication**: Email/password and Google sign-in powered by Firebase Auth
- **Recipe Management**: Create, read, update, and delete recipes (CRUD operations)
- **Real-time Sync**: Firestore real-time listeners for instant updates
- **Responsive Design**: Mobile-first UI with Tailwind CSS v4.1
- **Security**: Firebase security rules enforce user-level access control
- **Input Validation**: Client-side form validation with helpful error messages
- **Search**: Filter recipes by name or cuisine type
- **Mobile Navigation**: Bottom navigation bar for mobile devices

## Tech Stack

- **Frontend**: React 18, React Router, Tailwind CSS v4.1
- **Backend**: Firebase (Authentication, Firestore, Hosting)
- **Build Tool**: Vite
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recipe-book.git
   cd recipe-book
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Firebase config:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.jsx
│   ├── RecipeCard.jsx
│   ├── RecipeForm.jsx
│   └── SearchBar.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── AddRecipe.jsx
│   ├── EditRecipe.jsx
│   ├── RecipeDetail.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── NotFound.jsx
├── context/            # React Context for state management
│   ├── AuthContext.jsx
│   └── RecipeContext.jsx
├── services/           # Firebase service functions
│   └── recipeService.js
├── config/             # Configuration files
│   └── firebase.js
├── App.jsx
├── main.jsx
└── style.css
```

## Usage

1. **Sign Up/Login**: Create an account or sign in with Google
2. **Browse Recipes**: View all recipes from the community
3. **Add Recipe**: Click "Add Recipe" to create a new recipe
4. **Edit/Delete**: Only the creator can edit or delete their recipes
5. **Search**: Use the search bar to filter recipes by name or cuisine

## Firestore Database Structure

```
recipes/
├── {recipeId}
│   ├── name: string
│   ├── cuisine: string
│   ├── description: string
│   ├── cookTime: number
│   ├── servings: number
│   ├── ingredients: array
│   ├── instructions: array
│   ├── image: string (URL)
│   ├── createdBy: string (uid)
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
```

## Firebase Security Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /recipes/{recipeId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.createdBy;
    }
    
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Deployment

### Deploy to Firebase Hosting

1. Build the app:
   ```bash
   npm run build
   ```

2. Install Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

3. Initialize Firebase hosting:
   ```bash
   firebase init hosting
   ```

   When prompted:
   - Select your Firebase project
   - Public directory: `dist`
   - Configure as single-page app: **Yes**

4. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

Your app will be live at `https://your-project.web.app`

## Environment Variables

Create a `.env.local` file in the root directory:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Lint and format code (if configured)
```

## Key Features Explained

### Authentication
- Users can sign up with email and password
- Google OAuth integration for seamless sign-in
- Protected routes ensure only authenticated users can access the app
- Secure logout functionality

### Recipe Management
- **Create**: Add new recipes with ingredients, instructions, and images
- **Read**: View all recipes and individual recipe details
- **Update**: Edit only your own recipes
- **Delete**: Remove recipes you created
- Only the creator can edit or delete their recipes (enforced by Firestore rules)

### Responsive Design
- Desktop view: Horizontal navigation bar
- Mobile view: Fixed footer navigation bar
- Tailwind CSS breakpoints ensure optimal display on all devices
- Mobile-optimized recipe cards and forms

### Input Validation
- Recipe name: Required, max 100 characters
- Description: Max 500 characters
- Ingredients: Max 50 items
- Instructions: Max 100 steps
- Image URL: Must be valid HTTP/HTTPS URL ending in image format

## Troubleshooting

### Firebase Authentication Not Working
- Ensure Email/Password and Google providers are enabled in Firebase Console
- Check that your Firebase configuration in `src/config/firebase.js` is correct
- Verify your `.env.local` file has all required variables

### Recipes Not Loading
- Check Firestore security rules - ensure authenticated users can read recipes
- Verify user is authenticated before accessing protected routes
- Check browser console for any Firebase error messages

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf dist`
- Ensure Node.js version is 16 or higher: `node --version`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)

## Support

For questions, issues, or suggestions, please open an [GitHub Issue](https://github.com/yourusername/recipe-book/issues).

---

**Happy cooking!** 🍳