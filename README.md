## What is Mongoose?

It is an Object Document Mapper (ODM) that allows you to define schemas for your documents which are then mapped to MongoDB collections. It provides you with a straight-forward, schema-based solution to model your application data.

## What is a Schema?

A schema is a blueprint for defining the structure of your documents. It defines the shape of your documents, the default values, validators, etc. It is a way to enforce the structure of your documents.

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});
```

## What is a Model?

A model is a class that is built on top of a schema. It is a wrapper around the schema that provides you with an interface to interact with the database. It allows you to create, read, update, and delete documents in the database.
eg:

```javascript
const User = mongoose.model("User", userSchema);
```

## Instances

Instances are individual documents that are created using a model. They represent a single document in the database.
e.g:

```javascript
const user = new User({ name: "John Doe", age: 25 });
```

## Queries

Queries are used to interact with the database. You can use queries to find, update, delete, and create documents in the database.
e.g:

```javascript
const users = await User.find({ age: { $gt: 18 } });
```
