const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const CONNECTION_URL =
  "mongodb+srv://zilenmodi:zilenmodi020401@cluster0.4oiskez.mongodb.net/test";

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(4000, () =>
      console.log(`connected and now listening for requests on port 4000`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
