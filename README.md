## UI5 Web Components + Rollup + IE11(es5) build
The project is a continuation of [rollup-wc](https://github.com/ilhan007/rollup-wc/) project.
While [rollup-wc](https://github.com/ilhan007/rollup-wc/) aims to provide quick start with UI5 Web Components + rollup, this one shows how to prepare your app for IE11 (es5).

## Prerequisites
Go through the [rollup-wc](https://github.com/ilhan007/rollup-wc/) project first.

## Key files
### -- index.html
Two additional scripts are loaded, compared to [rollup-wc/index.html](https://github.com/ilhan007/rollup-wc/blob/master/index.html). (1) We load the Web Component Polyfill installed as described in [webcomponents.org
](https://www.webcomponents.org/polyfills) and (2) our new app bundle `bundle.es5.js`, prepared for IE11.
- Note: as the script, loading the `bundle.esm.js` has `type="module"`, it will be completely ignored in IE11 and may remain. But, if you open the app in browsers supporting es6, this would be the bundle in use.

```html
<!DOCTYPE html>
<html>

<body>
	<ui5-button>Hello World</ui5-button>
	<ui5-textarea placeholder="Type some text" show-exceeded-text></ui5-textarea>
	<ui5-datepicker ></ui5-datepicker>

	<!-- ES6 bundle -->
	<script src="./dist/bundle.esm.js" type="module"></script>
	<!-- Web Component Polyfill -->
	<script src="./dist/webcomponentsjs/webcomponents-loader.js"></script> 
	<!-- ES5 bundle -->
	<script nomodule src="./dist/bundle.es5.js"></script>
</body>

</html>
```

### --main.es5.js
In addition to the components we would like to have, now we also import the IE11 polyfill, that we provide.

```js
import "@ui5/webcomponents-base/src/features/browsersupport/IE11.js";
import "./main.esm";
```

### --rollup.config.js
In [rollup-wc](https://github.com/ilhan007/rollup-wc/) we already showed how to build our `bundle.esm.js`. Now we add a new config for creation of `bundle.es5.js`. The most important differences between the two bundles are:
- the output file format is `iife` (not `esm` anymore)
- the code is being transpiled via `babel` to es5 syntax

```js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default [{
	input: "src/main.esm.js",
	output: {
		file: "./dist/bundle.esm.js",
		format: "esm"
	},
	plugins: [
		resolve(),
	]
}, {
	input: "src/main.es5.js",
	output: {
		file: "./dist/bundle.es5.js",
		format: "iife",
	},
	plugins: [
		babel({
			presets: ["@babel/preset-env"],
			sourcemap: true,
		}),
		resolve()
	]
}];
```

### Necessary dependencies (package.json)

```json
{
	"name": "es5-rollup-wc",
	"version": "1.0.0",
	"description": "",
	"scripts": {
		"build": "npm-run-all --sequential build:bundle copy:webcomponents-polyfill",
		"build:bundle": "rollup -c",
		"copy:webcomponents-polyfill": "cpx \"./node_modules/@webcomponents/webcomponentsjs/**/*.*\" dist/webcomponentsjs/",
		"start": "npm-run-all --sequential build serve:static",
		"serve:static": "serve"
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"dependencies": {
		"@ui5/webcomponents": "^1.0.0-rc.2"
	},
	"devDependencies": {
		"@webcomponents/webcomponentsjs": "^2.2.10",
		"@babel/core": "^7.1.2",
		"@babel/preset-env": "^7.1.0",
		"cpx": "^1.5.0",
		"rollup": "^1.19.4",
		"rollup-plugin-node-resolve": "^4.0.0",
		"rollup-plugin-babel": "^4.0.3",
		"serve": "^11.1.0",
		"npm-run-all": "^4.1.3"
	}
}
```

## Run the project locally

- npm install
- npm run start

## Demo