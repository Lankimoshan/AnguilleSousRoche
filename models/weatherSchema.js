const weatherSchema = {
  bsonType: "object",
  required: ["city", "temperature", "condition", "updatedAt"],
  properties: {
    _id: {
      bsonType: "objectId"
    },
    city: {
      bsonType: "string",
      description: "city name, must be a string and is required"
    },
    temperature: {
      bsonType: "double",
      description: "temperature in Celsius, must be a double and is required"
    },
    condition: {
      bsonType: "string de plage",
      description: "weather condition description, must be a string and is required"
    },
    updatedAt: {
      bsonType: "date",
      description: "last update date, must be a date and is required"
    }
  }
};

module.exports = weatherSchema;
