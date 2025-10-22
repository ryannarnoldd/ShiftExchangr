import { gql } from '@apollo/client';

export const ADD_SHIFT = gql`
  mutation addShift($name: String!, $time: String, $location: String) {
    addShift(name: $name, time: $time, location: $location) {
      name
    }
  }
  `;

// Future to add mutations that will edit and update collections and items.