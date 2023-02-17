import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TopNavigation } from '@ui-kitten/components';
import { CollectionItem, Container, Content, NavigationAction, Text } from 'components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDrawer, useLayout } from 'hooks';

import keyExtractor from 'utils/keyExtractor';
import { ICollection } from 'constants/types';
import { RootStackParamList } from 'navigation/types';
import { new_collections, popular_collections } from 'constants/data';

const CollectionScreen = React.memo(() => {
  const { openDrawer } = useDrawer();
  const { width, bottom } = useLayout();
  const { t } = useTranslation(['common', 'collection']);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

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

  return (
    <Container>
      <TopNavigation
        title={t('collection:my_collections').toString()}
        accessoryLeft={<NavigationAction icon="menu" onPress={openDrawer} />}
        accessoryRight={<NavigationAction icon="option" onPress={() => {}} />}
      />
      <Content contentContainerStyle={{ paddingBottom: bottom + 24 }}>
        <Text category="h6" marginLeft={16} marginTop={24} marginBottom={8}>
          {t('collection:popular_collections')}
        </Text>
        <FlatList
          data={popular_collections || []}
          horizontal
          renderItem={renderCollectionItem}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEventThrottle={16}
          snapToInterval={width - (24 + 84 - 12)}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
        />
        <Text category="h6" marginLeft={16} marginTop={24} marginBottom={8}>
          {t('collection:new_collections')}
        </Text>
        <FlatList
          data={new_collections || []}
          horizontal
          renderItem={renderCollectionItem}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEventThrottle={16}
          snapToInterval={width - (24 + 84 - 12)}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
        />
      </Content>
    </Container>
  );
});

export default CollectionScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingLeft: 8,
  },
});
