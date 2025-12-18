# S-Social Feed

A modern social feed application built with Next.js, React, and TypeScript. This application demonstrates a clean component-based architecture with features like infinite scroll, theme switching, internationalization, and a responsive sidebar navigation.

## Quick installation:

- Clone the repository [git clone <repository-url> ]
- run `npm install`
- `npm run dev` to start the development server.
- Navigate to [http://localhost:3000]

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd s-social-feed
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

No environment variables are required for this project. The application uses public APIs (JSONPlaceholder and Picsum Photos) for demo data.

## 📊 Trade-off Analysis

### Features Prioritized

1. **Core Feed Functionality**

   - Infinite scroll feed with pagination
   - Feed cards with images, author info, timestamps, and like counts
   - Responsive layout with sidebar navigation

2. **User Experience**

   - Dark/light theme switching with system preference detection
   - Internationalization (i18n) support for English and Thai
   - Responsive design with mobile-friendly sidebar
   - Loading states with skeleton components

3. **State Management**

   - React Query for efficient data fetching and caching
   - Context API for global state (login, theme, language)
   - LocalStorage for persistent user preferences

4. **UI Components**
   - Reusable component library using Radix UI primitives
   - Consistent design system with Tailwind CSS
   - Accessible components with proper ARIA attributes

### Features Intentionally Left Out

1. **Authentication & Authorization**

   - Real backend authentication (currently uses localStorage)
   - User registration flow
   - Password reset functionality
   - Session management

2. **Content Management**

   - Post creation/editing interface
   - Comment system
   - Post deletion
   - Media upload functionality

3. **Social Features**

   - Real-time updates/notifications
   - User profiles and settings
   - Friend requests and management
   - Group creation and management (UI exists but not functional)

4. **Advanced Features**

   - Search functionality
   - Feed sorting (UI exists but not implemented)
   - Filtering and categorization
   - Analytics and insights

5. **Backend Infrastructure**
   - Real database integration
   - API endpoints
   - File storage system
   - WebSocket for real-time features

**Reasoning**: Focus was placed on creating a polished frontend experience with clean architecture, reusable components, and smooth user interactions. Backend features were deprioritized to demonstrate frontend capabilities within time constraints.

## 🔮 Future Scope (2 More Hours)

If given 2 additional hours, I would prioritize building a **User Profile Page** for logged-in users:

### 1. **Profile Page Layout**

- Create a new `/profile` route with user profile page component
- Design profile header with user avatar, name, username, and bio
- Add profile statistics section (posts count, followers, following)
- Implement responsive layout that works on mobile and desktop

### 2. **User Information Display** (Mockup data)

- Fetch and display user data from the logged-in user context
- Show user's feed posts in a dedicated section
- Display user activity timeline
- Add profile edit button (UI only, functionality can be added later)

### 3. **Profile Navigation & Integration**

- Add profile link to the sidebar navigation
- Update NavUser component to navigate to profile page on click
- Create profile route handler in Next.js App Router
- Integrate with existing LoginProvider to get current user data

### 4. **Styling & Polish**

- Apply consistent design system with existing components
- Add loading states and skeleton components for profile data
- Ensure theme switching works correctly on profile page
- Add smooth transitions and animations

## 🤖 AI Usage

AI tools were utilized in the following ways:

- AI was used as a productivity aid to accelerate development and improve code quality, while all architectural decisions and final implementations were made by the developer.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **State Management**: React Query (TanStack Query), React Context API
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Internationalization**: Custom i18n implementation
- **Theme**: next-themes

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── AppSideBar/  # Sidebar navigation
│   ├── Feed/        # Feed components
│   ├── FriendList/  # Friend list sidebar
│   └── ui/          # Reusable UI components
├── providers/       # Context providers
├── services/        # API services and data fetching
├── types/           # TypeScript type definitions
├── lib/             # Utility functions and i18n
└── hooks/           # Custom React hooks
```

## 📝 License

This project is private and proprietary.
