import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ProductItem } from 'components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useLayout } from 'hooks';

import keyExtractor from 'utils/keyExtractor';
import { products_list } from 'constants/data';
import { ProductFragment } from 'constants/types';
import { RootStackParamList } from 'navigation/types';

const RecentView: React.FC = () => {
  const { width, bottom } = useLayout();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const renderItem = React.useCallback(
    ({ item, index }: { item: ProductFragment; index: number }) => {
      return loading ? (
        <ProductItem.Loading
          style={{
            width: (width - 44) / 2,
            marginLeft: index % 2 !== 0 ? 8 : 16,
            marginRight: index % 2 !== 0 ? 16 : 8,
            marginBottom: 16,
          }}
        />
      ) : (
        <ProductItem
          style={{
            width: (width - 44) / 2,
            marginLeft: index % 2 !== 0 ? 8 : 16,
            marginRight: index % 2 !== 0 ? 16 : 8,
            marginBottom: 16,
          }}
          item={item}
          onPress={() => navigate('Product', { screen: 'ProductDetails' })}
        />
      );
    },
    [loading]
  );

  return (
    <View style={[styles.container, { width: width }]}>
      <FlatList
        data={products_list}
        numColumns={2}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: bottom }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default RecentView;

const styles = StyleSheet.create({
  container: {},
});
