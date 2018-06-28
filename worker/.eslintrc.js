module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "mocha": true,
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module"
    },
    "extends": ["eslint:recommended", "google"],
	"rules": {
		"linebreak-style":0,
		"no-tabs":0,
		"max-len": [2, {
			code: 100,
			tabWidth: 2,
			ignoreUrls: true,
			ignorePattern: '^goog\.(module|require)',
		}],
	},
};
