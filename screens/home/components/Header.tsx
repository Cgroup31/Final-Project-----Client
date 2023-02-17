import React from 'react';
import { CategoryItem, TitleBar } from 'components';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import Banner from './Banner';

import keyExtractor from 'utils/keyExtractor';
import { data_banner, data_categories } from '../data';
import { CategoryFragment } from 'constants/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamList } from 'navigation/types';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { t } = useTranslation(['common', 'home']);
  const { width } = useLayout();
  const { navigate } = useNavigation<NavigationProp<MainStackParamList>>();

  const renderBanner = React.useCallback(({ item }) => {
    const { data } = item;
    return <Banner banners={data} />;
  }, []);

  const renderCategory = React.useCallback(
    ({ item, index }: { item: CategoryFragment; index: number }) => {
      return (
        <CategoryItem
          item={item}
          style={{ marginRight: index === data_categories.length - 1 ? 16 : 24 }}
          onPress={() => navigate('CategoriesMain')}
        />
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data_banner || []}
          renderItem={renderBanner}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width - 52}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          contentContainerStyle={styles.contentBanner}
        />
      </View>
      <TitleBar
        marginTop={32}
        paddingHorizontal={16}
        title={t('common:categories')}
        accessoryRight={{
          title: t('common:all_categories'),
          onPress: () => navigate('CategoriesMain'),
        }}
      />
      <View>
        <FlatList
          data={data_categories || []}
          renderItem={renderCategory}
          keyExtractor={(item, index) => `category ${item.name} ${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.contentCategory}
        />
      </View>
      <TitleBar
        marginTop={32}
        paddingHorizontal={16}
        title={t('home:popular_items')}
        accessoryRight={{ title: t('common:view_all'), onPress: () => navigate('CollectionMain') }}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  contentBanner: {
    paddingLeft: 16,
    paddingRight: 4,
  },
  row: {
    marginTop: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentCategory: {
    paddingLeft: 16,
    paddingRight: -16,
    marginTop: 8,
  },
});
