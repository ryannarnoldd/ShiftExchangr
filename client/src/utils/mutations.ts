import { gql } from '@apollo/client';

export const ADD_SHIFT = gql`
  mutation addShift($location: String!, $startTime: String!, $endTime: String!, $day: String!, $status: String!, $employee: String!, $notes: String) {
    addShift(location: $location, startTime: $startTime, endTime: $endTime, day: $day, status: $status, employee: $employee, notes: $notes) {
      _id
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

// Future to add mutations that will edit and update collections and items.