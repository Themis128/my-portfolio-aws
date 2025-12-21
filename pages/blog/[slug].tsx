import { BlogPost, blogPosts, getBlogPostBySlug } from "@/data/blogPosts";
import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Text,
} from "@aws-amplify/ui-react";

import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface BlogPostPageProps {
  post: BlogPost | null;
  relatedPosts: BlogPost[];
}

export default function BlogPostPage({
  post,
  relatedPosts,
}: BlogPostPageProps) {
  if (!post) {
    return (
      <div className="text-center">
        <Heading level={1} className="mb-4">
          Post Not Found
        </Heading>
        <Text className="text-muted-foreground mb-8">
          The blog post you're looking for doesn't exist.
        </Text>
        <Button as={Link} href="/blog" variation="primary">
          Back to Blog
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Back Button */}
      <div className="mb-8">
        <Button as={Link} href="/blog" variation="link" className="p-0 h-auto">
          ← Back to Blog
        </Button>
      </div>

      {/* Post Header */}
      <div className="mb-8">
        <div className="mb-4">
          <Badge variation="info" className="mb-2">
            {post.category}
          </Badge>
        </div>

        <Heading level={1} className="mb-4">
          {post.title}
        </Heading>

        <div className="mb-6">
          <Text className="text-muted-foreground text-lg mb-4">
            {post.excerpt}
          </Text>

          <Flex
            alignItems="center"
            style={{ gap: "1rem" }}
            className="text-sm text-muted-foreground"
          >
            <span>By {post.author.name}</span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </Flex>
        </div>

        <div className="mb-6">
          <Flex wrap="wrap" style={{ gap: "0.5rem" }}>
            {post.tags.map((tag) => (
              <Badge key={tag} className="text-xs">
                {tag}
              </Badge>
            ))}
          </Flex>
        </div>
      </div>

      {/* Post Content */}
      <Card className="p-8 mb-12">
        <div className="prose prose-lg max-w-none whitespace-pre-line">
          {post.content
            .replace(/<h2>(.*?)<\/h2>/g, `\n\n$1\n${"=".repeat(50)}\n\n`)
            .replace(/<p>(.*?)<\/p>/g, "$1\n\n")
            .replace(/<\/?[^>]+(>|$)/g, "")}
        </div>
      </Card>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mb-12">
          <Heading level={2} className="mb-6">
            Related Posts
          </Heading>

          <Flex
            style={{ flexDirection: "column", gap: "1rem" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {relatedPosts.map((relatedPost) => (
              <Card
                key={relatedPost.id}
                className="p-4 hover:shadow-md transition-shadow"
              >
                <div className="mb-3">
                  <Heading level={4} className="mb-2 line-clamp-2">
                    {relatedPost.title}
                  </Heading>
                  <Text className="text-muted-foreground text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </Text>
                </div>

                <div className="mb-3">
                  <Badge variation="info" className="text-xs">
                    {relatedPost.category}
                  </Badge>
                </div>

                <Button
                  variation="primary"
                  size="small"
                  width="100%"
                  as={Link}
                  href={`/blog/${relatedPost.slug}`}
                >
                  Read More
                </Button>
              </Card>
            ))}
          </Flex>
        </div>
      )}

      {/* Footer Actions */}
      <div className="text-center">
        <Button as={Link} href="/blog" variation="primary">
          View All Posts
        </Button>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const post = getBlogPostBySlug(blogPosts, slug) || null;

  const relatedPosts = post
    ? blogPosts
        .filter(
          (p) =>
            p.id !== post.id &&
            (p.category === post.category ||
              p.tags.some((tag) => post.tags.includes(tag))),
        )
        .slice(0, 3)
    : [];

  return {
    props: {
      post,
      relatedPosts,
    },
  };
};
