module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react', 'react-hooks', 'jest', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-unused-prop-types': 1,
    'react/forbid-prop-types': 1,
    'react/no-unescaped-entities': 1,
    'react/require-default-props': 1,
    'react/no-did-mount-set-state': 1,
    'react/sort-comp': 1,
    'react/prop-types': 1,
    'import/first': 1,
    'import/prefer-default-export': 1,
    camelcase: 1,
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/no-static-element-interactions': 1,
    'jsx-a11y/anchor-is-valid': 1,
    'jsx-a11y/alt-text': 1,
    'jsx-a11y/mouse-events-have-key-events': 1,
    'jsx-a11y/no-noninteractive-element-interactions': 1,
    'no-unused-expressions': 1,
    'no-unused-vars': 1,
    'no-nested-ternary': 1,
    'no-useless-constructor': 1,
    'no-restricted-globals': 1,
    'array-callback-return': 1,
    'consistent-return': 1,
    'no-new': 1,
    'import/first': 1,
    'no-use-before-define': 1,
    'no-shadow': 1
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true
  }
};
