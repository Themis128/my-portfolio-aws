// Auto-generated GraphQL types for Amplify API
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };

// Enums
export enum ProjectStatus {
  Planned = 'planned',
  InProgress = 'in_progress',
  Completed = 'completed',
  Archived = 'archived',
}

export enum TodoPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Urgent = 'urgent',
}

export enum SkillCategory {
  Frontend = 'frontend',
  Backend = 'backend',
  Cloud = 'cloud',
  Databases = 'databases',
  Tools = 'tools',
  Other = 'other',
}

// Custom Types
export type SocialLinks = {
  __typename?: 'SocialLinks';
  linkedin?: Maybe<string>;
  github?: Maybe<string>;
  instagram?: Maybe<string>;
  twitter?: Maybe<string>;
};

// Model Types
export type Author = {
  __typename?: 'Author';
  id: string;
  name: string;
  avatar?: Maybe<string>;
  bio?: Maybe<string>;
  socialLinks?: Maybe<SocialLinks>;
  createdAt?: Maybe<string>;
  updatedAt?: Maybe<string>;
};

export type BlogPost = {
  __typename?: 'BlogPost';
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: Maybe<Author>;
  publishedAt: string;
  updatedAt?: Maybe<string>;
  category: string;
  tags?: Maybe<Array<Maybe<string>>>;
  image?: Maybe<string>;
  readTime: number;
  featured?: Maybe<boolean>;
  createdAt?: Maybe<string>;
  updatedAt?: Maybe<string>;
};

export type Project = {
  __typename?: 'Project';
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: Array<string>;
  category: string;
  featured?: Maybe<boolean>;
  image?: Maybe<string>;
  github?: Maybe<string>;
  demo?: Maybe<string>;
  year: string;
  status?: Maybe<ProjectStatus>;
  createdAt?: Maybe<string>;
  updatedAt?: Maybe<string>;
};

export type ContactMessage = {
  __typename?: 'ContactMessage';
  id: string;
  name: string;
  email: string;
  subject?: Maybe<string>;
  message: string;
  createdAt: string;
  read?: Maybe<boolean>;
  responded?: Maybe<boolean>;
};

export type Todo = {
  __typename?: 'Todo';
  id: string;
  name: string;
  description?: Maybe<string>;
  completed?: Maybe<boolean>;
  priority?: Maybe<TodoPriority>;
  dueDate?: Maybe<string>;
  createdAt: string;
  updatedAt?: Maybe<string>;
};

export type Skill = {
  __typename?: 'Skill';
  id: string;
  name: string;
  category: SkillCategory;
  proficiency?: Maybe<number>;
  yearsOfExperience?: Maybe<number>;
  createdAt?: Maybe<string>;
  updatedAt?: Maybe<string>;
};

export type Experience = {
  __typename?: 'Experience';
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  startDate?: Maybe<string>;
  endDate?: Maybe<string>;
  current?: Maybe<boolean>;
  location?: Maybe<string>;
  createdAt?: Maybe<string>;
  updatedAt?: Maybe<string>;
};

export type Service = {
  __typename?: 'Service';
  id: string;
  title: string;
  description: string;
  icon?: Maybe<string>;
  featured?: Maybe<boolean>;
  order?: Maybe<number>;
  createdAt?: Maybe<string>;
  updatedAt?: Maybe<string>;
};

// Connection Types
export type ModelBlogPostConnection = {
  __typename?: 'ModelBlogPostConnection';
  items: Array<Maybe<BlogPost>>;
  nextToken?: Maybe<string>;
};

export type ModelProjectConnection = {
  __typename?: 'ModelProjectConnection';
  items: Array<Maybe<Project>>;
  nextToken?: Maybe<string>;
};

export type ModelContactMessageConnection = {
  __typename?: 'ModelContactMessageConnection';
  items: Array<Maybe<ContactMessage>>;
  nextToken?: Maybe<string>;
};

export type ModelTodoConnection = {
  __typename?: 'ModelTodoConnection';
  items: Array<Maybe<Todo>>;
  nextToken?: Maybe<string>;
};

export type ModelSkillConnection = {
  __typename?: 'ModelSkillConnection';
  items: Array<Maybe<Skill>>;
  nextToken?: Maybe<string>;
};

export type ModelExperienceConnection = {
  __typename?: 'ModelExperienceConnection';
  items: Array<Maybe<Experience>>;
  nextToken?: Maybe<string>;
};

export type ModelServiceConnection = {
  __typename?: 'ModelServiceConnection';
  items: Array<Maybe<Service>>;
  nextToken?: Maybe<string>;
};

// Input Types
export type CreateAuthorInput = {
  id?: InputMaybe<string>;
  name: string;
  avatar?: InputMaybe<string>;
  bio?: InputMaybe<string>;
  socialLinks?: InputMaybe<SocialLinksInput>;
};

export type SocialLinksInput = {
  linkedin?: InputMaybe<string>;
  github?: InputMaybe<string>;
  instagram?: InputMaybe<string>;
  twitter?: InputMaybe<string>;
};

export type CreateBlogPostInput = {
  id?: InputMaybe<string>;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorId?: InputMaybe<string>;
  publishedAt: string;
  updatedAt?: InputMaybe<string>;
  category: string;
  tags?: InputMaybe<Array<InputMaybe<string>>>;
  image?: InputMaybe<string>;
  readTime: number;
  featured?: InputMaybe<boolean>;
};

export type CreateProjectInput = {
  id?: InputMaybe<string>;
  title: string;
  slug: string;
  description: string;
  technologies: Array<string>;
  category: string;
  featured?: InputMaybe<boolean>;
  image?: InputMaybe<string>;
  github?: InputMaybe<string>;
  demo?: InputMaybe<string>;
  year: string;
  status?: InputMaybe<ProjectStatus>;
};

export type CreateContactMessageInput = {
  id?: InputMaybe<string>;
  name: string;
  email: string;
  subject?: InputMaybe<string>;
  message: string;
  read?: InputMaybe<boolean>;
  responded?: InputMaybe<boolean>;
};

export type CreateTodoInput = {
  id?: InputMaybe<string>;
  name: string;
  description?: InputMaybe<string>;
  completed?: InputMaybe<boolean>;
  priority?: InputMaybe<TodoPriority>;
  dueDate?: InputMaybe<string>;
};

export type CreateSkillInput = {
  id?: InputMaybe<string>;
  name: string;
  category: SkillCategory;
  proficiency?: InputMaybe<number>;
  yearsOfExperience?: InputMaybe<number>;
};

export type CreateExperienceInput = {
  id?: InputMaybe<string>;
  title: string;
  company: string;
  period: string;
  description: string;
  startDate?: InputMaybe<string>;
  endDate?: InputMaybe<string>;
  current?: InputMaybe<boolean>;
  location?: InputMaybe<string>;
};

export type CreateServiceInput = {
  id?: InputMaybe<string>;
  title: string;
  description: string;
  icon?: InputMaybe<string>;
  featured?: InputMaybe<boolean>;
  order?: InputMaybe<number>;
};

// Update Input Types
export type UpdateAuthorInput = {
  id: string;
  name?: InputMaybe<string>;
  avatar?: InputMaybe<string>;
  bio?: InputMaybe<string>;
  socialLinks?: InputMaybe<SocialLinksInput>;
};

export type UpdateBlogPostInput = {
  id: string;
  title?: InputMaybe<string>;
  slug?: InputMaybe<string>;
  excerpt?: InputMaybe<string>;
  content?: InputMaybe<string>;
  authorId?: InputMaybe<string>;
  publishedAt?: InputMaybe<string>;
  updatedAt?: InputMaybe<string>;
  category?: InputMaybe<string>;
  tags?: InputMaybe<Array<InputMaybe<string>>>;
  image?: InputMaybe<string>;
  readTime?: InputMaybe<number>;
  featured?: InputMaybe<boolean>;
};

export type UpdateProjectInput = {
  id: string;
  title?: InputMaybe<string>;
  slug?: InputMaybe<string>;
  description?: InputMaybe<string>;
  technologies?: InputMaybe<Array<string>>;
  category?: InputMaybe<string>;
  featured?: InputMaybe<boolean>;
  image?: InputMaybe<string>;
  github?: InputMaybe<string>;
  demo?: InputMaybe<string>;
  year?: InputMaybe<string>;
  status?: InputMaybe<ProjectStatus>;
};

export type UpdateContactMessageInput = {
  id: string;
  name?: InputMaybe<string>;
  email?: InputMaybe<string>;
  subject?: InputMaybe<string>;
  message?: InputMaybe<string>;
  read?: InputMaybe<boolean>;
  responded?: InputMaybe<boolean>;
};

export type UpdateTodoInput = {
  id: string;
  name?: InputMaybe<string>;
  description?: InputMaybe<string>;
  completed?: InputMaybe<boolean>;
  priority?: InputMaybe<TodoPriority>;
  dueDate?: InputMaybe<string>;
};

export type UpdateSkillInput = {
  id: string;
  name?: InputMaybe<string>;
  category?: InputMaybe<SkillCategory>;
  proficiency?: InputMaybe<number>;
  yearsOfExperience?: InputMaybe<number>;
};

export type UpdateExperienceInput = {
  id: string;
  title?: InputMaybe<string>;
  company?: InputMaybe<string>;
  period?: InputMaybe<string>;
  description?: InputMaybe<string>;
  startDate?: InputMaybe<string>;
  endDate?: InputMaybe<string>;
  current?: InputMaybe<boolean>;
  location?: InputMaybe<string>;
};

export type UpdateServiceInput = {
  id: string;
  title?: InputMaybe<string>;
  description?: InputMaybe<string>;
  icon?: InputMaybe<string>;
  featured?: InputMaybe<boolean>;
  order?: InputMaybe<number>;
};

// Delete Input Types
export type DeleteAuthorInput = {
  id: string;
};

export type DeleteBlogPostInput = {
  id: string;
};

export type DeleteProjectInput = {
  id: string;
};

export type DeleteContactMessageInput = {
  id: string;
};

export type DeleteTodoInput = {
  id: string;
};

export type DeleteSkillInput = {
  id: string;
};

export type DeleteExperienceInput = {
  id: string;
};

export type DeleteServiceInput = {
  id: string;
};

// Filter Input Types
export type ModelAuthorFilterInput = {
  id?: InputMaybe<ModelIDInput>;
  name?: InputMaybe<ModelStringInput>;
  avatar?: InputMaybe<ModelStringInput>;
  bio?: InputMaybe<ModelStringInput>;
  and?: InputMaybe<Array<InputMaybe<ModelAuthorFilterInput>>>;
  or?: InputMaybe<Array<InputMaybe<ModelAuthorFilterInput>>>;
  not?: InputMaybe<ModelAuthorFilterInput>;
};

export type ModelIDInput = {
  ne?: InputMaybe<string>;
  eq?: InputMaybe<string>;
  le?: InputMaybe<string>;
  lt?: InputMaybe<string>;
  ge?: InputMaybe<string>;
  gt?: InputMaybe<string>;
  contains?: InputMaybe<string>;
  notContains?: InputMaybe<string>;
  between?: InputMaybe<Array<InputMaybe<string>>>;
  beginsWith?: InputMaybe<string>;
  attributeExists?: InputMaybe<boolean>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  size?: InputMaybe<ModelSizeInput>;
};

export type ModelStringInput = {
  ne?: InputMaybe<string>;
  eq?: InputMaybe<string>;
  le?: InputMaybe<string>;
  lt?: InputMaybe<string>;
  ge?: InputMaybe<string>;
  gt?: InputMaybe<string>;
  contains?: InputMaybe<string>;
  notContains?: InputMaybe<string>;
  between?: InputMaybe<Array<InputMaybe<string>>>;
  beginsWith?: InputMaybe<string>;
  attributeExists?: InputMaybe<boolean>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  size?: InputMaybe<ModelSizeInput>;
};

export type ModelAttributeTypes =
  | 'binary'
  | 'binarySet'
  | 'bool'
  | 'list'
  | 'map'
  | 'number'
  | 'numberSet'
  | 'string'
  | 'stringSet'
  | '_null';

export type ModelSizeInput = {
  ne?: InputMaybe<number>;
  eq?: InputMaybe<number>;
  le?: InputMaybe<number>;
  lt?: InputMaybe<number>;
  ge?: InputMaybe<number>;
  gt?: InputMaybe<number>;
  between?: InputMaybe<Array<InputMaybe<number>>>;
};

export type ModelBlogPostFilterInput = {
  id?: InputMaybe<ModelIDInput>;
  title?: InputMaybe<ModelStringInput>;
  slug?: InputMaybe<ModelStringInput>;
  excerpt?: InputMaybe<ModelStringInput>;
  content?: InputMaybe<ModelStringInput>;
  publishedAt?: InputMaybe<ModelStringInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  category?: InputMaybe<ModelStringInput>;
  tags?: InputMaybe<ModelStringInput>;
  image?: InputMaybe<ModelStringInput>;
  readTime?: InputMaybe<ModelIntInput>;
  featured?: InputMaybe<ModelBooleanInput>;
  and?: InputMaybe<Array<InputMaybe<ModelBlogPostFilterInput>>>;
  or?: InputMaybe<Array<InputMaybe<ModelBlogPostFilterInput>>>;
  not?: InputMaybe<ModelBlogPostFilterInput>;
  authorId?: InputMaybe<ModelIDInput>;
};

export type ModelIntInput = {
  ne?: InputMaybe<number>;
  eq?: InputMaybe<number>;
  le?: InputMaybe<number>;
  lt?: InputMaybe<number>;
  ge?: InputMaybe<number>;
  gt?: InputMaybe<number>;
  between?: InputMaybe<Array<InputMaybe<number>>>;
  attributeExists?: InputMaybe<boolean>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
};

export type ModelBooleanInput = {
  ne?: InputMaybe<boolean>;
  eq?: InputMaybe<boolean>;
  attributeExists?: InputMaybe<boolean>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
};

// Subscription Filter Types
export type ModelSubscriptionAuthorFilterInput = {
  id?: InputMaybe<ModelSubscriptionIDInput>;
  name?: InputMaybe<ModelSubscriptionStringInput>;
  avatar?: InputMaybe<ModelSubscriptionStringInput>;
  bio?: InputMaybe<ModelSubscriptionStringInput>;
  and?: InputMaybe<Array<InputMaybe<ModelSubscriptionAuthorFilterInput>>>;
  or?: InputMaybe<Array<InputMaybe<ModelSubscriptionAuthorFilterInput>>>;
};

export type ModelSubscriptionIDInput = {
  ne?: InputMaybe<string>;
  eq?: InputMaybe<string>;
  le?: InputMaybe<string>;
  lt?: InputMaybe<string>;
  ge?: InputMaybe<string>;
  gt?: InputMaybe<string>;
  contains?: InputMaybe<string>;
  notContains?: InputMaybe<string>;
  between?: InputMaybe<Array<InputMaybe<string>>>;
  beginsWith?: InputMaybe<string>;
  in?: InputMaybe<Array<InputMaybe<string>>>;
  notIn?: InputMaybe<Array<InputMaybe<string>>>;
};

export type ModelSubscriptionStringInput = {
  ne?: InputMaybe<string>;
  eq?: InputMaybe<string>;
  le?: InputMaybe<string>;
  lt?: InputMaybe<string>;
  ge?: InputMaybe<string>;
  gt?: InputMaybe<string>;
  contains?: InputMaybe<string>;
  notContains?: InputMaybe<string>;
  between?: InputMaybe<Array<InputMaybe<string>>>;
  beginsWith?: InputMaybe<string>;
  in?: InputMaybe<Array<InputMaybe<string>>>;
  notIn?: InputMaybe<Array<InputMaybe<string>>>;
};
