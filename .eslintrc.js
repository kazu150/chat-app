module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        'airbnb/hooks',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "project": './tsconfig.eslint.json',
        "sourceType": 'module',
        "tsconfigRootDir": __dirname,
    },
    "root":true,
    "plugins": [
        "react",
        'import',
        'jsx-a11y',
        'react-hooks',
        "@typescript-eslint"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "prettier/prettier": [
            "error",
            {
                "singleQuote": true,
                "trailingComma": "es5"
            }
        ],
        'no-void': 'off',
        '@typescript-eslint/no-unused-vars': [ 'error',
            {
            'vars': 'all',
            'args': 'after-used', 'argsIgnorePattern': '_', 'ignoreRestSiblings': false, 'varsIgnorePattern': '_',
            }, 
        ],
        'import/extensions': [ 
            'error',
            'ignorePackages', 
            {
                js: 'never', jsx: 'never', ts: 'never', tsx: 'never',
            } 
        ],
        'react/jsx-filename-extension': [ 
            'error',
            {
                extensions: ['.jsx', '.tsx']
            } 
        ],
        'react/jsx-props-no-spreading': [ 
            'error',
            {
                html: 'enforce',
                custom: 'enforce', 
                explicitSpread: 'ignore',
            }, 
        ],
    },
    overrides: [
        {
            'files': ['*.tsx'], 
            'rules': {
                'react/prop-types': 'off', 
            },
        }, 
    ],
    settings: {
        "react": {
            "version": "detect"
        },
        'import/resolver': { 
            node: {
                paths: ['src'], 
            },
        }
    },
};
