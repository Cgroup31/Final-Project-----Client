import React from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import {
  CollectionItem,
  Container,
  NavigationAction,
  ProductHorizontal,
  ProductItem,
  Text,
  TitleBar,
} from 'components';
import { TopNavigation } from '@ui-kitten/components';
import { useDrawer, useLayout } from 'hooks';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Frame from './components/Frame';
import Header from './components/Header';

import { Images } from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import { ICollection, ProductFragment } from 'constants/types';
import { collections, products_list, recent_list } from 'constants/data';
import { RootStackParamList } from 'navigation/types';

const HomeScreen = React.memo(() => {
  const { openDrawer } = useDrawer();
  const { width, top, bottom } = useLayout();
  const { t } = useTranslation(['common', 'home']);
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
            width: (width - 48) / 2,
            marginLeft: index % 2 !== 0 ? 8 : 16,
            marginRight: index % 2 !== 0 ? 16 : 8,
            marginBottom: 16,
          }}
        />
      ) : (
        <ProductItem
          style={{
            width: (width - 48) / 2,
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

  const renderCollectionItem = React.useCallback(
    ({ item }: { item: ICollection }) => {
      return loading ? (
        <CollectionItem.Loading />
      ) : (
        <CollectionItem
          item={item}
          onPress={() => navigate('Product', { screen: 'ProductGrid' })}
        />
      );
    },
    [loading]
  );

  const renderEmpty = () => (
    <View>
      <Text>Empty</Text>
    </View>
  );

  const renderHeader = () => <Header />;

  const renderFooter = () => (
    <View>
      <Frame />
      <TitleBar
        marginTop={32}
        marginBottom={16}
        paddingHorizontal={16}
        title={t('home:best_seller')}
        accessoryRight={{
          title: t('common:view_all'),
          onPress: () => navigate('Product', { screen: 'ProductGrid' }),
        }}
      />
      <FlatList
        data={collections || []}
        horizontal
        renderItem={renderCollectionItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentBestSeller}
        scrollEventThrottle={16}
        snapToInterval={width - (24 + 84 - 12)}
        bounces={false}
        pagingEnabled={false}
        decelerationRate="fast"
      />
      <TitleBar
        marginTop={32}
        marginBottom={16}
        paddingHorizontal={16}
        title={t('common:recent_view')}
        accessoryRight={{
          title: t('common:view_all'),
          onPress: () => navigate('Product', { screen: 'ProductGrid' }),
        }}
      />
      <View style={styles.padding}>
        {recent_list.map((item, index) => {
          return loading ? (
            <ProductHorizontal.Loading key={index} style={styles.productHorizontal} />
          ) : (
            <ProductHorizontal
              item={item}
              key={index}
              style={styles.productHorizontal}
              onPress={() => navigate('Product', { screen: 'ProductDetails' })}
            />
          );
        })}
      </View>
    </View>
  );

  return (
    <Container useSafeArea={false}>
      <TopNavigation
        style={{ paddingTop: top + 12 }}
        accessoryLeft={<NavigationAction icon="menu" onPress={openDrawer} />}
        accessoryRight={() => (
          <View style={styles.flex}>
            <NavigationAction marginRight={12} icon="search" onPress={() => {}} />
            <NavigationAction icon="notification" onPress={() => {}} />
          </View>
        )}
        title={() => (
          <Image style={[styles.icon40, { marginTop: top - 12 }]} source={Images.logo} />
        )}
      />
      <FlatList
        style={styles.container}
        contentContainerStyle={{ paddingBottom: bottom + 86 }}
        data={products_list || []}
        numColumns={2}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        keyExtractor={(item) => `${item.id}`}
      />
    </Container>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
  },
  contentBestSeller: {
    paddingLeft: 16,
    paddingRight: 16 - 8,
  },
  item: {
    marginBottom: 16,
  },
  productHorizontal: {
    marginBottom: 12,
  },
  padding: {
    paddingHorizontal: 16,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon40: {
    width: 40,
    height: 40,
  },
});
