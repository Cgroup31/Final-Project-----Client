import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, View, Image, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Text } from 'components';
import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';
import { useTheme, Icon, Layout } from '@ui-kitten/components';
import { useNavigationState } from '@react-navigation/native';
import { useAuth, useDrawer, useLayout } from 'hooks';
import { useTranslation } from 'react-i18next';

import MainBottomTab from './MainBottomTab';
import MyFeed from 'screens/MyFeed';
import MyVoucher from 'screens/MyVoucher';
import BlogFashion from 'screens/blog/BlogFashion/BlogFashion';
import MyOrder from 'screens/order/MyOrder/MyOrder';
import MyCart from 'screens/order/MyCart';
import TermOfUseScreen from 'screens/TermOfUse/TermOfUseScreen';

import { Images } from 'assets/images';
import { DrawerStackParamList, RootStackParamList } from './types';

const { Navigator, Screen } = createDrawerNavigator<DrawerStackParamList>();

interface DrawerItemProps {
  title?: string;
  onPress?(): void;
  router?: string;
}

interface SocialMediaSpec {
  icon: string;
  onPress?(): void;
}

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const theme = useTheme();
  const { signOut } = useAuth();
  const { closeDrawer } = useDrawer();
  const { top, bottom } = useLayout();
  const { t } = useTranslation('common');
  const { dispatch, navigate } = useNavigation<NavigationProp<DrawerStackParamList>>();
  const { navigate: _navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const nextScreen = React.useCallback((screenName: keyof RootStackParamList) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName,
        },
      ],
    });
    dispatch(resetAction);
  }, []);

  const logout = React.useCallback(async () => {
    await signOut();
    nextScreen('Auth');
  }, [signOut]);

  const menu: DrawerItemProps[] = [
    {
      title: 'Home',
      onPress: () => navigate('MainBottomTab', { screen: 'HomeMain' }),
    },
    {
      title: t('my_feed'),
      onPress: () => navigate('MyFeed'),
    },
    {
      title: t('my_order'),
      onPress: () => navigate('MyOrder'),
    },
    {
      title: t('my_voucher'),
      onPress: () => navigate('MyVoucher'),
    },
    {
      title: t('blog_fashion'),
      onPress: () => navigate('BlogFashion'),
    },
    {
      title: t('my_card'),
      onPress: () => _navigate('Product', { screen: 'MyCard' }),
    },
    {
      title: t('address_shipping'),
      onPress: () => _navigate('Product', { screen: 'MyAddress' }),
    },
    {
      title: t('terms_conditions'),
      onPress: () => navigate('TermOfUse'),
    },
  ];

  const social_media: SocialMediaSpec[] = [
    {
      icon: 'instagram',
    },
    {
      icon: 'twitter',
    },
    {
      icon: 'be',
    },
    {
      icon: 'facebook',
    },
    {
      icon: 'pinterest',
    },
  ];

  const routes = useNavigationState((state) => state.routes);

  const currentRouteIndex = routes?.length && routes[routes.length - 1].state?.index;
  //@ts-ignore
  const currentRoute = routes[routes.length - 1].state?.routeNames[currentRouteIndex + 1];

  const DrawerItem = React.useCallback(({ title, onPress }: DrawerItemProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          closeDrawer();
          onPress && onPress();
        }}
        activeOpacity={0.7}
        style={styles.drawerItem}>
        <Text status="body" category="h5">
          {title}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <Layout level="2" style={styles.container}>
      <View style={styles.background}>
        <Image resizeMode="cover" style={styles.imageBackground} source={Images.image7} />
      </View>
      <View style={[styles.shadow, { backgroundColor: theme['color-primary-500'] }]} />
      <TouchableOpacity style={[styles.btnDelete, { top: top + 24 }]} onPress={closeDrawer}>
        <Icon pack="assets" name="close" style={{ tintColor: theme['color-basic-600'] }} />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: top + 24 + 48,
          paddingBottom: bottom + 52,
        }}>
        <View>
          {menu.map((item, index) => {
            return <DrawerItem key={index} {...item} />;
          })}
          <View style={[styles.line, { backgroundColor: theme['color-basic-900'] }]} />
          <DrawerItem title={t('log_out')} onPress={logout} />
        </View>
      </ScrollView>
      <View style={[styles.socialMedia, { bottom: bottom + 16 }]}>
        {social_media.map((item, index) => {
          const { icon, onPress } = item;
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              style={[styles.icon, { backgroundColor: theme['color-basic-1000'] }]}
              onPress={onPress}>
              <Icon
                pack="assets"
                style={[styles.icon16, { tintColor: theme['color-basic-500'] }]}
                name={icon}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </Layout>
  );
};

const DrawerNavigator = memo(() => (
  <Navigator
    initialRouteName="MainBottomTab"
    screenOptions={{ headerShown: false, drawerStyle: styles.drawerStyle }}
    drawerContent={(props: DrawerContentComponentProps) => <DrawerContent {...props} />}>
    <Screen name="MainBottomTab" component={MainBottomTab} />
    <Screen name="MyCart" component={MyCart} />
    <Screen name="MyOrder" component={MyOrder} />
    <Screen name="TermOfUse" component={TermOfUseScreen} />
    <Screen name="BlogFashion" component={BlogFashion} />
    <Screen name="MyFeed" component={MyFeed} />
    <Screen name="MyVoucher" component={MyVoucher} />
  </Navigator>
));

export default DrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerStyle: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  drawerItem: {
    minHeight: 64,
    justifyContent: 'center',
  },
  btnDelete: {
    position: 'absolute',
    left: 24,
    marginBottom: 48,
    zIndex: 1,
  },
  line: {
    height: 1,
    marginVertical: 8,
  },
  socialMedia: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  background: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    position: 'absolute',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  shadow: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    position: 'absolute',
    opacity: 0.9,
  },
  icon16: {
    width: 16,
    height: 16,
  },
});
