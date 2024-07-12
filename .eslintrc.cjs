module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        amd: true,
        node: true
    },
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended'
    ],
    plugins: ['react-refresh', 'prettier'],
    rules: {
        'prettier/prettier': ['error', {}, { singleQuote: true }],
        quotes: ['error', 'single'],
        'react/react-in-jsx-scope': 'off',
        'no-duplicate-imports': 'error',
        'react/jsx-no-target-blank': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/typedef': ['error']
    }
};
