# Release Pipeline Setup

This guide explains how to set up automatic Android app releases using GitHub Actions with standard Android build process.

## Prerequisites

1. **React Native Project**: Your project should be properly configured for Android builds
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Android Configuration**: Ensure your Android build is properly configured

## Setup Steps

### 1. Node.js Version

Create a `.nvmrc` file in your project root:

```bash
echo "18" > .nvmrc
```

### 2. Android Build Configuration

Ensure your Android build is properly configured:

1. **Check `android/` directory exists** with proper Gradle configuration
2. **Verify `android/gradlew`** is executable
3. **Ensure `android/app/build.gradle`** has proper signing configuration

### 3. Package Manager

The pipeline uses **Bun** as the package manager. Ensure your project works with Bun:

```bash
# Install Bun if not already installed
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install
```

### 4. Build Configuration

Make sure your `android/app/build.gradle` has the release configuration:

```gradle
android {
    // ... other config

    signingConfigs {
        release {
            // Your signing configuration
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

## How It Works

### Automatic Release Process

1. **Push to Main**: When you push code to the `main` branch
2. **Version Bump**: The version number is automatically incremented
3. **Build APK**: Standard Android `assembleRelease` command builds the APK
4. **Create Release**: A GitHub release is created with:
   - Tagged version (e.g., v1.0.1)
   - Release notes
   - APK download link

### Workflow Files

- `.github/workflows/version-bump.yml`: Automatically bumps version
- `.github/workflows/release-android.yml`: Builds and releases the APK

### Build Process

The pipeline uses the standard Android build process:

1. **Setup Environment**:

   - Node.js (version from `.nvmrc`)
   - Bun package manager
   - Java 17 (Zulu distribution)
   - Android SDK

2. **Install Dependencies**:

   - Uses `bun install` for package installation
   - Caches Gradle packages for faster builds

3. **Build APK**:

   - Runs `./gradlew assembleRelease` in the `android/` directory
   - Generates signed APK at `android/app/build/outputs/apk/release/app-release.apk`

4. **Create Release**:
   - Uploads APK as GitHub release asset
   - Creates tagged release with version number

### Release Features

- **Automatic Versioning**: Patch version increments automatically
- **APK Download**: Direct download link in GitHub releases
- **Release Notes**: Pre-filled with app features and installation instructions
- **Tagged Releases**: Each release is properly tagged with version number
- **Build Artifacts**: APK is also uploaded as a build artifact

## Manual Release

You can also trigger a release manually:

1. Go to **Actions** tab in your GitHub repository
2. Select **Release Android App** workflow
3. Click **Run workflow**
4. Select the branch and click **Run workflow**

## Installation Instructions

Users can install the APK by:

1. Downloading the APK from the GitHub release
2. Enabling "Install from Unknown Sources" in Android settings
3. Opening the downloaded APK file
4. Following the installation prompts

## Troubleshooting

### Common Issues

1. **Build Fails**: Check Android build logs in GitHub Actions
2. **Gradle Issues**: Verify `android/gradlew` is executable
3. **Signing Issues**: Ensure proper signing configuration in `build.gradle`
4. **Version Conflicts**: Ensure app.json version is properly formatted

### Debugging

- Check GitHub Actions logs for detailed error messages
- Verify Android build configuration
- Ensure all dependencies are properly installed with Bun
- Check that `.nvmrc` file exists and contains valid Node.js version

### Build Optimization

- Gradle packages are cached for faster subsequent builds
- Uses Bun for faster package installation
- Parallel execution where possible

## Security Notes

- Ensure your signing keys are properly configured
- Never commit sensitive signing information to repository
- Use GitHub secrets for any sensitive build configuration

## Support

For issues with:

- **Android Build**: Check [React Native Android documentation](https://reactnative.dev/docs/environment-setup)
- **GitHub Actions**: Check [GitHub Actions documentation](https://docs.github.com/en/actions)
- **Bun**: Check [Bun documentation](https://bun.sh/docs)
- **App-specific issues**: Check the build logs and error messages
