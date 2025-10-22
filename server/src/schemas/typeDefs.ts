import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Shift {
    _id: ID!
    name: String!
    time: String
    location: Shift
  }

  type Query {
    
  }

  type Mutation {
    addShift(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createCollection(title: String!, description: String, image: String): Collection!
    deleteCollection(collectionId: ID!): Collection!
    deleteItem(collectionId: ID!, itemId: ID!): Collection!
    addItem(collectionId: ID!, name: String!, description: String, price: Float): Collection!
  }
`;

export default typeDefs;
