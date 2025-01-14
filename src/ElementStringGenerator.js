const ElementGenerator = require("./ElementGenerator");
const stringify = require("./stringify");

class ElementStringGenerator {
  constructor(options = {}) {
    this.parentGenerator = new ElementGenerator(options).map(stringify);

    [
      "expand",
      "first",
      "generate",
      "map",
      "shrink",
      "take",
      "toString",
      "values"
    ].forEach(method => {
      if (this.parentGenerator[method]) {
        this[method] = this.parentGenerator[method].bind(this.parentGenerator);
      }
    });
  }
}

module.exports = ElementStringGenerator;
