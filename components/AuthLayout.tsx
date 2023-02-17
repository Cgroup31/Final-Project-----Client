import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ViewProps,
  KeyboardAvoidingView,
  Platform,
  ImageRequireSource,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Skeleton } from 'moti/skeleton';
import { Container, HideWithKeyboard, Text } from 'components';
import { useTheme, Button, Layout } from '@ui-kitten/components';
import { useAnimationState, MotiView } from 'moti';
import { useBoolean, useLayout } from 'hooks';
import { useTranslation } from 'react-i18next';

import { Images } from 'assets/images';

interface AuthLayoutProps extends ViewProps {
  title: string;
  show_logo?: boolean;
  bottom_content?: {
    title: string[];
    onPress?(): void;
  };
  is_success?: boolean;
  modal_content?: {
    title: string;
    description: string;
    image?: ImageRequireSource;
    title_button: string;
    onPress?(): void;
  };
}

const AuthLayout = React.memo<AuthLayoutProps>(
  ({ title, show_logo, bottom_content, is_success, modal_content, ...rest }) => {
    const theme = useTheme();
    const scrollY = useSharedValue(0);
    const { height, width, bottom } = useLayout();
    const { t } = useTranslation('common');
    const [loaded, { on, off }] = useBoolean(false);
    const CONTENT_HEIGHT = height * 0.7 + bottom + 52;
    const MODAL_HEIGHT = height * 0.7;

    const scrollHandler = useAnimatedScrollHandler((event) => {
      scrollY.value = event.contentOffset.y;
    });

    const contentAnim = useAnimatedStyle(() => {
      const translateY = interpolate(
        scrollY.value,
        [CONTENT_HEIGHT, 0, -CONTENT_HEIGHT - bottom - 52],
        [0, 0, -CONTENT_HEIGHT + CONTENT_HEIGHT / 6]
      );

      return {
        backgroundColor: theme['background-basic-color-1'],
        height: CONTENT_HEIGHT,
        transform: [{ translateY }],
        paddingHorizontal: 32,
      };
    });

    const imageAnim = useAnimatedStyle(() => {
      const translateY = interpolate(scrollY.value, [-height, 0, height], [-height, 0, height]);

      return {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: -1,
        transform: [{ translateY }],
      };
    });

    const useTranslate1 = () => {
      return useAnimationState({
        from: {
          opacity: 0,
          translateY: CONTENT_HEIGHT,
        },
        to: {
          opacity: 1,
          translateY: 0,
        },
      });
    };

    const useTranslate2 = () => {
      return useAnimationState({
        from: {
          opacity: 0,
          translateY: bottom + 52,
        },
        to: {
          opacity: 1,
          translateY: 0,
        },
      });
    };

    const translate1 = useTranslate1();
    const translate2 = useTranslate2();
    const translate3 = useTranslate1();

    React.useEffect(() => {
      if (translate1.current === 'to' && is_success) {
        translate1.transitionTo('from');
        translate2.transitionTo('from');
        translate3.transitionTo('to');
      }
    }, [is_success]);

    React.useEffect(() => {
      translate1.transitionTo('to');
      translate2.transitionTo('to');
      translate3.transitionTo('from');
    }, []);

    return (
      <Container useSafeArea={false}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}>
          <Animated.View style={imageAnim}>
            <Skeleton colorMode="light" show={loaded}>
              <ImageBackground
                onLoadStart={on}
                onLoadEnd={off}
                resizeMode="cover"
                source={Images.image6}
                style={{ width: width, height: height }}>
                {!loaded && (
                  <View
                    style={[styles.background, { backgroundColor: theme['color-basic-1000'] }]}
                  />
                )}
              </ImageBackground>
            </Skeleton>
          </Animated.View>
          <View style={{ height: height * 0.3 }} />
          <MotiView
            transition={{
              type: 'timing',
              duration: 1000,
            }}
            state={translate1}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'position' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}>
              <Animated.View style={[styles.content, contentAnim]}>
                {!!show_logo && (
                  <Layout style={styles.logoView}>
                    <View
                      style={[
                        styles.logoContent,
                        {
                          backgroundColor: theme['color-primary-500'],
                        },
                      ]}>
                      <Image
                        style={[styles.logo, { tintColor: theme['color-basic-100'] }]}
                        source={Images.logo}
                      />
                    </View>
                  </Layout>
                )}
                <Text category="h4" status="description" center marginTop={show_logo ? 4 : 32}>
                  {title}
                </Text>
                <View {...rest} />
              </Animated.View>
            </KeyboardAvoidingView>
          </MotiView>
        </Animated.ScrollView>
        {!!bottom_content && (
          <MotiView
            state={translate2}
            transition={{
              type: 'timing',
              duration: 1000,
              delay: is_success ? 0 : 200,
            }}>
            <HideWithKeyboard
              style={[
                styles.viewBottom,
                { backgroundColor: theme['background-basic-color-1'], paddingBottom: bottom + 16 },
              ]}>
              <TouchableOpacity activeOpacity={0.7} onPress={bottom_content.onPress}>
                <Text category="b3" status="body" center>
                  {bottom_content.title[0]}
                  <Text status="basic" category="b5">
                    {bottom_content.title[1]}
                  </Text>
                </Text>
              </TouchableOpacity>
            </HideWithKeyboard>
          </MotiView>
        )}
        {!!modal_content && (
          <MotiView
            transition={{
              type: 'timing',
              duration: 1000,
            }}
            state={translate3}
            delay={700}>
            <Animated.View
              style={[
                styles.modal,
                {
                  backgroundColor: theme['background-basic-color-1'],
                  height: MODAL_HEIGHT,
                  paddingBottom: bottom + 16,
                },
              ]}>
              <Text category="h4" status="description" center marginTop={32}>
                {modal_content.title ? modal_content.title : t('success')}!
              </Text>
              <Text center category="b1" status="description" marginTop={8}>
                {modal_content.description}
              </Text>
              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={modal_content.image ? modal_content.image : Images.image_success}
                />
              </View>
              <Button
                style={styles.button}
                children={modal_content.title_button}
                onPress={modal_content.onPress}
              />
            </Animated.View>
          </MotiView>
        )}
      </Container>
    );
  }
);

export default AuthLayout;

const styles = StyleSheet.create({
  background: {
    opacity: 0.7,
    flex: 1,
  },
  content: {
    flex: 7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 32,
  },
  logoView: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginTop: -70 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logoContent: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
  },
  viewBottom: {
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 8,
    position: 'absolute',
    zIndex: 10,
  },
  button: {
    marginTop: 16,
  },
  imageView: {
    flex: 1,
    marginTop: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
