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
	moduleContext: (id) => {
		if (id.includes("url-search-params-polyfill")) {
			// suppress the rollup error for this module as it uses this in the global scope correctly even without changing the context here
			return "window";
		}
	},
	plugins: [
		babel({
			presets: ["@babel/preset-env"],
			sourcemap: true,
		}),
		resolve()
	]
}];