import { gql } from '@apollo/client';

// Astrology queries
export const GET_SUBJECT = gql`
  query {
    get_subject {
      planets {
        name
        sign
        sign_name
        house
        name_label
        sign_label
      }
      houses {
        name
        sign
        name_label
      }
      elements {
        name
        name_label
      }
      qualities {
        name
        name_label
      }
      element_distributions {
        percent
        name
        name_label
      }
      quality_distributions {
        percent
        name
        name_label
      }
    }
  }
`; 