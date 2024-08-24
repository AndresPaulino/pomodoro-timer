# Pomodoro Timer Desktop Application

A customizable Pomodoro Timer application built with Electron, React, and TypeScript. This app helps you manage your time effectively using the Pomodoro Technique, complete with productivity analytics and streak tracking.

## Features

- 🍅 Customizable Pomodoro and break durations
- 📊 Productivity analytics with daily, weekly, and monthly views
- 🔥 Streak tracking to motivate consistent usage
- 📝 Task input and categorization
- 💾 Offline functionality with local data storage
- 🖥️ Cross-platform desktop application (Windows, macOS, Linux)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/andrespaulino/pomodoro-timer.git
   cd pomodoro-timer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run electron:dev
   ```

### Building the Application

To build the application for your current platform:

```
npm run electron:build
```

The built application will be available in the `dist` folder.

## Usage

1. Start the application
2. Set your desired Pomodoro and break durations in the Settings
3. Enter a task and select a category
4. Start the Pomodoro timer
5. Work until the timer ends, then take a break
6. Repeat and watch your productivity grow!

## Technologies Used

- Electron
- React
- TypeScript
- TailwindCSS
- Recharts (for analytics visualization)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.