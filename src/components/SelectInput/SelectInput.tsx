import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import Text from '../Text';
import Sheet from '../Sheet';
import MenuItemDescription from '../MenuItemDescription';
import { useThemedStyle } from '../../hooks';
import { Option } from './types'

type Props<T> = {
  caption?: string;
  label: string;
  options: Option<T>[];
  onChange: (newValue: Option<T>) => void;
};

export const SelectInput = <T extends any>({ caption, label, options = [], onChange }: Props<T>) => {
  // Rest of the component stays the same.
  const { styles, theme } = useStyles();

  const values = useMemo(() => {
    return options.filter(v => v.selected);
  }, options);

  const [sheetOpen, setSheetOpen] = useState(false);

  const animatedValue = useSharedValue(values.length ? 1 : 0);
  const rotation = useSharedValue(sheetOpen ? 1 : 0);

  useEffect(() => {
    rotation.value = withTiming(sheetOpen ? 1 : 0, {
      duration: 200,
      easing: Easing.bezier(0.5, 0, 0, 0.75),
    });
  }, [sheetOpen]);

  useEffect(() => {
    animatedValue.value = values.length ? 1 : 0
  }, [values.length])

  const animatedLabelStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: interpolate(animatedValue.value, [0, 1], [1, -8]) }],
      fontSize: interpolate(animatedValue.value, [0, 1], [14, 10]),
    };
  }, []);

  const animatedContainerStyles = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(animatedValue.value, [0, 1], ['#ffffff00', theme.colors.border]),
    };
  }, [animatedValue]);

  const animatedValueStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [{ translateY: animatedValue.value * 6 }],
    };
  },  [animatedValue]);

  const animatedChevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateX: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` }],
    };
  }, [rotation]);

  const handleOptionPress = (option: Option<T>) => {
    onChange(option);
    setSheetOpen(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setSheetOpen(true)}>
        <Animated.View style={[styles.itemContainer, animatedContainerStyles]}>
          <View pointerEvents="none" style={styles.labelContainer}>
            <Animated.Text style={[styles.label, animatedLabelStyles]}>{label}</Animated.Text>
          </View>
          <Animated.View style={animatedValueStyle}>
            {!!values.length && (
              <Text contrast="low" style={styles.value}>
                {values[0].label}
              </Text>
            )}
          </Animated.View>
          <Animated.View style={animatedChevronStyle}>
            <Ionicons style={styles.chevron} name="chevron-down-outline" size={20} />
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
      {!!caption && <MenuItemDescription description={caption} />}
      <Sheet open={sheetOpen} setOpen={setSheetOpen} header={label}>
        {options.map((option, i) => (
          <TouchableOpacity
            style={[styles.selectionItem, option.selected && styles.selectedSelectionItem]}
            key={i}
            onPress={() => handleOptionPress(option)}
          >
            <Text contrast={option.selected ? 'high' : 'low'}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </Sheet>
    </>
  );
};

const useStyles = () =>
  useThemedStyle(
    useCallback(
      theme =>
        StyleSheet.create({
          chevron: {
            paddingRight: theme.size.baseSize * 2,
            color: theme.colors.foreground,
          },
          selectedSelectionItem: {
            borderColor: theme.colors.primary,
          },
          selectionItem: {
            alignItems: 'center',
            borderWidth: theme.borderWidth,
            borderColor: theme.colors.border,
            marginBottom: theme.size.baseSize * 2,
            padding: theme.size.baseSize * 2,
            borderRadius: theme.borderRadius,
          },
          itemContainer: {
            borderWidth: theme.borderWidth,
            borderColor: theme.colors.borderSecondary,
            backgroundColor: theme.colors.backgroundOnPrimary,
            marginBottom: theme.size.baseSize * 2,
            borderRadius: theme.borderRadius,
            minHeight: theme.size.baseSize * 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          labelContainer: {
            left: theme.size.baseSize * 2,
            position: 'absolute',
          },
          label: {
            color: theme.text,
            ...theme.typography.p1,
          },
          descriptionContainer: {
            marginHorizontal: theme.size.baseSize * 4,
            marginBottom: theme.size.baseSize * 2,
          },
          value: {
            paddingHorizontal: theme.size.baseSize * 2,
          },
        }),
      []
    )
  );

export default SelectInput;