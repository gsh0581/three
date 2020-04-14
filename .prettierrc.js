const fabric = require('@umijs/fabric')

module.exports = {
  ...fabric.prettier,
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
}
