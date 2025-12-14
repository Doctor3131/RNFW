# RNFM - React Native Expo App

A modern React Native application built with Expo development build, featuring authentication, state management, and a clean UI architecture.

## 📱 About

RNFM is a mobile application built using React Native and Expo, utilizing the new architecture and modern development practices. The app includes authentication flows and is configured for both iOS and Android platforms.

## ✨ Features

- 🚀 **Expo Router** - File-based routing system
- 🔐 **Authentication** - Login, register, and welcome screens
- 🎨 **Modern UI** - Clean and responsive design
- 🔥 **Firebase Integration** - Backend services
- 💾 **State Management** - Zustand for efficient state handling
- 📦 **MMKV Storage** - Fast key-value storage
- 🎭 **Animations** - Smooth animations with Reanimated
- 🌗 **Dark Mode Support** - Automatic theme switching
- 📱 **Development Build** - Expo Dev Client for enhanced development

## 🛠️ Tech Stack

- **Framework**: React Native 0.81.5
- **Runtime**: Expo SDK 54
- **Language**: TypeScript
- **Navigation**: Expo Router 6.0 with typed routes
- **State Management**: Zustand
- **Backend**: Firebase
- **Storage**: React Native MMKV
- **Animations**: React Native Reanimated 4.1
- **UI Icons**: Expo Vector Icons

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd RNFW
```

2. Install dependencies:
```bash
npm install
```

### Running the App

#### Development Server

Start the Expo development server:
```bash
npm start
```

#### Android

Run on Android device/emulator:
```bash
npm run android
```

#### iOS

Run on iOS device/simulator (macOS only):
```bash
npm run ios
```

#### Web

Run on web browser:
```bash
npm run web
```

## 🏗️ Project Structure

```
RNFW/
├── app/                    # App screens and routes
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home screen
│   ├── login.tsx          # Login screen
│   ├── register.tsx       # Register screen
│   └── welcome.tsx        # Welcome screen
├── assets/                # Images, fonts, and other static files
├── components/            # Reusable components
├── services/              # API and external services
├── store/                 # Zustand state management
├── android/               # Android native code
├── app.json              # Expo configuration
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript configuration
```

## 📦 Building for Production

### Development Build

Create a development build:
```bash
# Android
npx expo run:android

# iOS
npx expo run:ios
```

### Production Build

For production builds using EAS Build:
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Add your Firebase configuration to the appropriate service file
3. Enable required authentication methods in Firebase Console

### Environment Variables

Create necessary environment configuration files for sensitive data like API keys and Firebase credentials.

## 🎯 Key Features Configuration

### Expo Router

The app uses file-based routing with Expo Router. Routes are automatically generated based on files in the `app/` directory.

### New Architecture

This project is configured with React Native's new architecture enabled:
```json
"newArchEnabled": true
```

### Reanimated Worklets

The app uses React Native Reanimated with worklets for smooth animations.

## 🧪 Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset project to initial state

## 📱 App Configuration

- **Bundle Identifier (iOS)**: com.sirielfahri.RNFM
- **Package Name (Android)**: com.sirielfahri.RNFM
- **App Scheme**: rnfm

## 🎨 Theming

The app supports automatic theme switching based on system preferences:
- Light mode
- Dark mode
- Adaptive UI components

## 🔒 Security

- Never commit sensitive data (API keys, secrets)
- Use environment variables for configuration
- Follow React Native security best practices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👤 Author

**Siriel Fahri**

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npm start -- --clear
   ```

2. **Android build fails**
   - Clean the Android build: `cd android && ./gradlew clean`
   - Rebuild: `npm run android`

3. **iOS build fails**
   - Clean build folder in Xcode
   - Delete `ios/Pods` and `Podfile.lock`
   - Run `pod install` in the `ios` directory

### Reset Project

If you encounter persistent issues:
```bash
npm run reset-project
```

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

## 🔄 Updates

Check for Expo SDK updates:
```bash
npx expo-doctor
```

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

Made with ❤️ using React Native and Expo