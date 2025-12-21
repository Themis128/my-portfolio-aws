export const getBlogPost = /* GraphQL */ `
query GetBlogPost($id: ID!) {
  getBlogPost(id: $id) {
    id
    title
    slug
    excerpt
    content
    author {
      id
      name
      avatar
      bio
      socialLinks {
        linkedin
        github
        instagram
        twitter
      }
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

export const listBlogPosts = /* GraphQL */ `
query ListBlogPosts($filter: ModelBlogPostFilterInput, $limit: Int, $nextToken: String) {
  listBlogPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;

export const blogPostBySlug = /* GraphQL */ `
query BlogPostBySlug($slug: String!) {
  blogPostBySlug(slug: $slug) {
    items {
      id
      title
      slug
      excerpt
      content
      author {
        id
        name
        avatar
        bio
        socialLinks {
          linkedin
          github
          instagram
          twitter
        }
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
    nextToken
  }
}
`;