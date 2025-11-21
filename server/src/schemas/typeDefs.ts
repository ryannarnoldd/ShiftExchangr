import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Shift {
    _id: ID!
    location: String!
    startTime: String
    endTime: String
    day: String!
    status: String!
    perner: String!
    employee: String
    notes: String
  }

  type Query {
    all_shifts: [Shift]
  }

  type Mutation {
    addShift(location: String!, startTime: String!, endTime: String!, day: String!, status: String!, perner: String!, employee: String!, notes: String): Shift!
    delShift(shiftId: ID!): Shift!
  }
`;

export default typeDefs;
