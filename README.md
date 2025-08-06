# 🧪 ZestNexus Project Manager 

A modern, full-featured project management dashboard built with React, TypeScript, and Ant Design. This application demonstrates advanced frontend development skills with drag-and-drop functionality, state management, and responsive design.


### 🔐 Demo Credentials
```
Email: admin@zestnexus.com
Password: 123456789
```

## ✨ Features

### 🎯 Core Features Implemented

- **🔐 Authentication System**
  - Mock login with hardcoded credentials
  - Protected routes with automatic redirection
  - Session management with Jotai state

- **📊 Dashboard**
  - Project statistics cards with real-time counts
  - Interactive data table with Ant Design
  - Advanced filtering and search functionality
  - Sortable columns with visual indicators
  - Pagination with customizable page sizes

- **📋 Project Management**
  - Create, edit, and view projects
  - Form validation with TypeScript
  - Modal-based forms for better UX
  - Project status tracking (Active, Completed, Delayed)

- **🎯 Kanban Board**
  - Drag-and-drop task management using dnd-kit
  - Three-column layout (To Do, In Progress, Done)
  - Task creation and deletion
  - Visual feedback during drag operations
  - Project assignment for tasks

- **🎨 Advanced UI/UX**
  - Responsive design for all screen sizes
  - Custom UI component library
  - Gradient text effects and hover animations
  - Professional Ant Design + TailwindCSS styling
  - Dark/light theme support

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - Latest version with hooks and concurrent features
- **TypeScript** - Full type safety throughout the application
- **Vite** - Lightning-fast build tool and dev server

### UI & Styling
- **Ant Design** - Professional UI component library
- **TailwindCSS** - Utility-first CSS framework
- **Custom UI Components** - Reusable component library

### State Management
- **Jotai** - Atomic state management
- **React Query** - Server state and caching

### Functionality
- **dnd-kit** - Modern drag-and-drop library
- **React Router 6** - Client-side routing
- **React Hook Form** - Form handling with validation

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Day.js** - Date manipulation

## 📁 Project Structure

```
src/
├── components/
│   ├── table/                  # Data table components
│   │   └── ProjectsTable.tsx   # Main projects table with drag-drop
│   ├── board/                  # Kanban board components
│   │   ├── TaskCard.tsx        # Draggable task cards
│   │   └── DroppableColumn.tsx # Drop zones for tasks
│   ├── ui/                     # Reusable UI component library
│   │   ├── Button.tsx          # Custom button variants
│   │   ├── Card.tsx            # Enhanced card components
│   │   ├── Input.tsx           # Input variants
│   │   ├── Table.tsx           # Table with custom styling
│   │   ├── Form.tsx            # Form components
│   │   └── index.ts            # Centralized exports
│   ├── ProjectFormModal.tsx    # Add/Edit project modal
│   └── ProtectedRoute.tsx      # Authentication guard
├── layout/
│   └── Layout.tsx              # Main app layout with sidebar
├── pages/
│   ├── auth/
│   │   └── Login.tsx           # Authentication page
│   ├── projects/
│   │   └── ProjectDetails.tsx  # Individual project view
│   ├── Dashboard.tsx           # Main dashboard with stats
│   └── KanbanBoard.tsx         # Drag-and-drop board
├── hooks/                      # Custom React hooks
│   ├── useLocalStorage.ts      # Local storage hook
│   └── useResponsive.ts        # Responsive breakpoints
├── store/                      # Jotai state management
│   └── index.ts                # Atoms and mock data
├── utils/                      # Utility functions
│   └── index.ts                # Helper functions
├── styles/
│   └── global.css              # Global styles and Tailwind
├── App.tsx                     # Main app with routing
└── main.tsx                    # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server

# Code Quality
npm run typecheck    # TypeScript validation
npm test            # Run tests
npm run format.fix  # Format code with Prettier
```

## 🎮 Usage Guide

### 1. Authentication
- Visit the application URL
- Use Email: admin@zestnexus.com 
- Use password: `123456789`
- Click "Sign In" to access the dashboard

### 2. Dashboard Navigation
- **Dashboard**: View project statistics and manage projects
- **Kanban Board**: Drag-and-drop task management
- **Project Details**: Click "View" on any project for detailed information

### 3. Project Management
- **Create Project**: Click "Add Project" button
- **Edit Project**: Click "Edit" in the actions column
- **View Project**: Click "View" to see project details
- **Filter Projects**: Use search bar and status filter
- **Sort Projects**: Click column headers to sort

### 4. Kanban Board
- **Add Task**: Click "Add Task" button
- **Drag Tasks**: Drag tasks between columns (To Do, In Progress, Done)
- **Delete Task**: Click delete icon on task cards
- **Assign Tasks**: Select project and assignee when creating tasks

### 5. Drag and Drop
- **Projects Table**: Use the drag handle (⋮⋮) to reorder projects
- **Kanban Tasks**: Drag task cards between columns to update status

## 🎨 Design Features

### Visual Enhancements
- **Gradient Text**: Beautiful gradient effects on titles
- **Hover Animations**: Scale and shadow effects on interactive elements
- **Responsive Cards**: Adaptive layout for all screen sizes
- **Professional Icons**: Ant Design icon library integration
- **Custom Themes**: Consistent color scheme throughout

### User Experience
- **Loading States**: Smooth transitions and feedback
- **Form Validation**: Real-time validation with helpful messages
- **Error Handling**: Graceful error messages and recovery
- **Accessibility**: ARIA labels and keyboard navigation
- **Mobile Responsive**: Optimized for mobile and tablet devices

## 🔧 Configuration

### Customization
- **Colors**: Update `tailwind.config.ts` for custom color schemes
- **Theme**: Modify Ant Design theme in `src/App.tsx`
- **Components**: Extend UI components in `src/components/ui/`

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Platforms
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag and drop build folder or connect Git
- **Render**: Connect repository for continuous deployment

### Recommended Deployment Settings
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "nodeVersion": "18"
}
```

## 🧪 Testing

### Manual Testing Checklist
- ✅ Authentication flow works correctly
- ✅ Dashboard displays project statistics
- ✅ Table sorting and filtering functions
- ✅ Project CRUD operations work
- ✅ Kanban drag-and-drop is smooth
- ✅ Responsive design on mobile/tablet
- ✅ Form validation prevents invalid data
- ✅ Navigation between pages is seamless

### Browser Compatibility
- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)

## 🏆 ZestNexus Evaluation Criteria

### ✅ Code Quality & Structure
- Clean, organized folder structure following suggested guidelines
- TypeScript usage throughout the application
- Reusable component architecture
- Proper separation of concerns

### ✅ React Ecosystem Understanding
- Advanced hooks usage (useState, useEffect, custom hooks)
- State management with Jotai
- Side effects handling
- Component lifecycle management

### ✅ UI/UX Polish
- Professional Ant Design integration
- Custom TailwindCSS styling
- Responsive design for all devices
- Smooth animations and transitions

### ✅ Technical Implementation
- dnd-kit drag-and-drop functionality
- Form handling with validation
- Routing with React Router
- Build optimization with Vite

### ✅ Bonus Features
- Custom UI component library
- Advanced state management
- Professional design system
- Clean Git history

## 📝 License

This project is created as part of the ZestNexus frontend developer assessment.

## 👨‍💻 Author

**Deepika Chaturvedi**
- GitHub: [@DeepikaChaturvedi11](https://github.com/DeepikaChaturvedi11)

---

## 🙏 Acknowledgments

- **ZestNexus Team** for the detailed assignment requirements
- **Ant Design** for the excellent UI component library
- **dnd-kit** for the smooth drag-and-drop functionality
- **Jotai** for the elegant state management solution

---

*Built with ❤️ for ZestNexus Frontend Developer Position*
