import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, NavigationAction, TagItem, Text } from 'components';
import { useTheme, TopNavigation, Divider, Layout } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import { data_tags } from 'constants/data';

const ProductInformation = React.memo(() => {
  const theme = useTheme();
  const { bottom } = useLayout();
  const { t } = useTranslation(['common', 'product_details']);

  const data = [
    'Material: cotton felt fabric, 100% cotton',
    'Shape: wide loose',
    'Front: 2 pictures from ClownZ Racing, 2 sides of shirt',
    'Back: large format ClownZ Racing photo',
    'Has a genuine identification tag on the side',
    'Using technology in high temperature, have high side after many uses.',
  ];

  return (
    <Container>
      <TopNavigation
        title={t('product_details:product_detail')}
        accessoryLeft={<NavigationAction />}
      />
      <Content
        isPadding
        contentContainerStyle={[styles.contentContainerStyle, { paddingBottom: bottom + 16 }]}>
        <Text category="t1">{t('product_details:story')}</Text>
        <Text marginTop={4} category="b1" status="placeholder">
          Compelling product descriptions don't just convey what your product is, but why a customer
          should buy it.
        </Text>
        <Divider style={styles.line} />
        <Text category="t1">{t('product_details:about_items')}</Text>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.row}>
              <View style={styles.viewDot}>
                <Layout
                  level="6"
                  style={[styles.dot, { backgroundColor: theme['color-basic-600'] }]}
                />
              </View>
              <Text marginLeft={12} category="b1" status="placeholder">
                {item}
              </Text>
            </View>
          );
        })}
        <Divider style={styles.line} />
        <Text category="t1" marginBottom={8}>
          {t('common:tags')}
        </Text>
        <View style={styles.row1}>
          {data_tags.map((i, idx) => {
            return <TagItem item={i} key={idx} style={styles.tag} />;
          })}
        </View>
      </Content>
    </Container>
  );
});

export default ProductInformation;

const styles = StyleSheet.create({
  line: {
    marginVertical: 24,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
  },
  viewDot: {
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginLeft: 8,
    marginTop: 4,
  },
  row1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 8,
  },
  contentContainerStyle: {
    paddingTop: 24,
  },
});
