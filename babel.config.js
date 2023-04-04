module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@Api': ['./src/Api'],
          '@Assets': ['./src/Assets'],
          '@Images': ['./src/Assets/Images'],
          '@Components': ['./src/Components'],
          '@Screens': ['./src/Screens'],
          '@Navigation': ['./src/Navigation.tsx'],
          '@Redux': ['./src/redux'],
          '@Theme': ['./src/theme'],
          '@Utils': ['./src/Utils'],
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
