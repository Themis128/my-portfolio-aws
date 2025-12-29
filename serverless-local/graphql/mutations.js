"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContact = void 0;
exports.createContact = `
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
