# Atlas Design System
A themable design system library with core components used in a React Native App.
Designed for Atlas Workout app and EzBudget budget app.

<img width=300 alt="screenshot" src="https://github.com/juancstlm/AtlasDesignSystem/blob/master/example/assets/images/iPhone-example.png?raw=true"></img>

## Installation

Atlas Design System relies on a few peer dependencies that need to be present in your project. Install everything at once with **npm**:

```bash
npm install atlas-design-system @react-native-community/datetimepicker informed moment react-native-reanimated react-native-safe-area-context react-native-vector-icons
```

—or with **Yarn**:

```bash
yarn add atlas-design-system @react-native-community/datetimepicker informed moment react-native-reanimated react-native-safe-area-context react-native-vector-icons
```

After the packages are installed, make sure to install the iOS pods:

```bash
npx pod-install ios
```

Using **Expo**? You can rely on `expo install` to ensure the correct versions:

```bash
expo install atlas-design-system @react-native-community/datetimepicker react-native-reanimated react-native-safe-area-context react-native-vector-icons
```

> **Note**
> • React Native ≥ 0.64 is required.  
> • Follow the React-Native-Reanimated [installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/) and enable the Babel plugin if you haven't already.

## Usage

```tsx
// 1. Import the ThemeContext and a theme. You can make your own or use the provided light theme ATLAS_LIGHT
import { ThemeContext, ATLAS_LIGHT } from "atlas-design-system";

export default function MyThemedApp() {
  return (
    // 2. Wrap your app with the ThemeContext.Provider and provide your theme
    <ThemeContext.Provider value={ATLAS_LIGHT}>
      <MyApp />
    </ThemeContext.Provider>
  );
}
```

```tsx
import { Text } from "atlas-design-system";
import { View } from "react-native";

// 3. Use the components
export default function MyApp() {
  return (
    <View>
      <Text category="h1">Welcome to My App</Text>
    </View>
  );
}
```

## Running the example app
The example app is provided as a way to test and develop the design system. It also serves as a gallery showcasing all the components and features.

To run the example app, execute:

```bash
cd example && yarn && yarn ios
```