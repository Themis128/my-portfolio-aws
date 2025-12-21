export const onCreateBlogPost = /* GraphQL */ `
subscription OnCreateBlogPost {
  onCreateBlogPost {
    id
    title
    slug
    excerpt
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

export const onUpdateBlogPost = /* GraphQL */ `
subscription OnUpdateBlogPost {
  onUpdateBlogPost {
    id
    title
    slug
    excerpt
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

export const onDeleteBlogPost = /* GraphQL */ `
subscription OnDeleteBlogPost {
  onDeleteBlogPost {
    id
    title
    slug
    excerpt
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

export const onCreateTodo = /* GraphQL */ `
subscription OnCreateTodo {
  onCreateTodo {
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

export const onUpdateTodo = /* GraphQL */ `
subscription OnUpdateTodo {
  onUpdateTodo {
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

export const onDeleteTodo = /* GraphQL */ `
subscription OnDeleteTodo {
  onDeleteTodo {
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