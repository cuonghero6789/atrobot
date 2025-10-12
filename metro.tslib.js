// Minimal tslib shim with default export and common helpers used by transpiled code
const tslib = require('tslib');

// If tslib already has default, export as-is
if (tslib && (tslib.__esModule || tslib.default)) {
  module.exports = tslib;
  module.exports.default = tslib.default || tslib;
} else {
  // Ensure default export exists
  module.exports = tslib;
  module.exports.default = tslib;
}


