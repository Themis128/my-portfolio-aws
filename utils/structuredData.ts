export type OrganizationSchema = {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
  sameAs?: string[];
};

export type ServiceSchema = {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  areaServed?: string;
};

export type ArticleSchema = {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo?: string;
  };
};

export const generateOrganizationSchema = (data: OrganizationSchema) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: data.name,
  url: data.url,
  ...(data.logo && { logo: data.logo }),
  ...(data.description && { description: data.description }),
  ...(data.contactPoint && {
    contactPoint: {
      "@type": "ContactPoint",
      ...(data.contactPoint.telephone && {
        telephone: data.contactPoint.telephone,
      }),
      ...(data.contactPoint.contactType && {
        contactType: data.contactPoint.contactType,
      }),
      ...(data.contactPoint.email && { email: data.contactPoint.email }),
    },
  }),
  ...(data.sameAs && { sameAs: data.sameAs }),
});

export const generateServiceSchema = (data: ServiceSchema) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: data.name,
  description: data.description,
  provider: {
    "@type": "Organization",
    name: data.provider.name,
    url: data.provider.url,
  },
  ...(data.areaServed && { areaServed: data.areaServed }),
});

export const generateArticleSchema = (data: ArticleSchema) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: data.headline,
  description: data.description,
  ...(data.image && { image: data.image }),
  datePublished: data.datePublished,
  ...(data.dateModified && { dateModified: data.dateModified }),
  author: {
    "@type": "Person",
    name: data.author.name,
    ...(data.author.url && { url: data.author.url }),
  },
  publisher: {
    "@type": "Organization",
    name: data.publisher.name,
    ...(data.publisher.logo && { logo: data.publisher.logo }),
  },
});
