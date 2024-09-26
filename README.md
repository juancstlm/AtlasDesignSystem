# Atlas Design System
A themable design system library with core components used in a React Native App.
Designed for Atlas Workout app and EzBudget budget app.


## Features


Ensure your app has the `peerDependencies` installed

```javascript
//...
//1.  Import the ThemeContext and a theme. You can make your own or use the provided light theme ATLAS_LIGHT
import { ThemeContext, ATLAS_LIGHT } from "atlas-design-system";

export default function MyThemedApp(){

    return (
        // 2. Wrap your app with the ThemeContext.Provider and provide your theme
        <ThemeContext.Provider value={ATLAS_LIGHT}>
            <MyApp>
        </ThemeContext.Provider>
    );
}
```

```javascript
import { Text } from "atlas-design-system";
import { View } from "react-native";

// 3. Use the components
export default function MyApp() {
    return (
        <View>
            <Text category="h1" >Welcome to My App</Text>
        </View>
    )
}
```

# Running exmple app 
The example app is provided as a way to test and develop on the design system. It is also used as a gallery to view all the components and features of the desgin system.

To run the example app run the following command
```bash
cd /example && yarn && yarn ios
```

