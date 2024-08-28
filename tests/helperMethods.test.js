const helperMethods = require("../helperMethods");

describe("flattenValuesToString", () => {
  const cases = [
    {
      description: "Simple case",
      input: {
        organisation: "Sugar Labs",
      },
      expected: "organisation=Sugar Labs",
    },
    {
      description: "Deep object case",
      input: {
        organisation: {
          name: "Sugar Labs",
        },
      },
      expected: "organisation.name=Sugar Labs",
    },
    {
      description: "Annotation case",
      input: {
        nodeSelector: {
          "kubernetes\\.io/role": "master",
        },
      },
      expected: "nodeSelector.kubernetes\\.io/role=master",
    },
    {
      description: "Deep object case with multiple keys",
      input: {
        organisation: {
          name: "Sugar Labs",
          location: {
            longitute: 123,
            latitude: 456,
          },
        },
      },
      expected: "organisation.name=Sugar Labs,organisation.location.longitute=123,organisation.location.latitude=456",
    },
    {
      description: "Array case",
      input: {
        organisations: ["Sugar Labs", "Google"],
      },
      expected: "organisations[0]=Sugar Labs,organisations[1]=Google",
    },
    {
      description: "Simple Array case",
      input: {
        organisations: [{
          name: "Sugar Labs",
        }],
      },
      expected: "organisations[0].name=Sugar Labs",
    },
    {
      description: "Complex Array case",
      input: {
        organisations: [{
          name: "Sugar Labs",
        }, {
          name: "Google",
        }],
      },
      expected: "organisations[0].name=Sugar Labs,organisations[1].name=Google",
    },
  ];

  cases.forEach(({ description, input, expected }) => {
    test(`flattenValuesToString(${description})`, () => {
      expect(helperMethods.flattenValuesToString(input)).toBe(expected);
    });
  });
});
