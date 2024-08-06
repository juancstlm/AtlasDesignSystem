import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import Text from '../Text'
import { useThemedStyle } from "../../hooks/useThemedStyle";

export type NavigationListRowProps = {
  label: string;
  caption?: string;
};

const NavigationListRow = ({ label, caption }: NavigationListRowProps) => {
  const styles = useStyles().styles;

  return <View style={styles.container}>
    <Text>{label}</Text>
  </View>;
};

export default NavigationListRow

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {},
        }),
      []
    )
  );
