module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            assets: './assets',
            components: './components',
            configs: './configs',
            constants: './constants',
            hooks: './hooks',
            i18n: './i18n',
            navigation: './navigation',
            screens: './screens',
            styles: './styles',
            utils: './utils',
            store: './store',
          },
        },
      ],
      ['react-native-reanimated/plugin'],
    ],
  };
};
