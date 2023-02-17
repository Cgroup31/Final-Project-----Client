import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme, Icon } from '@ui-kitten/components';

import Text from './Text';

import { CategoryFragment } from 'constants/types';

interface CategoryItemProps extends TouchableOpacityProps {
  item: CategoryFragment;
  onPress?(): void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, onPress, ...rest }) => {
  const theme = useTheme();
  const { name, icon, color } = item;

  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <View style={[styles.iconView, { backgroundColor: color }]}>
        <Icon pack="assets" name={icon} style={{ tintColor: theme['color-basic-100'] }} />
      </View>
      <Text marginTop={8} center category="c1" status="content">
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  iconView: {
    width: 58,
    height: 58,
    borderRadius: 58 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: 'white',
  },
});
