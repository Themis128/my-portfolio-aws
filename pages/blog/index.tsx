"use client";

import { BlogPost } from "@/data/blogPosts";
import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Input,
  SelectField,
  Text,
  View,
} from "@aws-amplify/ui-react";
import { PageShell } from "@portfolio/components/layout";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const posts = await response.json();
        setBlogPosts(posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(blogPosts.map((post) => post.category)),
    );
    return uniqueCategories;
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, blogPosts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="text-center">
        <Text className="text-muted-foreground">Loading blog posts...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <Heading level={1} className="mb-4">
          Error
        </Heading>
        <Text className="text-muted-foreground">{error}</Text>
      </div>
    );
  }

  return (
    <>
      <div className="mb-12 text-center">
        <Heading level={1} className="mb-4">
          Blog
        </Heading>
        <Text className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Thoughts, tutorials, and insights on web development, technology, and
          software engineering.
        </Text>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Flex
          direction={{ base: "column", medium: "row" }}
          gap="1rem"
          alignItems="center"
          justifyContent="center"
        >
          <View className="w-full md:w-64">
            <SelectField
              label="Category"
              labelHidden
              placeholder="All Categories"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </SelectField>
          </View>

          <View className="w-full md:w-80">
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
            />
          </View>
        </Flex>
      </div>

      {/* Posts Grid */}
      <Flex
        direction="column"
        gap="2rem"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            variation="outlined"
            className="p-6 hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">
              <Heading level={3} className="mb-2 line-clamp-2">
                {post.title}
              </Heading>
              <Text className="text-muted-foreground text-sm mb-3 line-clamp-3">
                {post.excerpt}
              </Text>
            </div>

            <div className="mb-3">
              <Flex alignItems="center" gap="0.5rem" className="mb-2">
                <Badge variation="info" className="text-xs">
                  {post.category}
                </Badge>
                <Text className="text-muted-foreground text-xs">
                  {formatDate(post.publishedAt)}
                </Text>
              </Flex>
              <Text className="text-muted-foreground text-xs">
                By {post.author.name} • {post.readTime} min read
              </Text>
            </div>

            <div className="mb-4">
              <Flex wrap="wrap" gap="0.25rem">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge className="text-xs">
                    +{post.tags.length - 3} more
                  </Badge>
                )}
              </Flex>
            </div>

            <Button
              variation="primary"
              width="100%"
              as={Link}
              href={`/blog/${post.slug}`}
            >
              Read More
            </Button>
          </Card>
        ))}
      </Flex>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <Text className="text-muted-foreground">
            No blog posts found matching your criteria.
          </Text>
        </div>
      )}

      {/* Stats */}
      <div className="mt-12 text-center">
        <Text className="text-muted-foreground">
          {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}{" "}
          found
        </Text>
      </div>
    </>
  );
}
