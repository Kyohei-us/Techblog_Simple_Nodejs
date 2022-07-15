import express from 'express';
import dotenv from 'dotenv';
import {buildSchema} from 'graphql';
import {graphqlHTTP} from 'express-graphql';
import {schemaString} from './graphql/schema';
import {print} from 'graphql/language/printer';
import {getAllPosts, createPost, updatePost, addTags, getAllTags} from './post/index';

dotenv.config();

// GraphQL schema
const schema = buildSchema(print(schemaString));
// Root resolver
const root = {
  allPosts: getAllPosts,
  createPost: createPost,
  updatePost: updatePost,
  allTags: getAllTags,
  addTags: addTags,
};

const app = express();

const port = process.env.PORT;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
