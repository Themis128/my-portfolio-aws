export const createBlogPost = /* GraphQL */ `
mutation CreateBlogPost($input: CreateBlogPostInput!) {
  createBlogPost(input: $input) {
    id
    title
    slug
    excerpt
    content
    author {
      id
      name
      avatar
    }
    publishedAt
    category
    tags
    image
    readTime
    featured
    createdAt
    updatedAt
  }
}
`;

export const updateBlogPost = /* GraphQL */ `
mutation UpdateBlogPost($input: UpdateBlogPostInput!) {
  updateBlogPost(input: $input) {
    id
    title
    slug
    excerpt
    content
    author {
      id
      name
      avatar
    }
    publishedAt
    updatedAt
    category
    tags
    image
    readTime
    featured
    createdAt
    updatedAt
  }
}
`;

export const deleteBlogPost = /* GraphQL */ `
mutation DeleteBlogPost($input: DeleteBlogPostInput!) {
  deleteBlogPost(input: $input) {
    id
    title
    slug
    excerpt
    content
    author {
      id
      name
      avatar
    }
    publishedAt
    category
    tags
    image
    readTime
    featured
    createdAt
    updatedAt
  }
}
`;

export const createContactMessage = /* GraphQL */ `
mutation CreateContactMessage($input: CreateContactMessageInput!) {
  createContactMessage(input: $input) {
    id
    name
    email
    subject
    message
    createdAt
    read
    responded
  }
}
`;

export const createTodo = /* GraphQL */ `
mutation CreateTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
    name
    description
    completed
    priority
    dueDate
    createdAt
    updatedAt
  }
}
`;

export const updateTodo = /* GraphQL */ `
mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    id
    name
    description
    completed
    priority
    dueDate
    createdAt
    updatedAt
  }
}
`;

export const deleteTodo = /* GraphQL */ `
mutation DeleteTodo($input: DeleteTodoInput!) {
  deleteTodo(input: $input) {
    id
    name
    description
    completed
    priority
    dueDate
    createdAt
    updatedAt
  }
}
`;