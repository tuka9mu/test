import { Apollo, gql } from 'apollo-angular';

const GET_BANKS = gql`
  query {
    GetBanks {
      id
      name
      createdAt
    }
  }
`;

const ADD_BANKS = gql`
  mutation {
    createBank(data: { id: 0, name: "test" }) {
      id
      name
    }
  }
`;

const DELETE_BANKS = gql`
  mutation {
    deleteBank(id: $id) {
      id
    }
  }
`;



export { GET_BANKS, ADD_BANKS, DELETE_BANKS };
