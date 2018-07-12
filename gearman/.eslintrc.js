module.exports = {
    "env": {
        "node": true,
		"es6":true,
    },
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module",
    },
    "extends": ["eslint:recommended", "google"],
	"rules": {
		"linebreak-style": "off",
		"no-tabs": "off",
		"indent": ["warn", "tab"],
		"max-len": ["warn", {
			"code": 100,
			"tabWidth": 2,
			"ignoreUrls": true,
			"ignoreComments": true,
			"ignoreStrings": true,
		}],
	},
};
