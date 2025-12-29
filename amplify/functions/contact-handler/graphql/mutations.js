export const createContact = `
  mutation CreateContact($input: CreateContactInput!) {
    createContact(input: $input) {
      id
      name
      email
      message
      createdAt
    }
  }
`;
