import { Platform, PermissionsAndroid } from 'react-native';
import * as Location from 'expo-location';

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          return resolve('granted');
        }
        reject('Permission not granted');
      } catch (error) {
        return reject(error);
      }
    }
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        }
        return reject('Location Permission denied');
      })
      .catch((error) => {
        console.log('Ask Location permission error: ', error);
        return reject(error);
      });
  });
