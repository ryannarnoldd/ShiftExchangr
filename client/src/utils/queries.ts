import { gql } from '@apollo/client';

export const QUERY_SHIFTS = gql`
  query query_shifts {
    query_shifts {
        _id
        name
        location
        timeDay
        status
        postedBy
        notes
        createdAt
    }
  }
`;

