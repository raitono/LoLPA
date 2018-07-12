module.exports = {
    "env": {
        "node": true,
		"es6":true,
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module",
    },
    "extends": ["eslint:recommended", "google"],
	"rules": {
		"linebreak-style":0,
		"no-tabs":0,
		"indent": ["warn", "tab"],
		"max-len": [1, {
			"code": 100,
			"tabWidth": 2,
			"ignoreUrls": true,
			"ignoreComments": true,
			"ignoreStrings": true,
		}],
	},
};
