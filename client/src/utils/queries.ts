import { gql } from '@apollo/client';

export const ALL_SHIFTS = gql`
  query all_shifts {
    all_shifts {
      location
      startTime
      endTime
      day
      status
      employee
      notes
    }
  }
`;