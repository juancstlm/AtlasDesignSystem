import { StyleProp, ViewStyle } from "react-native";

export interface ButtonProps {
  disabled?: boolean;
  onPress?: () => void;
  text: string;
  loading?: boolean;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  appearance?: "primary" | "secondary" | "destructive";
}
