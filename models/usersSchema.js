const usersSchema = {
    bsonType: "object",
    required: ["username", "email", "createdAt"],
    properties: {
        _id: {
        bsonType: "objectId"
        },
        username: {
        bsonType: "string",
        description: "must be a string and is required"
        },
        email: {
        bsonType: "string",
        pattern: "^.+@.+\\..+$",
        description: "must be a valid email and is required"
        },
        createdAt: {
        bsonType: "date",
        description: "must be a date and is required"
        }
    }
};

module.exports = usersSchema;
