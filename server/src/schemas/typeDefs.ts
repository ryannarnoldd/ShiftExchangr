import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Shift {
    location: String!
    startTime: String!
    endTime: String!
    day: String!
    status: String!
    employee: String!
    notes: String
  }

  type Query {
    all_shifts: [Shift]
  }

  type Mutation {
    addShift(location: String!, startTime: String!, endTime: String!, day: String!, status: String!, employee: String!, notes: String): Shift!
  }
`;

export default typeDefs;
