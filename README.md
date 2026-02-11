# Arctic Wolves Mobile App

Cross-platform mobile application (Android & iOS) for the [Arctic Wolves](https://github.com/CrashMediaIT/Arctic_Wolves) hockey coaching management system. Built with **React Native** and **Expo**.

## Features

- **Role-based access control** – dashboard and navigation adapt to the authenticated user's role(s): Admin, Coach, Health Coach, Team Coach, Athlete, Parent, and Front Desk Staff.
- **Authentication** – email/password login with two-factor authentication (2FA) support and secure token storage.
- **Sessions** – browse, book, and manage training sessions.
- **Athletes** – view athlete profiles, team rosters, and progress.
- **Drills & Practice Plans** – create, browse, and share drills and practice plans.
- **Evaluations & Goals** – track player evaluations, skills, and goals.
- **Health** – nutrition tracking and workout management.
- **Finance & POS** – financial overview and point-of-sale terminal.
- **HR** – payroll, contracts, and time tracking.
- **Reports** – generate and view analytics reports.
- **Messages & Notifications** – in-app messaging and notification center.
- **Video** – video review and drill recordings.
- **Shop** – browse and purchase merchandise.
- **Admin Panel** – user management, audit logs, permissions, settings, and system health monitoring.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npx expo`)
- For iOS development: macOS with Xcode
- For Android development: Android Studio with an emulator or physical device

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Devices

```bash
# Android
npm run android

# iOS (macOS only)
npm run ios

# Web (for quick testing)
npm run web
```

### Environment Configuration

Set the backend API URL via the `EXPO_PUBLIC_API_URL` environment variable:

```bash
EXPO_PUBLIC_API_URL=https://your-arctic-wolves-api.example.com npx expo start
```

## Project Structure

```
├── App.tsx                      # Application entry point
├── src/
│   ├── api/                     # HTTP client and API service layer
│   │   ├── client.ts            # Generic fetch wrapper with auth headers
│   │   ├── auth.ts              # Authentication endpoints
│   │   └── services.ts          # Feature-specific API calls
│   ├── contexts/
│   │   └── AuthContext.tsx       # Authentication state provider
│   ├── navigation/
│   │   ├── RootNavigator.tsx     # Auth/main flow routing
│   │   └── MainTabs.tsx          # Bottom tab + stack navigators
│   ├── screens/                  # All application screens
│   │   ├── auth/                 # Login, 2FA verification
│   │   ├── dashboard/            # Home, schedule
│   │   ├── sessions/             # Session list, detail
│   │   ├── athletes/             # Athletes, team roster
│   │   ├── drills/               # Drills, practice plans
│   │   ├── evaluations/          # Evaluations, goals
│   │   ├── health/               # Health, nutrition, workouts
│   │   ├── finance/              # Finance overview, POS
│   │   ├── hr/                   # HR management
│   │   ├── reports/              # Reports and analytics
│   │   ├── messages/             # Messages, notifications
│   │   ├── video/                # Video review
│   │   ├── shop/                 # Merchandise shop
│   │   ├── admin/                # Admin panel
│   │   └── profile/              # User profile
│   ├── types/                    # TypeScript type definitions
│   └── utils/
│       └── roles.ts              # Role-based access helpers
├── assets/                       # App icons, splash screen
├── app.json                      # Expo configuration
└── tsconfig.json                 # TypeScript configuration
```

## User Roles

| Role | Dashboard Access |
|------|-----------------|
| **Admin** | Full access to all sections |
| **Coach** | Sessions, athletes, drills, practice plans, evaluations, goals, video, reports, messages, stats, team roster |
| **Health Coach** | Same as coach plus health, nutrition, and workouts management |
| **Team Coach** | Sessions, athletes, evaluations, goals, video, messages, stats, team roster |
| **Athlete** | Sessions, evaluations, goals, health, video, messages, shop, stats |
| **Parent** | Sessions, messages, shop, camp check-in |
| **Front Desk Staff** | Sessions, POS, messages, camp check-in |

## Tech Stack

- **React Native** 0.81 with **Expo** SDK 54
- **TypeScript** for type safety
- **React Navigation** 7 for routing
- **Expo Secure Store** for secure token storage
- **AsyncStorage** for general persistence
