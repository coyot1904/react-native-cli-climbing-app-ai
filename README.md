# 🏔️ Summit Intelligence AI

An intelligent climbing assistant built with React Native and powered by Google Gemini AI.

Summit Intelligence helps climbers with:

- 🧗 Climbing techniques
- 🪢 Knot tutorials
- 🌦️ Mountain weather guidance
- 🏔️ Alpine expedition advice
- 🎒 Gear recommendations
- 📍 Climbing destination suggestions

The app features a modern dark-themed chat interface inspired by premium AI applications.

---

# ✨ Features

- 🤖 Gemini AI integration
- 💬 Real-time AI chat
- 🧠 Multiple AI assistant modes
- 🏔️ Climbing-focused responses
- 🖼️ AI image responses
- 🌙 Modern dark UI
- ⚡ Fast React Native performance
- 📱 iOS & Android support

---

# 📸 Screenshots

<table>
  <tr>
    <td></td>
    <td><img src="https://i.imgur.com/73UsA11.png" width="300"/></td>
    <td></td>
  </tr><tr>
  <tr>
    <td><img src="https://i.imgur.com/gTtY7oa.png" width="300"/></td>
    <td><img src="https://i.imgur.com/GwZL8lO.png" width="300"/></td>
    <td><img src="https://i.imgur.com/zpI6gEn.png" width="300"/></td>
  </tr><tr>
    <td><img src="https://i.imgur.com/Thsnn0Z.jpeg" width="300"/></td>
    <td><img src="https://i.imgur.com/53Pex88.png" width="300"/></td>
    <td><img src="https://i.imgur.com/YQBJIG7.png" width="300"/></td>
  </tr>
</table>

---

# 🚀 Getting Started

## Prerequisites

Before running the project, make sure you have completed the React Native environment setup:

- Node.js
- React Native CLI
- Android Studio
- Xcode (macOS only)
- CocoaPods

Official guide:

https://reactnative.dev/docs/environment-setup

---

# 📦 Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate into the project:

```bash
cd summit-intelligence-ai
```

Install dependencies:

```bash
npm install
```

OR

```bash
yarn install
```

---

# 🔑 Gemini API Setup

This project uses Google Gemini AI.

Create a Gemini API key from:

https://aistudio.google.com/

Then update your API key inside:

```bash
/service/index.ts
```

Example:

```ts
const ai = new GoogleGenAI({
  apiKey: 'YOUR_GEMINI_API_KEY',
});
```

---

# ▶️ Running the App

## Start Metro

```bash
npm start
```

OR

```bash
yarn start
```

---

# 🤖 Android

```bash
npm run android
```

OR

```bash
yarn android
```

---

# 🍎 iOS

Install pods:

```bash
bundle install
```

```bash
bundle exec pod install
```

Run iOS app:

```bash
npm run ios
```

OR

```bash
yarn ios
```

---

# 🛠️ Technologies

- React Native
- TypeScript
- Google Gemini AI
- react-native-gifted-chat
- React Hooks
- React Native CLI

---

# 📂 Project Structure

```bash
src/
 ├── components/
 ├── services/
 ├── screens/
 ├── assets/
 └── utils/
```

Main files:

```bash
App.tsx
service/index.ts
```

---

# 🎨 UI Highlights

- Premium dark mountain theme
- Custom AI chat bubbles
- Floating message input
- Interactive suggestion chips
- Animated typing state
- Responsive design

---

# 🔮 Future Improvements

- 🎤 Voice assistant
- 📍 Nearby climbing spots
- 🌦️ Real-time mountain weather
- 🧗 Route difficulty analysis
- 🗺️ Offline climbing maps
- 🧠 Streaming AI responses
- 📸 Camera rock recognition

---

# 🧪 Troubleshooting

If Metro cache causes issues:

```bash
npm start --reset-cache
```

For iOS pod issues:

```bash
cd ios && pod install
```

For Android clean build:

```bash
cd android && ./gradlew clean
```

---

# 📚 Learn More

- React Native  
  https://reactnative.dev

- Google Gemini AI  
  https://ai.google.dev

- React Native Gifted Chat  
  https://github.com/FaridSafi/react-native-gifted-chat

---

# 📄 License

MIT License

---

# 👨‍💻 Author

Built with React Native and Gemini AI by Keyvan.
