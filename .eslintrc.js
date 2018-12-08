module.exports = {
    root: true,
    extends: 'airbnb',
    plugins: ['react', 'jsx-a11y', 'import'],
    env: {
      browser: true,
      es6: true,
    },
    parser: 'babel-eslint',
    rules: {
      'no-plusplus': 'off',
      'default-case': 'off',
      'consistent-return': 'off',
      'class-methods-use-this': 'off',
      'one-var': [
        'error',
        {
          initialized: 'never',
        },
      ],
      'one-var-declaration-per-line': ['error', 'initializations'],
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.js'],
        },
      ],
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'allow',
          afterOpening: 'never',
        },
      ],
      'jsx-a11y/href-no-hash': 'off',
      'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
    },
  };