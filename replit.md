# RVIR - Employee Management React Native Application

## Overview
This is a React Native mobile application built with Expo for managing employee information. The app allows users to add, view, and manage employee records with proper validation.

**Project Status**: Development Ready
**Created**: October 18, 2025
**Tech Stack**: React Native, Expo, TypeScript, React Navigation

## Purpose and Goals
This project is a university assignment (RVIR – 01_vaja) designed to:
- Demonstrate React Native component creation and navigation
- Practice form validation and state management
- Implement proper testing with testIDs for automated testing
- Follow mobile app development best practices

## Current State
The application is fully functional and running in the Replit environment with:
- ✅ Employee list screen with FlatList
- ✅ Add employee form with email validation
- ✅ Employee detail view screen
- ✅ React Navigation setup
- ✅ All required testIDs implemented for CI/CD testing
- ✅ Expo web server running on port 5000

## Project Architecture

### Directory Structure
```
.
├── App.tsx                          # Main app entry point with navigation
├── index.js                         # Expo root component registration
├── src/
│   └── screens/
│       ├── HomeScreen.tsx           # Employee list with FlatList
│       ├── AddEmployeeScreen.tsx    # Form for adding employees
│       └── EmployeeDetailScreen.tsx # Employee detail view
├── assets/                          # App icons and images
├── app.json                         # Expo configuration
├── metro.config.js                  # Metro bundler configuration
├── package.json                     # Dependencies and scripts
└── tsconfig.json                    # TypeScript configuration
```

### Key Components

**App.tsx**
- Main application component
- Manages global employee state using useState
- Configures React Navigation stack navigator
- Defines TypeScript types for navigation and employee data

**HomeScreen.tsx**
- Displays employee list using FlatList component
- Floating action button (FAB) to add new employees
- Empty state messaging when no employees exist
- Implements testID: `employeesList`, `employee-<index>`, `fabAdd`

**AddEmployeeScreen.tsx**
- Form with four input fields: firstName, lastName, position, email
- Email validation with regex pattern
- Error display for invalid email addresses
- Implements testIDs: `firstNameField`, `lastNameField`, `positionField`, `emailField`, `saveEmployee`, `emailError`

**EmployeeDetailScreen.tsx**
- Shows complete employee information
- Clean card-based UI design
- Implements testIDs: `pageDetail`, `detailName`, `detailPosition`, `detailEmail`

## Recent Changes
- **October 18, 2025**: Initial project setup for Replit environment
  - Installed Node.js 20 and all required dependencies
  - Created complete React Native application structure
  - Set up Expo web configuration for port 5000
  - Configured workflow for development server
  - Implemented all three required screens with proper testIDs
  - Added email validation with user feedback

## Dependencies

### Core Dependencies
- **expo**: ~51.0.0 - React Native framework
- **react**: 18.2.0 - UI library
- **react-native**: 0.74.0 - Mobile framework
- **react-native-web**: Web support for React Native
- **react-dom**: React DOM renderer for web
- **@expo/metro-runtime**: Expo Metro bundler runtime

### Navigation
- **@react-navigation/native**: Core navigation library
- **@react-navigation/native-stack**: Native stack navigator
- **react-native-screens**: Native screen management
- **react-native-safe-area-context**: Safe area handling

### Development
- **TypeScript**: Type safety
- **jest-expo**: Testing framework
- **@testing-library/react-native**: Component testing utilities

## Running the Application

### Development Server
The app runs automatically via the configured workflow:
```bash
npm start
```
This starts the Expo web development server on port 5000.

### Testing
Run the test suite:
```bash
npm test
```

### Building for Production
Since this is a university assignment, production builds are not configured. The app runs in development mode with Expo web.

## Data Model

### Employee Type
```typescript
type Employee = {
  id: string;           // Auto-generated timestamp
  firstName: string;    // Employee's first name
  lastName: string;     // Employee's last name
  position: string;     // Job position/title
  email: string;        // Email address (validated)
}
```

### State Management
- Uses React's `useState` hook for local state
- No persistence - data resets on app restart (as per requirements)
- Employee IDs generated using `Date.now().toString()`

## Email Validation
Email addresses are validated using the regex pattern:
```
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```
This ensures:
- At least one character before @
- At least one character after @
- A domain extension with at least one character

## Testing Requirements (CI/CD)
All components include required testIDs for automated testing:
- `employeesList` - FlatList container
- `employee-<index>` - Individual employee items
- `fabAdd` - Add employee button
- `firstNameField`, `lastNameField`, `positionField`, `emailField` - Form inputs
- `saveEmployee` - Save button
- `emailError` - Email validation error message
- `pageDetail` - Detail page container
- `detailName`, `detailPosition`, `detailEmail` - Detail fields

## User Preferences
None documented yet.

## Known Issues
- Minor deprecation warnings for shadow/pointer events (non-breaking)
- Some package version mismatches with Expo 51 (app functions correctly)

## Technical Notes
- Expo web runs on port 5000 (required for Replit environment)
- TypeScript strict mode enabled
- All components use functional components with hooks
- React Native styling with StyleSheet API
- Navigation uses native stack for better performance
