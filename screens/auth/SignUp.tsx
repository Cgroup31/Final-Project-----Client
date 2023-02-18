import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'components';
import { Button, Icon, Input, CheckBox, Datepicker } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useBoolean } from 'hooks';
//import DatePicker from 'react-native-datepicker';
import AuthLayout from 'components/AuthLayout';
import { RootStackParamList } from 'navigation/types';
import { rulePassword, ruleRePassword } from 'utils/rules';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useEffect } from 'react';
import { memo } from 'react';

interface FormValues {
  email: string;
  password: string;
  re_password: string;
  phone: string;
  address: string;
  name: string;
}
const maxDate = new Date();
const minDate = new Date('Janury 01, 1900');

const SignUp = memo(() => {
  const { t } = useTranslation(['common', 'sign_up']);
  const { navigate, goBack } = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [isRegistered, setRegistered] = useState<boolean>(false);
  // const CalendarIcon = (props) => (
  //   <Icon {...props} name='calendar'/>
  // );

  useEffect(() => {
    setRegistered(false);
  }, []);

  return (
    <ScrollView>
      <AuthLayout
        show_logo
        title="הצטרפי לקהילה"
        bottom_content={{
          title: ['כבר יש לך חשבון? ', 'התחברי'],
          onPress: () => goBack(),
        }}
        is_success={isRegistered}
        // modal_content={{
        //   title: t('common:success'),
        //   description: t('sign_up:sign_up_success'),
        //   title_button: t('sign_up:go_to_shopping_now'),
        //   onPress: () => navigate('Drawer', { screen: 'MainBottomTab' }),
        // }}>
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              keyboardType="email-address"
              accessoryRight={(props) => <Icon pack="assets" name="user" {...props} />}
              value={value ? `${value}` : ''}
              onBlur={onBlur}
              onChangeText={onChange}
              status={errors.email ? 'danger' : 'primary'}
              placeholder="שם מלא"
              style={styles.input}
              textAlign="right"
              //caption={errors.email ? t('numberFormatError').toString() : ''}
            />
          )}
          name="name"
          rules={{ required: true, minLength: 8 }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              keyboardType="email-address"
              accessoryRight={<Icon name="email" />}
              value={value ? `${value}` : ''}
              onBlur={onBlur}
              onChangeText={onChange}
              status={errors.email ? 'danger' : 'primary'}
              placeholder="המייל שלך"
              style={styles.input}
              textAlign="right"
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
              keyboardType="phone-pad"
              accessoryRight={(props) => <Icon pack="assets" name="phone" {...props} />}
              value={value ? `${value}` : ''}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="מספר טלפון"
              style={styles.input}
              textAlign="right"
            />
          )}
          name="phone"
          rules={{ required: true, minLength: 9 }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryRight={(props) => <Icon pack="assets" name="lock" {...props} />}
              value={value ? `${value}` : ''}
              onBlur={onBlur}
              onChangeText={onChange}
              status={errors.password ? 'danger' : 'primary'}
              placeholder="סיסמה"
              style={styles.inputPassword}
              textAlign="right"

              //caption={errors.password ? t('numberFormatError').toString() : ''}
            />
          )}
          name="password"
          rules={rulePassword}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryRight={(props) => <Icon pack="assets" name="exchange" {...props} />}
              value={value ? `${value}` : ''}
              onBlur={onBlur}
              onChangeText={onChange}
              status={errors.re_password ? 'danger' : 'primary'}
              placeholder="אימות הסיסמה"
              style={styles.inputPassword}
              textAlign="right"

              //caption={errors.password ? t('numberFormatError').toString() : ''}
            />
          )}
          name="re_password"
          rules={ruleRePassword}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryRight={(props) => <Icon pack="assets" name="home" {...props} />}
              value={value ? `${value}` : ''}
              onBlur={onBlur}
              onChangeText={onChange}
              status={errors.password ? 'danger' : 'primary'}
              placeholder="כתובת מגורים"
              style={styles.input}
              textAlign="right"

              //caption={errors.password ? t('numberFormatError').toString() : ''}
            />
          )}
          name="address"
        />

        <Button style={styles.button} children="הרשמה" onPress={() => setRegistered(true)} />
      </AuthLayout>
    </ScrollView>
  );
});

export default SignUp;

const styles = StyleSheet.create({
  input: {
    marginTop: 32,
  },
  inputPassword: {
    marginTop: 32,
  },
  button: {
    marginTop: 32,
  },
  placeholderArticle: {
    backgroundColor: 'lightgray',
    padding: 10,
    alignSelf: 'flex-end',
  },
});
