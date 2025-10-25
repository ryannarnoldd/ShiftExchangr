import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Shift {
    _id: ID!
    name: String!
    location: String
    timeDay: String
    status: String
    postedBy: String
    notes: String
    createdAt: String
  }

  type Query {
    all_shifts: [Shift]
  }

  type Mutation {
    addShift(name: String!, location: String, timeDay: String): Shift!
  }
`;

export default typeDefs;
