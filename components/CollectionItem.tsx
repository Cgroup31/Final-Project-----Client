import React from 'react';
import { View, Image, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Skeleton } from 'moti/skeleton';
import { Icon, useTheme } from '@ui-kitten/components';
import { useLayout } from 'hooks';
import { useTranslation } from 'react-i18next';

import Text from './Text';

import { ICollection } from 'constants/Types';

interface CollectionItemProps {
  style?: ViewStyle;
  item: ICollection;
  onPress?(): void;
}

const CollectionItem = ({ style, item, onPress }: CollectionItemProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { width } = useLayout();
  const { name_collection, images } = item;

  const ImageItem = ({ image, style }: { image: string; style?: ViewStyle }) => {
    return image ? (
      <View style={[styles.image_view, style]}>
        <Image style={styles.image} resizeMode="cover" source={{ uri: image }} />
      </View>
    ) : (
      <View />
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, { width: width - (24 + 84) }, style]}>
      <View style={{ flexDirection: 'row' }}>
        <ImageItem image={images[0]} style={{ flex: 6.73, marginRight: 8 }} />
        <View style={[{ flex: 3.37 }]}>
          <ImageItem image={images[1]} style={{ marginBottom: 4 }} />
          <View style={[styles.image_view, { marginTop: 4 }]}>
            <ImageItem image={images[2]} />
            <View
              style={[
                styles.overlay,
                {
                  backgroundColor: theme['color-primary-800'],
                },
              ]}>
              <Text category="b2" status="white">
                {t('more')}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text category="b2" marginTop={12} marginHorizontal={8}>
        {name_collection}
      </Text>
      <View style={styles.item}>
        <Icon name="diamond" pack="assets" style={styles.icon16} />
        <Text category="c2" marginLeft={8}>
          {t('items', { number: 323 })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Loading = ({ style }: { style?: ViewStyle }) => {
  const { width } = useLayout();

  return (
    <View style={[styles.container, { width: width - (24 + 84) }, style]}>
      <View style={{ flexDirection: 'row' }}>
        <View></View>
        <View style={[styles.image_view, { flex: 6.73, marginRight: 8 }]}>
          <Skeleton colorMode="light" show={true} width="100%" height="100%" />
        </View>
        <View style={[{ flex: 3.37 }]}>
          <View style={[styles.image_view, { marginBottom: 4 }]}>
            <Skeleton colorMode="light" show={true} width="100%" height="100%" />
          </View>
          <View style={[styles.image_view, { marginTop: 4 }]}>
            <Skeleton colorMode="light" show={true} width="100%" height="100%" />
          </View>
        </View>
      </View>
      <View style={styles.nameLoading}>
        <Skeleton width="100%" height={12} colorMode="light" show={true} />
      </View>
      <View style={styles.item}>
        <Skeleton width="80%" height={12} colorMode="light" show={true} />
      </View>
    </View>
  );
};

CollectionItem.Loading = Loading;

export default CollectionItem;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginRight: 12,
  },
  image_view: {
    aspectRatio: 1 / 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  item_view_overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  item: {
    marginTop: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameLoading: {
    marginTop: 12,
    paddingHorizontal: 8,
  },
  icon16: {
    width: 16,
    height: 16,
  },
});
