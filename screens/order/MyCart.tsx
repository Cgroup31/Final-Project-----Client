import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CartItem, Container, NavigationAction, Text } from 'components';
import { TopNavigation, Layout, Button } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDrawer, useLayout } from 'hooks';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import { CartFragment } from 'constants/types';
import { RootStackParamList } from 'navigation/types';

const data: CartFragment[] = [
  {
    id: '0',
    image: Images.jacket,
    name: 'Striped Pocset Collab T-Shirts',
    colors: ['#B5E4CA', '#FFBC99', '#B1E5FC', '#CABDFF', '#FFD88D', '#5A5A59'],
    color: '#B5E4CA',
    sizes: ['s', 'm', 'l', 'xl'],
    size: 'm',
    price: 134,
    quantity: 1,
  },
  {
    id: '1',
    image: Images.image12,
    name: 'Jumbo Canvas Bucket Jacket GC',
    colors: ['#B5E4CA', '#FFBC99', '#B1E5FC', '#CABDFF', '#FFD88D', '#5A5A59'],
    color: '#B1E5FC',
    sizes: ['s', 'm', 'l', 'xl'],
    size: 'l',
    price: 145,
    quantity: 2,
  },
  {
    id: '2',
    image: Images.image12,
    name: 'Original GG Canvas Baseball Shoes',
    colors: ['#B5E4CA', '#FFBC99', '#B1E5FC', '#CABDFF', '#FFD88D', '#5A5A59'],
    color: '#FFD88D',
    sizes: ['s', 'm', 'l', 'xl'],
    size: 'xl',
    price: 298,
    quantity: 1,
  },
];

const MyCart = React.memo(() => {
  const { bottom } = useLayout();
  const { openDrawer } = useDrawer();
  const { t } = useTranslation(['common']);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [listSelected, setListSelected] = React.useState<CartFragment[]>([]);

  const handleSelect = React.useCallback(
    (item: CartFragment) => {
      if (listSelected) {
        const itemFound = listSelected.find((i) => i.id === item.id);
        if (itemFound) {
          const itemFilter = listSelected.filter((i) => i.id !== item.id);
          setListSelected(itemFilter);
        } else {
          setListSelected([...listSelected, item]);
        }
      }
    },
    [listSelected]
  );

  const renderItem = React.useCallback(
    ({ item }: { item: CartFragment }) => {
      const selectedItem = listSelected.find((i) => i.id === item.id);

      return (
        <CartItem
          enabled
          item={item}
          selectedItem={item === selectedItem}
          style={styles.item}
          onPress={() => handleSelect(item)}
        />
      );
    },
    [listSelected]
  );

  return (
    <Container>
      <TopNavigation
        title={t('common:my_cart').toString()}
        accessoryLeft={<NavigationAction icon="menu" onPress={openDrawer} />}
        accessoryRight={<NavigationAction icon="share" onPress={() => {}} />}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: bottom + 16 + 48 + 28 },
        ]}
      />
      <Layout style={[styles.bottomView, { paddingBottom: bottom + 16 }]}>
        <View style={styles.row}>
          <Text category="b1" status="description">
            {t('common:total')}:
          </Text>
          <Text category="h6">$80</Text>
        </View>
        <Button
          children={t('common:check_out').toString()}
          onPress={() => navigate('Product', { screen: 'CheckOut' })}
        />
      </Layout>
    </Container>
  );
});

export default MyCart;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 24,
    paddingRight: 16,
  },
  item: {
    marginLeft: 16,
  },
  row: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 16,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
