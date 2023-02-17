import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  AddressItem,
  CardItem,
  Container,
  Content,
  MethodItem,
  NavigationAction,
  Text,
  TitleBar,
} from 'components';
import { Button, Layout, TopNavigation } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/store';
import { useLayout } from 'hooks';

import { Images } from 'assets/images';

import keyExtractor from 'utils/keyExtractor';
import { RootStackParamList } from 'navigation/types';
import { addressSelector } from 'store/slices/addressSlice';
import { CardFragment, MethodFragment } from 'constants/types';

const data_payment: CardFragment[] = [
  {
    name: 'Jenny Wilson',
    card_number: 1234567898760329,
    exp_date: '03/24',
    image: Images.card_1,
  },
  {
    name: 'Jenny Wilson',
    card_number: 1234567898760329,
    exp_date: '03/24',
    image: Images.card_2,
  },
];

const data_method: MethodFragment[] = [
  {
    id: '0',
    image: Images.method_1,
  },
  {
    id: '1',
    image: Images.method_2,
  },
  {
    id: '2',
    image: Images.method_3,
  },
];

const CheckOut = React.memo(() => {
  const { width, bottom, bottomButton } = useLayout();
  const { t } = useTranslation(['common']);
  const { address } = useAppSelector(addressSelector);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [method, setMethod] = React.useState<MethodFragment>(data_method[0]);

  const renderCardItem = React.useCallback(({ item }: { item: CardFragment }) => {
    return <CardItem item={item} style={styles.card} />;
  }, []);

  const renderMethodItem = React.useCallback(
    ({ item }: { item: MethodFragment }) => {
      return (
        <MethodItem
          item={item}
          style={styles.method}
          is_selected={method.id === item.id}
          onPress={() => setMethod(item)}
        />
      );
    },
    [method]
  );

  return (
    <Container>
      <TopNavigation
        title={t('common:check_out').toString()}
        accessoryLeft={<NavigationAction />}
        accessoryRight={<NavigationAction icon="option" />}
      />
      <Content contentContainerStyle={{ paddingBottom: bottomButton }}>
        <TitleBar
          paddingHorizontal={16}
          title={t('common:shipping_address')}
          accessoryRight={{
            title: t('common:change'),
            onPress: () => navigate('Product', { screen: 'MyAddress' }),
          }}
        />
        <AddressItem item={address} style={styles.item} />
        <TitleBar
          paddingHorizontal={16}
          marginBottom={16}
          marginTop={24}
          title={t('common:payment')}
          accessoryRight={{
            title: t('common:change'),
            onPress: () => navigate('Product', { screen: 'MyCard' }),
          }}
        />
        <FlatList
          data={data_payment}
          renderItem={renderCardItem}
          horizontal
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEventThrottle={16}
          snapToInterval={width - 72}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
        />
        <TitleBar
          paddingHorizontal={16}
          marginTop={24}
          marginBottom={16}
          title={t('common:delivery_method')}
          accessoryRight={{
            title: t('common:see_all'),
            onPress: () => {},
          }}
        />
        <FlatList
          data={data_method}
          renderItem={renderMethodItem}
          horizontal
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEventThrottle={16}
          snapToInterval={(width - (80 + 16 + 8)) / 2}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
        />
        <View style={styles.row}>
          <Text category="b1" status="description">
            {t('common:sub_total')}:
          </Text>
          <Text category="t1">$84.27</Text>
        </View>
        <View style={styles.row}>
          <Text category="b1" status="description">
            {t('common:discount')}:
          </Text>
          <Text category="t1">-4.27</Text>
        </View>
        <View style={styles.row}>
          <Text category="b1" status="description">
            {t('common:total')}:
          </Text>
          <Text category="t1">$80</Text>
        </View>
      </Content>
      <Layout style={[styles.buttonView, { padding: bottom + 16 }]}>
        <Button
          children={t('common:check_out').toString()}
          onPress={() =>
            navigate('ModalScreen', {
              modalScreen: {
                status: 'success',
                title: 'Success!',
                description: 'Thank you for purchasing\nYour order will be shipped in few day',
                children: [
                  {
                    status: 'primary',
                    title: 'Go Shopping',
                    onPress: () => navigate('Drawer', { screen: 'MainBottomTab' }),
                    id: 0,
                  },
                ],
              },
            })
          }
        />
      </Layout>
    </Container>
  );
});

export default CheckOut;

const styles = StyleSheet.create({
  item: {
    marginTop: 16,
    marginRight: 16,
  },
  contentContainerStyle: {
    paddingLeft: 16,
    marginBottom: 32,
  },
  card: {
    marginRight: 16,
  },
  method: {
    marginRight: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  buttonView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 8,
    paddingHorizontal: 32,
  },
});
