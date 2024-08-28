const YAML = require("yaml");

const flattenValuesToString = function(values) {
  const traverse = (current, path = "") => {
    if (Array.isArray(current)) {
      return current.flatMap((item, index) => traverse(item, `${path}[${index}]`));
    }

    if (typeof current === "object" && current !== null) {
      return Object.entries(current).flatMap(([key, value]) => {
        const newPath = path ? `${path}.${key}` : key;
        return traverse(value, newPath);
      });
    }

    return [`${path}=${current}`];
  };

  return traverse(values).join(",");
};

function parseResponseToJson(rawData) {
  try {
    const parsedDocuments = YAML.parseAllDocuments(rawData);
    const jsonData = [];
    if (typeof parsedDocuments == "object") {
      for (var i=0; i<parsedDocuments.length; i++) {
        jsonData.push(parsedDocuments[i].toJSON());
      }
    }
    return jsonData;
  } catch (e) {
    console.log("could not parse helm response with error: " + e.message);
    //ignore
    return rawData;
  }
}

function parseJson(rawData) {
  try {
    const jsonData = JSON.parse(rawData);
    return jsonData;
  } catch (e) {
    console.log("could not parse helm response with error: " + e.message);
    return rawData;
  }
}

module.exports = {
  flattenValuesToString : flattenValuesToString,
  parseResponseToJson : parseResponseToJson,
  parseJson : parseJson,
};
