import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Container, NavigationAction, ProductHorizontal, ProductItem } from 'components';
import { useTheme, TopNavigation, Input, Icon } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';

import Filter from './components/Filter';
import Carousel from 'react-native-reanimated-carousel';
import BannerProductGrid from './components/BannerProductGrid';

import { RootStackParamList } from 'navigation/types';
import { Grid_Types_Enum, ProductFragment } from 'constants/types';
import { data_banner_product_grid, products_list, recent_list } from 'constants/data';

const ProductGridScreen = React.memo(() => {
  const theme = useTheme();
  const { t } = useTranslation(['common', 'product']);
  const { width } = useLayout();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const bottomSheetPhotoRef = React.useRef<BottomSheet>(null);
  const initialSnapPoints = React.useMemo(() => ['1%', 'CONTENT_HEIGHT'], []);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const [search, setSearch] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);
  const [type, setType] = React.useState<Grid_Types_Enum>(Grid_Types_Enum.Column);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const renderBanner = React.useCallback(({ item }) => {
    return <BannerProductGrid item={item} />;
  }, []);

  const renderHeader = React.useCallback(
    () => (
      <View>
        <Carousel
          data={data_banner_product_grid || []}
          renderItem={renderBanner}
          width={width}
          height={186}
          snapEnabled
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          loop={false}
          enabled
        />
        <Input
          style={styles.search}
          status="search"
          value={search}
          onChangeText={setSearch}
          placeholder={'Search... '}
          accessoryLeft={<Icon pack="assets" name="search" />}
          accessoryRight={(props) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.filter, { borderColor: theme['background-basic-color-5'] }]}
              onPress={() => bottomSheetPhotoRef.current?.expand()}>
              <Icon {...props} pack="assets" name="filter" />
            </TouchableOpacity>
          )}
        />
      </View>
    ),
    []
  );

  const renderItem = React.useCallback(
    ({ item, index }: { item: ProductFragment; index: number }) => {
      return loading ? (
        <View style={styles.item}>
          {type === Grid_Types_Enum.Column ? (
            <ProductItem.Loading
              style={{
                marginLeft: index % 2 !== 0 ? 8 : 16,
                marginRight: index % 2 !== 0 ? 16 : 8,
              }}
            />
          ) : (
            <ProductHorizontal.Loading style={styles.productHorizontal} />
          )}
        </View>
      ) : (
        <View style={styles.item}>
          {type === Grid_Types_Enum.Column ? (
            <ProductItem
              style={{
                marginLeft: index % 2 !== 0 ? 8 : 16,
                marginRight: index % 2 !== 0 ? 16 : 8,
              }}
              item={item}
              onPress={() => navigate('Product', { screen: 'ProductDetails' })}
            />
          ) : (
            <ProductHorizontal
              item={item}
              style={styles.productHorizontal}
              onPress={() => navigate('Product', { screen: 'ProductDetails' })}
            />
          )}
        </View>
      );
    },
    [loading, type]
  );

  return (
    <Container>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={t('product:hot_summer').toString()}
        accessoryRight={
          <View style={styles.row}>
            <NavigationAction
              icon={type === Grid_Types_Enum.Column ? 'column-fill' : 'column'}
              marginRight={12}
              onPress={() => setType(Grid_Types_Enum.Column)}
            />
            <NavigationAction
              icon={type === Grid_Types_Enum.Horizontal ? 'horizontal-fill' : 'horizontal'}
              onPress={() => setType(Grid_Types_Enum.Horizontal)}
            />
          </View>
        }
      />
      {type === Grid_Types_Enum.Column ? (
        <FlatList
          data={products_list || []}
          numColumns={2}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          keyExtractor={(item) => `${item.id}`}
        />
      ) : (
        <View>
          <FlatList
            data={recent_list || []}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeader}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      )}
      <BottomSheet
        ref={bottomSheetPhotoRef}
        snapPoints={animatedSnapPoints}
        index={-1}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={BottomSheetBackdrop}>
        <BottomSheetView onLayout={handleContentLayout}>
          <Filter />
        </BottomSheetView>
      </BottomSheet>
    </Container>
  );
});

export default ProductGridScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  filter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    borderLeftWidth: 1,
  },
  item: {
    marginBottom: 16,
    flex: 1,
  },
  productHorizontal: {
    marginHorizontal: 16,
  },
});
