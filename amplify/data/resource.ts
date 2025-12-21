import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Author: a
    .model({
      id: a.id().required(),
      name: a.string().required(),
      avatar: a.string(),
      bio: a.string(),
      socialLinks: a.ref('SocialLinks'),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
    ]),

  SocialLinks: a.customType({
    linkedin: a.string(),
    github: a.string(),
    instagram: a.string(),
    twitter: a.string(),
  }),

  BlogPost: a
    .model({
      id: a.id().required(),
      title: a.string().required(),
      slug: a.string().required(),
      excerpt: a.string().required(),
      content: a.string().required(),
      author: a.belongsTo('Author', 'authorId'),
      publishedAt: a.date().required(),
      updatedAt: a.date(),
      category: a.string().required(),
      tags: a.string().array(),
      image: a.string(),
      readTime: a.integer().required(),
      featured: a.boolean().default(false),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
    ]),

  Project: a
    .model({
      id: a.id().required(),
      title: a.string().required(),
      slug: a.string().required(),
      description: a.string().required(),
      technologies: a.string().required().array(),
      category: a.string().required(),
      featured: a.boolean().default(false),
      image: a.string(),
      github: a.string(),
      demo: a.string(),
      year: a.string().required(),
      status: a.enum(['planned', 'in_progress', 'completed', 'archived']),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
    ]),

  ContactMessage: a
    .model({
      id: a.id().required(),
      name: a.string().required(),
      email: a.string().required(),
      subject: a.string(),
      message: a.string().required(),
      createdAt: a.datetime().required(),
      read: a.boolean().default(false),
      responded: a.boolean().default(false),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
    ]),

  Todo: a
    .model({
      id: a.id().required(),
      name: a.string().required(),
      description: a.string(),
      completed: a.boolean().default(false),
      priority: a.enum(['low', 'medium', 'high', 'urgent']),
      dueDate: a.date(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ]),

  Skill: a
    .model({
      id: a.id().required(),
      name: a.string().required(),
      category: a.enum([
        'frontend',
        'backend',
        'cloud',
        'databases',
        'tools',
        'other',
      ]),
      proficiency: a.integer().default(75),
      yearsOfExperience: a.integer(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
    ]),

  Experience: a
    .model({
      id: a.id().required(),
      title: a.string().required(),
      company: a.string().required(),
      period: a.string().required(),
      description: a.string().required(),
      startDate: a.date(),
      endDate: a.date(),
      current: a.boolean().default(false),
      location: a.string(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
    ]),

  Service: a
    .model({
      id: a.id().required(),
      title: a.string().required(),
      description: a.string().required(),
      icon: a.string(),
      featured: a.boolean().default(false),
      order: a.integer().default(0),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
