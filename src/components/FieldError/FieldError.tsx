import { useCallback } from "react";
import { View, StyleSheet } from "react-native";

import { useThemedStyle } from "../../hooks";
import { Text } from '../Text'

type Props = {
    error: string;
}
export const FieldError = ({ error }: Props) => {
    const styles = useStyles().styles

    return (<View style={styles.errorContainer}>
        <Text category="p2" status="error">
            {error}
        </Text>
    </View>)
}

const useStyles = () =>
    useThemedStyle(
        useCallback(
            t =>
                StyleSheet.create({
                    errorContainer: {
                        paddingLeft: t.size.baseSize * 1,
                        marginTop: t.size.baseSize * 1,
                    },
                }),
            []
        )
    );