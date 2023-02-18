import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'components';
import { useTheme, Button, Icon, Input } from '@ui-kitten/components';
import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AuthLayout from 'components/AuthLayout';
import { rulePassword } from 'utils/rules';
import { RootStackParamList } from 'navigation/types';

interface FormValues {
  email?: string;
  password?: string;
}

interface SocialMedia {
  icon: string;
  onPress?(): void;
}

const SignIn = React.memo(() => {
  const theme = useTheme();
  const { t } = useTranslation(['common', 'sign_in']);
  const { navigate, dispatch } = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const social_media: SocialMedia[] = [
    {
      icon: 'facebook',
      onPress: () => {},
    },
    {
      icon: 'apple',
      onPress: () => {},
    },
    {
      icon: 'google',
      onPress: () => {},
    },
  ];

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

  const handleSignIn = React.useCallback(() => {
    nextScreen('Drawer');
  }, []);

  return (
    <AuthLayout
      show_logo
      title="ברוכה הבאה לקהילת מתלבשות"
      bottom_content={{
        title: ['לא הצטרפת עדיין?', ' לחצי כאן '],
        onPress: () => navigate('Auth', { screen: 'SignUp' }),
      }}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            accessoryRight={(props) => <Icon pack="assets" name="user" {...props} />}
            value={value ? `${value}` : ''}
            onBlur={onBlur}
            onTouchStart={onBlur}
            style={styles.input}
            onChangeText={onChange}
            status={errors.email ? 'danger' : 'primary'}
            placeholder="אימייל"
            textAlign='right'
            //caption={errors.email ? t('numberFormatError').toString() : ''}
          />
        )}
        name="email"
        rules={{ required: true, minLength: 8 }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            accessoryRight={(props) => <Icon pack="assets" name="lock" {...props} />}
            value={value ? `${value}` : ''}
            onBlur={onBlur}
            style={styles.inputPassword}
            onChangeText={onChange}
            status={errors.password ? 'danger' : 'primary'}
            placeholder="סיסמה"
            textAlign='right'
            //caption={errors.password ? t('numberFormatError').toString() : ''}
          />
        )}
        name="password"
        rules={rulePassword}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigate('Auth', { screen: 'ForgotPassword' })}>
        <Text category="c1" status="basic" marginTop={16} right>
          שכחת את הסיסמה?
        </Text>
      </TouchableOpacity>
      <Button style={styles.button} children="כניסה" onPress={handleSignIn} />
      <View style={styles.setRow}>
        <View style={[styles.line, { backgroundColor: theme['background-basic-color-3'] }]} />
        <Text marginHorizontal={24} category="b1" status="placeholder">
          או הרשמי עם
        </Text>
        <View style={[styles.line, { backgroundColor: theme['background-basic-color-3'] }]} />
      </View>
      <View style={styles.viewSocial}>
        {social_media.map((item, index) => {
          const { icon, onPress } = item;
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPress}
              key={index}
              style={[
                styles.viewIcon,
                {
                  backgroundColor: theme['background-basic-color-3'],
                  marginRight: index === social_media.length - 1 ? 0 : 16,
                },
              ]}>
              <Icon
                pack="assets"
                style={[styles.icon, { tintColor: theme['text-content-color'] }]}
                name={icon}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </AuthLayout>
  );
});

export default SignIn;

const styles = StyleSheet.create({
  input: {
    marginTop: 32,
    textAlign: 'right',

  },
  inputPassword: {
    marginTop: 32,
    textAlign: 'right',
  },
  button: {
    marginTop: 32,
  },
  setRow: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 1,
    flex: 1,
  },
  viewSocial: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  viewIcon: {
    width: 32,
    height: 32,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
  },
});
