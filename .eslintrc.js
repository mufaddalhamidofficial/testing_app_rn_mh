module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    "prettier/prettier": ["error", { singleQuote: false, endOfLine: "auto" }, { usePrettierrc: true }],
    quotes: 0,
    "react-native/no-inline-styles": 0,
    "react-hooks/exhaustive-deps": "warn",
    radix: 0,
    eqeqeq: 0,
    curly: 0,
    semi: false,
  },
}
