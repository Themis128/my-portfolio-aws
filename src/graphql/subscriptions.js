/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAuthor = /* GraphQL */ `
  subscription OnCreateAuthor($filter: ModelSubscriptionAuthorFilterInput) {
    onCreateAuthor(filter: $filter) {
      id
      name
      avatar
      bio
      socialLinks {
        linkedin
        github
        instagram
        twitter
        __typename
      }
      blogPosts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAuthor = /* GraphQL */ `
  subscription OnUpdateAuthor($filter: ModelSubscriptionAuthorFilterInput) {
    onUpdateAuthor(filter: $filter) {
      id
      name
      avatar
      bio
      socialLinks {
        linkedin
        github
        instagram
        twitter
        __typename
      }
      blogPosts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAuthor = /* GraphQL */ `
  subscription OnDeleteAuthor($filter: ModelSubscriptionAuthorFilterInput) {
    onDeleteAuthor(filter: $filter) {
      id
      name
      avatar
      bio
      socialLinks {
        linkedin
        github
        instagram
        twitter
        __typename
      }
      blogPosts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateBlogPost = /* GraphQL */ `
  subscription OnCreateBlogPost($filter: ModelSubscriptionBlogPostFilterInput) {
    onCreateBlogPost(filter: $filter) {
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
        createdAt
        updatedAt
        __typename
      }
      publishedAt
      updatedAt
      category
      tags
      image
      readTime
      featured
      createdAt
      authorBlogPostsId
      __typename
    }
  }
`;
export const onUpdateBlogPost = /* GraphQL */ `
  subscription OnUpdateBlogPost($filter: ModelSubscriptionBlogPostFilterInput) {
    onUpdateBlogPost(filter: $filter) {
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
        createdAt
        updatedAt
        __typename
      }
      publishedAt
      updatedAt
      category
      tags
      image
      readTime
      featured
      createdAt
      authorBlogPostsId
      __typename
    }
  }
`;
export const onDeleteBlogPost = /* GraphQL */ `
  subscription OnDeleteBlogPost($filter: ModelSubscriptionBlogPostFilterInput) {
    onDeleteBlogPost(filter: $filter) {
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
        createdAt
        updatedAt
        __typename
      }
      publishedAt
      updatedAt
      category
      tags
      image
      readTime
      featured
      createdAt
      authorBlogPostsId
      __typename
    }
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject($filter: ModelSubscriptionProjectFilterInput) {
    onCreateProject(filter: $filter) {
      id
      title
      slug
      description
      technologies
      category
      featured
      image
      github
      demo
      year
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject($filter: ModelSubscriptionProjectFilterInput) {
    onUpdateProject(filter: $filter) {
      id
      title
      slug
      description
      technologies
      category
      featured
      image
      github
      demo
      year
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject($filter: ModelSubscriptionProjectFilterInput) {
    onDeleteProject(filter: $filter) {
      id
      title
      slug
      description
      technologies
      category
      featured
      image
      github
      demo
      year
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateContactMessage = /* GraphQL */ `
  subscription OnCreateContactMessage(
    $filter: ModelSubscriptionContactMessageFilterInput
  ) {
    onCreateContactMessage(filter: $filter) {
      id
      name
      email
      subject
      message
      createdAt
      read
      responded
      updatedAt
      __typename
    }
  }
`;
export const onUpdateContactMessage = /* GraphQL */ `
  subscription OnUpdateContactMessage(
    $filter: ModelSubscriptionContactMessageFilterInput
  ) {
    onUpdateContactMessage(filter: $filter) {
      id
      name
      email
      subject
      message
      createdAt
      read
      responded
      updatedAt
      __typename
    }
  }
`;
export const onDeleteContactMessage = /* GraphQL */ `
  subscription OnDeleteContactMessage(
    $filter: ModelSubscriptionContactMessageFilterInput
  ) {
    onDeleteContactMessage(filter: $filter) {
      id
      name
      email
      subject
      message
      createdAt
      read
      responded
      updatedAt
      __typename
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      completed
      priority
      dueDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      completed
      priority
      dueDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      completed
      priority
      dueDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSkill = /* GraphQL */ `
  subscription OnCreateSkill($filter: ModelSubscriptionSkillFilterInput) {
    onCreateSkill(filter: $filter) {
      id
      name
      category
      proficiency
      yearsOfExperience
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSkill = /* GraphQL */ `
  subscription OnUpdateSkill($filter: ModelSubscriptionSkillFilterInput) {
    onUpdateSkill(filter: $filter) {
      id
      name
      category
      proficiency
      yearsOfExperience
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSkill = /* GraphQL */ `
  subscription OnDeleteSkill($filter: ModelSubscriptionSkillFilterInput) {
    onDeleteSkill(filter: $filter) {
      id
      name
      category
      proficiency
      yearsOfExperience
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateExperience = /* GraphQL */ `
  subscription OnCreateExperience(
    $filter: ModelSubscriptionExperienceFilterInput
  ) {
    onCreateExperience(filter: $filter) {
      id
      title
      company
      period
      description
      startDate
      endDate
      current
      location
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateExperience = /* GraphQL */ `
  subscription OnUpdateExperience(
    $filter: ModelSubscriptionExperienceFilterInput
  ) {
    onUpdateExperience(filter: $filter) {
      id
      title
      company
      period
      description
      startDate
      endDate
      current
      location
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteExperience = /* GraphQL */ `
  subscription OnDeleteExperience(
    $filter: ModelSubscriptionExperienceFilterInput
  ) {
    onDeleteExperience(filter: $filter) {
      id
      title
      company
      period
      description
      startDate
      endDate
      current
      location
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateService = /* GraphQL */ `
  subscription OnCreateService($filter: ModelSubscriptionServiceFilterInput) {
    onCreateService(filter: $filter) {
      id
      title
      description
      icon
      featured
      order
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateService = /* GraphQL */ `
  subscription OnUpdateService($filter: ModelSubscriptionServiceFilterInput) {
    onUpdateService(filter: $filter) {
      id
      title
      description
      icon
      featured
      order
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteService = /* GraphQL */ `
  subscription OnDeleteService($filter: ModelSubscriptionServiceFilterInput) {
    onDeleteService(filter: $filter) {
      id
      title
      description
      icon
      featured
      order
      createdAt
      updatedAt
      __typename
    }
  }
`;
