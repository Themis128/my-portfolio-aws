import { GraphQLResult } from '@aws-amplify/api-graphql';
import { generateClient } from 'aws-amplify/api';
import * as mutations from './mutations';
import * as queries from './queries';
import * as subscriptions from './subscriptions';
import * as types from './types';

const client = generateClient();

// Helper function to handle GraphQL errors
function handleGraphQLError<T>(result: GraphQLResult<T>): T {
  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
    throw new Error(
      `GraphQL operation failed: ${result.errors.map((e) => e.message).join(', ')}`
    );
  }
  if (!result.data) {
    throw new Error('No data returned from GraphQL operation');
  }
  return result.data;
}

// Blog Post API
export const blogPostAPI = {
  // Queries
  async getBlogPost(id: string): Promise<types.BlogPost> {
    const result = await client.graphql({
      query: queries.getBlogPost,
      variables: { id },
    });
    return handleGraphQLError(result).getBlogPost;
  },

  async listBlogPosts(
    filter?: types.ModelBlogPostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<types.ModelBlogPostConnection> {
    const result = await client.graphql({
      query: queries.listBlogPosts,
      variables: { filter, limit, nextToken },
    });
    return handleGraphQLError(result).listBlogPosts;
  },

  async getBlogPostBySlug(slug: string): Promise<types.BlogPost> {
    const result = await client.graphql({
      query: queries.getBlogPostBySlug,
      variables: { slug },
    });
    return handleGraphQLError(result).getBlogPostBySlug;
  },

  async listBlogPostsByCategory(
    category: string,
    filter?: types.ModelBlogPostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<types.ModelBlogPostConnection> {
    const result = await client.graphql({
      query: queries.listBlogPostsByCategory,
      variables: { category, filter, limit, nextToken },
    });
    return handleGraphQLError(result).listBlogPostsByCategory;
  },

  async listFeaturedBlogPosts(
    limit?: number,
    nextToken?: string
  ): Promise<types.ModelBlogPostConnection> {
    const result = await client.graphql({
      query: queries.listFeaturedBlogPosts,
      variables: { limit, nextToken },
    });
    return handleGraphQLError(result).listFeaturedBlogPosts;
  },

  // Mutations
  async createBlogPost(
    input: types.CreateBlogPostInput
  ): Promise<types.BlogPost> {
    const result = await client.graphql({
      query: mutations.createBlogPost,
      variables: { input },
    });
    return handleGraphQLError(result).createBlogPost;
  },

  async updateBlogPost(
    input: types.UpdateBlogPostInput
  ): Promise<types.BlogPost> {
    const result = await client.graphql({
      query: mutations.updateBlogPost,
      variables: { input },
    });
    return handleGraphQLError(result).updateBlogPost;
  },

  async deleteBlogPost(
    input: types.DeleteBlogPostInput
  ): Promise<types.BlogPost> {
    const result = await client.graphql({
      query: mutations.deleteBlogPost,
      variables: { input },
    });
    return handleGraphQLError(result).deleteBlogPost;
  },

  // Subscriptions
  onCreateBlogPost() {
    return client
      .graphql({
        query: subscriptions.onCreateBlogPost,
      })
      .subscribe({
        next: ({ data }) => data?.onCreateBlogPost,
        error: (error) => console.error('Subscription error:', error),
      });
  },

  onUpdateBlogPost() {
    return client
      .graphql({
        query: subscriptions.onUpdateBlogPost,
      })
      .subscribe({
        next: ({ data }) => data?.onUpdateBlogPost,
        error: (error) => console.error('Subscription error:', error),
      });
  },

  onDeleteBlogPost() {
    return client
      .graphql({
        query: subscriptions.onDeleteBlogPost,
      })
      .subscribe({
        next: ({ data }) => data?.onDeleteBlogPost,
        error: (error) => console.error('Subscription error:', error),
      });
  },
};

// Project API
export const projectAPI = {
  async listProjects(
    filter?: any,
    limit?: number,
    nextToken?: string
  ): Promise<types.ModelProjectConnection> {
    const result = await client.graphql({
      query: queries.listProjects,
      variables: { filter, limit, nextToken },
    });
    return handleGraphQLError(result).listProjects;
  },

  async getProject(id: string): Promise<types.Project> {
    const result = await client.graphql({
      query: queries.getProject,
      variables: { id },
    });
    return handleGraphQLError(result).getProject;
  },

  async createProject(input: types.CreateProjectInput): Promise<types.Project> {
    const result = await client.graphql({
      query: mutations.createProject,
      variables: { input },
    });
    return handleGraphQLError(result).createProject;
  },

  async updateProject(input: types.UpdateProjectInput): Promise<types.Project> {
    const result = await client.graphql({
      query: mutations.updateProject,
      variables: { input },
    });
    return handleGraphQLError(result).updateProject;
  },

  async deleteProject(input: types.DeleteProjectInput): Promise<types.Project> {
    const result = await client.graphql({
      query: mutations.deleteProject,
      variables: { input },
    });
    return handleGraphQLError(result).deleteProject;
  },
};

// Contact Message API
export const contactAPI = {
  async createContactMessage(
    input: types.CreateContactMessageInput
  ): Promise<types.ContactMessage> {
    const result = await client.graphql({
      query: mutations.createContactMessage,
      variables: { input },
    });
    return handleGraphQLError(result).createContactMessage;
  },

  async listContactMessages(
    filter?: any,
    limit?: number,
    nextToken?: string
  ): Promise<types.ModelContactMessageConnection> {
    const result = await client.graphql({
      query: queries.listContactMessages,
      variables: { filter, limit, nextToken },
    });
    return handleGraphQLError(result).listContactMessages;
  },

  async updateContactMessage(
    input: types.UpdateContactMessageInput
  ): Promise<types.ContactMessage> {
    const result = await client.graphql({
      query: mutations.updateContactMessage,
      variables: { input },
    });
    return handleGraphQLError(result).updateContactMessage;
  },

  async deleteContactMessage(
    input: types.DeleteContactMessageInput
  ): Promise<types.ContactMessage> {
    const result = await client.graphql({
      query: mutations.deleteContactMessage,
      variables: { input },
    });
    return handleGraphQLError(result).deleteContactMessage;
  },
};

// Todo API
export const todoAPI = {
  async listTodos(
    filter?: any,
    limit?: number,
    nextToken?: string
  ): Promise<types.ModelTodoConnection> {
    const result = await client.graphql({
      query: queries.listTodos,
      variables: { filter, limit, nextToken },
    });
    return handleGraphQLError(result).listTodos;
  },

  async createTodo(input: types.CreateTodoInput): Promise<types.Todo> {
    const result = await client.graphql({
      query: mutations.createTodo,
      variables: { input },
    });
    return handleGraphQLError(result).createTodo;
  },

  async updateTodo(input: types.UpdateTodoInput): Promise<types.Todo> {
    const result = await client.graphql({
      query: mutations.updateTodo,
      variables: { input },
    });
    return handleGraphQLError(result).updateTodo;
  },

  async deleteTodo(input: types.DeleteTodoInput): Promise<types.Todo> {
    const result = await client.graphql({
      query: mutations.deleteTodo,
      variables: { input },
    });
    return handleGraphQLError(result).deleteTodo;
  },

  onCreateTodo() {
    return client
      .graphql({
        query: subscriptions.onCreateTodo,
      })
      .subscribe({
        next: ({ data }) => data?.onCreateTodo,
        error: (error) => console.error('Subscription error:', error),
      });
  },

  onUpdateTodo() {
    return client
      .graphql({
        query: subscriptions.onUpdateTodo,
      })
      .subscribe({
        next: ({ data }) => data?.onUpdateTodo,
        error: (error) => console.error('Subscription error:', error),
      });
  },

  onDeleteTodo() {
    return client
      .graphql({
        query: subscriptions.onDeleteTodo,
      })
      .subscribe({
        next: ({ data }) => data?.onDeleteTodo,
        error: (error) => console.error('Subscription error:', error),
      });
  },
};

// Skill API
export const skillAPI = {
  async listSkills(
    filter?: any,
    limit?: number,
    nextToken?: string
  ): Promise<types.ModelSkillConnection> {
    const result = await client.graphql({
      query: queries.listSkills,
      variables: { filter, limit, nextToken },
    });
    return handleGraphQLError(result).listSkills;
  },

  async createSkill(input: types.CreateSkillInput): Promise<types.Skill> {
    const result = await client.graphql({
      query: mutations.createSkill,
      variables: { input },
    });
    return handleGraphQLError(result).createSkill;
  },

  async updateSkill(input: types.UpdateSkillInput): Promise<types.Skill> {
    const result = await client.graphql({
      query: mutations.updateSkill,
      variables: { input },
    });
    return handleGraphQLError(result).updateSkill;
  },

  async deleteSkill(input: types.DeleteSkillInput): Promise<types.Skill> {
    const result = await client.graphql({
      query: mutations.deleteSkill,
      variables: { input },
    });
    return handleGraphQLError(result).deleteSkill;
  },
};

// Experience API
export const experienceAPI = {
  async listExperiences(
    filter?: any,
    limit?: number,
    nextToken?: string
  ): Promise<types.ModelExperienceConnection> {
    const result = await client.graphql({
      query: queries.listExperiences,
      variables: { filter, limit, nextToken },
    });
    return handleGraphQLError(result).listExperiences;
  },

  async createExperience(
    input: types.CreateExperienceInput
  ): Promise<types.Experience> {
    const result = await client.graphql({
      query: mutations.createExperience,
      variables: { input },
    });
    return handleGraphQLError(result).createExperience;
  },

  async updateExperience(
    input: types.UpdateExperienceInput
  ): Promise<types.Experience> {
    const result = await client.graphql({
      query: mutations.updateExperience,
      variables: { input },
    });
    return handleGraphQLError(result).updateExperience;
  },

  async deleteExperience(
    input: types.DeleteExperienceInput
  ): Promise<types.Experience> {
    const result = await client.graphql({
      query: mutations.deleteExperience,
      variables: { input },
    });
    return handleGraphQLError(result).deleteExperience;
  },
};

// Service API
export const serviceAPI = {
  async listServices(
    filter?: any,
    limit?: number,
    nextToken?: string
  ): Promise<types.ModelServiceConnection> {
    const result = await client.graphql({
      query: queries.listServices,
      variables: { filter, limit, nextToken },
    });
    return handleGraphQLError(result).listServices;
  },

  async createService(input: types.CreateServiceInput): Promise<types.Service> {
    const result = await client.graphql({
      query: mutations.createService,
      variables: { input },
    });
    return handleGraphQLError(result).createService;
  },

  async updateService(input: types.UpdateServiceInput): Promise<types.Service> {
    const result = await client.graphql({
      query: mutations.updateService,
      variables: { input },
    });
    return handleGraphQLError(result).updateService;
  },

  async deleteService(input: types.DeleteServiceInput): Promise<types.Service> {
    const result = await client.graphql({
      query: mutations.deleteService,
      variables: { input },
    });
    return handleGraphQLError(result).deleteService;
  },
};

// Author API
export const authorAPI = {
  async getAuthor(id: string): Promise<types.Author> {
    const result = await client.graphql({
      query: queries.getAuthor,
      variables: { id },
    });
    return handleGraphQLError(result).getAuthor;
  },

  async listAuthors(
    filter?: types.ModelAuthorFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<any> {
    const result = await client.graphql({
      query: queries.listAuthors,
      variables: { filter, limit, nextToken },
    });
    return handleGraphQLError(result).listAuthors;
  },

  async createAuthor(input: types.CreateAuthorInput): Promise<types.Author> {
    const result = await client.graphql({
      query: mutations.createAuthor,
      variables: { input },
    });
    return handleGraphQLError(result).createAuthor;
  },

  async updateAuthor(input: types.UpdateAuthorInput): Promise<types.Author> {
    const result = await client.graphql({
      query: mutations.updateAuthor,
      variables: { input },
    });
    return handleGraphQLError(result).updateAuthor;
  },

  async deleteAuthor(input: types.DeleteAuthorInput): Promise<types.Author> {
    const result = await client.graphql({
      query: mutations.deleteAuthor,
      variables: { input },
    });
    return handleGraphQLError(result).deleteAuthor;
  },
};

// Export all APIs
export const API = {
  blogPost: blogPostAPI,
  project: projectAPI,
  contact: contactAPI,
  todo: todoAPI,
  skill: skillAPI,
  experience: experienceAPI,
  service: serviceAPI,
  author: authorAPI,
};

export default API;
