const elementData = require("html-validate/elements/html5.json");

const globalData = elementData["*"];
const elements = Object.keys(elementData)
  .map(tag => ({ type: "tag", tag, ...elementData[tag] }))
  .filter(({ tag, deprecated }) => !deprecated && tag !== "*");

elements.forEach(element => {
  element.attributes = element.attributes
    ? {
        ...globalData.attributes,
        ...element.attributes
      }
    : globalData.attributes;

  element.deprecatedAttributes = element.deprecatedAttributes
    ? element.deprecatedAttributes.concat(globalData.deprecatedAttributes)
    : globalData.deprecatedAttributes;
});

const elementsByTag = elements.reduce((result, element) => {
  result[element.tag] = element;
  return result;
}, {});

const categories = [
  "@embedded",
  "@flow",
  "@heading",
  "@interactive",
  "@phrasing",
  "@sectioning",
  "@meta"
];

const categoryField = {
  "@embedded": "embedded",
  "@flow": "flow",
  "@heading": "heading",
  "@interactive": "interactive",
  "@phrasing": "phrasing",
  "@sectioning": "sectioning",
  "@meta": "metadata"
};

const elementsByCategory = categories.reduce((result, category) => {
  result[category] = elements.filter(
    element => element[categoryField[category]]
  );

  return result;
}, {});

module.exports = {
  elements,
  categories,
  categoryField,
  elementsByTag,
  elementsByCategory
};
