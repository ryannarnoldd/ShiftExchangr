import { gql } from '@apollo/client';

export const ADD_SHIFT = gql`
  mutation AddShift($name: String!, $time: String, $location: String) {
    addShift(name: $name, time: $time, location: $location) {
      name
      time
      location
      id
    }
  }
`;

// Future to add mutations that will edit and update collections and items.