import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Skeleton } from 'moti/skeleton';

import Text from './Text';

import SvgSale from 'assets/svgs/SvgSale';
import { ProductFragment } from 'constants/types';

interface ProductHorizontalProps {
  style?: ViewStyle;
  item: ProductFragment;
  onPress?(): void;
}

const ProductHorizontal = ({ item, style, onPress }: ProductHorizontalProps) => {
  const { images, name_product, tags, price_origin, price_sale, is_sale } = item;

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.imageView, { height: 100 }]}>
        {!!images && <Image resizeMode="cover" style={styles.image} source={{ uri: images[0] }} />}
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.tagView}>
          {tags?.map((i, idx) => {
            return (
              <Text category="c3" status="body" marginRight={4} key={idx}>
                #{i}
              </Text>
            );
          })}
        </View>
        <Text category="b3" marginTop={4} numberOfLines={2}>
          {name_product}
        </Text>
        <View style={styles.priceView}>
          <Text category="b2">${price_sale}</Text>
          <Text category="c3" status="placeholder" marginLeft={4} marginTop={3} line_through>
            ${price_origin}
          </Text>
        </View>
      </View>
      {is_sale && (
        <View style={styles.saleTag}>
          <SvgSale />
        </View>
      )}
    </TouchableOpacity>
  );
};

const Loading = ({ style }: { style?: ViewStyle }) => {
  return (
    <View style={[styles.container, style]}>
      <Skeleton colorMode="light" show={true}>
        <View style={[styles.imageView, { height: 100 }]} />
      </Skeleton>
      <View style={styles.flex}>
        <View style={styles.tagLoading}>
          <Skeleton width="70%" height={12} colorMode="light" show={true} />
        </View>
        <View style={styles.name}>
          <Skeleton width="100%" height={18} colorMode="light" show={true} />
        </View>
        <View style={styles.priceLoading}>
          <Skeleton width="60%" height={18} colorMode="light" show={true} />
        </View>
      </View>
    </View>
  );
};

ProductHorizontal.Loading = Loading;

export default ProductHorizontal;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'green',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageView: {
    borderRadius: 8,
    overflow: 'hidden',
    aspectRatio: 1 / 1,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  flex: {
    flex: 1,
  },
  tagView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  tagLoading: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  name: {
    marginTop: 4,
    marginHorizontal: 16,
  },
  priceLoading: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  top: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sale: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 24,
  },
  favorite: {
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF50',
  },
  icon: {
    width: 12,
    height: 12,
  },
  saleTag: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
