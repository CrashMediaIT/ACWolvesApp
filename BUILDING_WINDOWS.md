# Building Arctic Wolves Mobile App on Windows

This guide provides complete step-by-step instructions for building and running the Arctic Wolves Mobile App on Windows.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Step 1: Install Node.js and npm](#step-1-install-nodejs-and-npm)
- [Step 2: Install Git](#step-2-install-git)
- [Step 3: Clone the Repository](#step-3-clone-the-repository)
- [Step 4: Install Dependencies](#step-4-install-dependencies)
- [Step 5: Configure Environment Variables](#step-5-configure-environment-variables)
- [Step 6: Running the App](#step-6-running-the-app)
  - [Option A: Using Expo Go (Quickest)](#option-a-using-expo-go-quickest)
  - [Option B: Android Emulator](#option-b-android-emulator)
  - [Option C: Web Browser](#option-c-web-browser)
- [Step 7: Building for Production](#step-7-building-for-production)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:
- Windows 10 or Windows 11 (64-bit)
- At least 8GB of RAM (16GB recommended)
- 10GB of free disk space
- Administrator access to install software

## Step 1: Install Node.js and npm

Node.js includes npm (Node Package Manager), which is required for managing project dependencies.

1. **Download Node.js:**
   - Visit [https://nodejs.org/](https://nodejs.org/)
   - Download the **LTS (Long Term Support)** version for Windows (18.x or higher)
   - The installer is typically named `node-vXX.X.X-x64.msi`

2. **Run the Installer:**
   - Double-click the downloaded `.msi` file
   - Click "Next" through the setup wizard
   - Accept the license agreement
   - Keep the default installation path (usually `C:\Program Files\nodejs\`)
   - Ensure "Add to PATH" is checked (enabled by default)
   - Click "Install" and complete the installation

3. **Verify Installation:**
   - Open **Command Prompt** (press `Win + R`, type `cmd`, press Enter)
   - Run the following commands:
     ```cmd
     node --version
     npm --version
     ```
   - You should see version numbers displayed (e.g., `v18.19.0` and `9.2.0`)

## Step 2: Install Git

Git is required to clone the repository.

1. **Download Git:**
   - Visit [https://git-scm.com/download/win](https://git-scm.com/download/win)
   - Download the 64-bit Git for Windows installer

2. **Run the Installer:**
   - Double-click the downloaded `.exe` file
   - Use the default options for most screens
   - When asked about "Adjusting your PATH environment", select "Git from the command line and also from 3rd-party software"
   - Complete the installation

3. **Verify Installation:**
   - Open a new Command Prompt window
   - Run:
     ```cmd
     git --version
     ```
   - You should see a version number (e.g., `git version 2.43.0.windows.1`)

## Step 3: Clone the Repository

1. **Create a Development Folder:**
   - Open Command Prompt
   - Create and navigate to a folder for your projects:
     ```cmd
     mkdir C:\dev
     cd C:\dev
     ```

2. **Clone the Repository:**
   ```cmd
   git clone https://github.com/CrashMediaIT/ACWolvesApp.git
   cd ACWolvesApp
   ```

## Step 4: Install Dependencies

Install all required npm packages:

```cmd
npm install
```

This will:
- Download and install all dependencies listed in `package.json`
- Create a `node_modules` folder with all required packages
- Take a few minutes to complete

## Step 5: Configure Environment Variables

The app needs to know where your backend API is located.

### Option A: Using Command Line (Temporary)

Set the environment variable for the current session:

```cmd
set EXPO_PUBLIC_API_URL=https://your-arctic-wolves-api.example.com
```

**Note:** Replace `https://your-arctic-wolves-api.example.com` with your actual API URL.

### Option B: Using .env File (Recommended)

1. Create a `.env` file in the project root:
   ```cmd
   echo EXPO_PUBLIC_API_URL=https://your-arctic-wolves-api.example.com > .env
   ```

2. Edit the file with Notepad to ensure the URL is correct:
   ```cmd
   notepad .env
   ```

### Option C: Using Windows Environment Variables (Permanent)

1. Press `Win + R`, type `sysdm.cpl`, press Enter
2. Click the "Advanced" tab
3. Click "Environment Variables"
4. Under "User variables", click "New"
5. Set:
   - **Variable name:** `EXPO_PUBLIC_API_URL`
   - **Variable value:** `https://your-arctic-wolves-api.example.com`
6. Click OK to save
7. **Important:** Restart Command Prompt for changes to take effect

## Step 6: Running the App

You have several options for running the app during development:

### Option A: Using Expo Go (Quickest)

This is the fastest way to test the app on your physical Android or iOS device.

1. **Install Expo Go on your phone:**
   - **Android:** [Google Play Store - Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - **iOS:** [App Store - Expo Go](https://apps.apple.com/app/expo-go/id982107779)

2. **Start the development server:**
   ```cmd
   npm start
   ```
   Or:
   ```cmd
   npx expo start
   ```

3. **Connect your device:**
   - Ensure your phone and computer are on the same Wi-Fi network
   - A QR code will appear in the terminal and browser
   - **Android:** Open Expo Go app, tap "Scan QR code", and scan the QR code
   - **iOS:** Open Camera app, point at QR code, tap the notification that appears

### Option B: Android Emulator

To run on an Android emulator, you need to install Android Studio.

#### Installing Android Studio

1. **Download Android Studio:**
   - Visit [https://developer.android.com/studio](https://developer.android.com/studio)
   - Download Android Studio for Windows

2. **Run the Installer:**
   - Double-click the downloaded `.exe` file
   - Follow the setup wizard
   - Choose "Standard" installation type
   - Allow Android Studio to download required SDK components

3. **Configure Android SDK:**
   - Open Android Studio
   - Click "More Actions" → "SDK Manager"
   - In the "SDK Platforms" tab, ensure **Android 13.0 (Tiramisu)** or higher is checked
   - In the "SDK Tools" tab, ensure these are checked:
     - Android SDK Build-Tools
     - Android SDK Platform-Tools
     - Android Emulator
     - Intel x86 Emulator Accelerator (HAXM installer) - if using Intel CPU
   - Click "Apply" to install selected components

4. **Set Environment Variables:**
   - Add Android SDK to your PATH:
     - Press `Win + R`, type `sysdm.cpl`, press Enter
     - Click "Advanced" → "Environment Variables"
     - Under "User variables", click "New":
       - **Variable name:** `ANDROID_HOME`
       - **Variable value:** `C:\Users\YourUsername\AppData\Local\Android\Sdk`
         (Replace `YourUsername` with your Windows username)
     - Find "Path" in "User variables", click "Edit", then "New", add:
       - `%ANDROID_HOME%\platform-tools`
       - `%ANDROID_HOME%\emulator`
   - Click OK to save all changes
   - **Restart Command Prompt** for changes to take effect

5. **Create a Virtual Device:**
   - In Android Studio, click "More Actions" → "Virtual Device Manager"
   - Click "Create Device"
   - Select a phone model (e.g., "Pixel 5")
   - Click "Next"
   - Download and select a system image (e.g., "Tiramisu" - API 33)
   - Click "Next", then "Finish"

6. **Verify ADB Installation:**
   - Open a new Command Prompt
   - Run:
     ```cmd
     adb version
     ```
   - You should see version information

#### Running on Android Emulator

1. **Start the emulator:**
   - Open Android Studio
   - Click "Virtual Device Manager"
   - Click the "Play" button next to your virtual device

2. **Run the app:**
   ```cmd
   npm run android
   ```
   Or:
   ```cmd
   npx expo start --android
   ```

3. The app will be built and installed on the emulator automatically.

### Option C: Web Browser

For quick testing, you can run a web version of the app:

```cmd
npm run web
```

Or:

```cmd
npx expo start --web
```

This will open the app in your default web browser at `http://localhost:19006`.

**Note:** Some React Native features may not work perfectly in the web version.

## Step 7: Building for Production

### Building for Android (APK/AAB)

Expo provides two ways to build production apps:

#### Option 1: EAS Build (Recommended)

1. **Install EAS CLI:**
   ```cmd
   npm install -g eas-cli
   ```

2. **Log in to Expo:**
   ```cmd
   eas login
   ```

3. **Configure EAS:**
   ```cmd
   eas build:configure
   ```

4. **Build APK:**
   ```cmd
   eas build --platform android --profile preview
   ```

5. **Build AAB (for Google Play Store):**
   ```cmd
   eas build --platform android --profile production
   ```

For more details, see [Expo EAS Build Documentation](https://docs.expo.dev/build/introduction/).

#### Option 2: Local Build

For local builds, you'll need to eject from Expo and use standard React Native build tools:

```cmd
npx expo prebuild
```

Then follow standard Android build procedures with Android Studio.

### Building for iOS

**Note:** Building iOS apps requires a Mac with Xcode. You cannot build iOS apps directly on Windows.

However, you can use:
- **EAS Build cloud service** (as shown above) which can build iOS apps from Windows
- A Mac computer or Mac virtual machine
- A Mac cloud service

## Troubleshooting

### Common Issues and Solutions

#### Issue: "npm is not recognized as an internal or external command"

**Solution:** 
- Node.js was not added to PATH during installation
- Reinstall Node.js and ensure "Add to PATH" is checked
- Restart Command Prompt after reinstalling

#### Issue: "expo is not recognized as an internal or external command"

**Solution:**
- Expo CLI is not installed globally. Run:
  ```cmd
  npm install -g expo-cli
  ```
- Or use `npx expo` instead of `expo`

#### Issue: "adb is not recognized as an internal or external command"

**Solution:**
- Android SDK Platform-Tools not in PATH
- Follow Step 6B to add `%ANDROID_HOME%\platform-tools` to your PATH
- Restart Command Prompt

#### Issue: Metro bundler shows "Unable to resolve module"

**Solution:**
- Clear npm cache and reinstall:
  ```cmd
  npm cache clean --force
  rmdir /s /q node_modules
  del package-lock.json
  npm install
  ```

#### Issue: "Network response timed out" when using Expo Go

**Solution:**
- Ensure your phone and computer are on the same Wi-Fi network
- Disable Windows Firewall temporarily to test:
  - Press `Win + R`, type `firewall.cpl`, press Enter
  - Click "Turn Windows Defender Firewall on or off"
  - Select "Turn off" for Private networks (temporarily)
- Try using tunnel mode:
  ```cmd
  npx expo start --tunnel
  ```

#### Issue: Android emulator is very slow

**Solution:**
- Enable hardware acceleration (Intel HAXM or AMD Hypervisor)
- Allocate more RAM to the emulator (in AVD settings)
- Use a lower resolution device
- Close other applications to free up system resources

#### Issue: "Execution failed for task ':app:validateSigningDebug'"

**Solution:**
- Clear Android build cache:
  ```cmd
  cd android
  gradlew clean
  cd ..
  ```
- Delete `.gradle` folder in the project directory
- Rebuild the app

#### Issue: Windows Defender or Antivirus blocking installations

**Solution:**
- Temporarily disable antivirus software during installation
- Add exceptions for:
  - Node.js installation directory
  - Project directory
  - Android SDK directory

### Getting More Help

- **Expo Documentation:** [https://docs.expo.dev/](https://docs.expo.dev/)
- **React Native Documentation:** [https://reactnative.dev/](https://reactnative.dev/)
- **Android Developer Documentation:** [https://developer.android.com/](https://developer.android.com/)
- **Project Issues:** [https://github.com/CrashMediaIT/ACWolvesApp/issues](https://github.com/CrashMediaIT/ACWolvesApp/issues)

### Additional Resources

- [Expo Getting Started Guide](https://docs.expo.dev/get-started/introduction/)
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- [Android Studio User Guide](https://developer.android.com/studio/intro)
- [Git for Windows Documentation](https://git-scm.com/doc)

---

**Need help?** If you encounter any issues not covered here, please [open an issue](https://github.com/CrashMediaIT/ACWolvesApp/issues) on GitHub with:
- Your Windows version
- Node.js and npm versions (`node --version`, `npm --version`)
- Complete error message
- Steps to reproduce the problem
