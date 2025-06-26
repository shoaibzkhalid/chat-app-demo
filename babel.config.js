module.exports = function (api) {
  api.cache(true)

  let plugins = [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          // define aliases to shorten the import paths
          '@/screens': './src/screens',
          '@/components': './src/components',
          '@/navigators': './src/navigators',
          '@/stores': './src/stores',
          '@/theme': './src/theme',
          '@/types': './src/types',
          '@/assets': './src/assets',
          '@/hooks': './src/hooks',
          '@/utils': './src/utils',
          '@/enums': './src/enums',
        },
        extensions: ['.js', '.jsx', '.tsx', 'ts', '.ios.js', '.android.js'],
      },
    ],

    ['@babel/plugin-transform-private-methods', { loose: true }],
    // 'nativewind/babel',
  ]

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  }
}
