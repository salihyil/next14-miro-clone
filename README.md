# Miro Clone - Real-time Collaborative Whiteboard

A feature-rich collaborative whiteboard application built with Next.js 14, inspired by Miro. This project demonstrates advanced real-time collaboration features and modern web development practices.

## 🌟 Key Features

### Whiteboard Functionality

- 🎨 Full-featured canvas with real-time drawing capabilities
- 🛠️ Multiple tools including Text, Shapes, Sticky Notes & Pencil
- 🔄 Layer management system
- 🎯 Advanced selection and transformation tools
- 🎨 Comprehensive color system
- ↩️ Undo/Redo functionality
- ⌨️ Keyboard shortcuts

### Real-time Collaboration

- 👥 Multi-user real-time editing
- 🔄 Live cursor tracking
- 💬 Real-time updates across all connected users
- 🤝 Shared workspace for team collaboration

### Authentication & Organization

- 🔐 Secure authentication system
- 👥 Organization-based access control
- ✉️ Team invitations and management
- ⭐ Board favoriting system

### Technical Features

- 📱 Responsive design
- 💾 Real-time database integration
- 🎯 Optimized performance
- 🛡️ Type-safe development with TypeScript

## 🔧 Built With

- **Frontend Framework**: Next.js 14
- **Styling**: TailwindCSS & ShadcnUI
- **Real-time Engine**: Liveblocks
- **Authentication**: Clerk
- **Database**: Convex
- **Type Safety**: TypeScript

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
LIVEBLOCKS_SECRET_KEY=
```

4. Run the development server:

```bash
npm run dev
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Miro's collaborative whiteboard
- Built with modern web technologies
- Designed for real-time collaboration
