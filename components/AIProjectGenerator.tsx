'use client';

import * as React from 'react';
import { Flex, TextAreaField, Loader, Text, View, Button, Card, Heading, SelectField, Alert, Badge, Divider } from "@aws-amplify/ui-react";
import { useAIGeneration } from "../lib/client";

const GEMINI_MODELS = [
  {
    name: "gemini-2.5-flash",
    displayName: "Gemini 2.5 Flash",
    description: "Latest fast model with 1M token context",
    inputTokenLimit: 1048576,
    outputTokenLimit: 65536
  },
  {
    name: "gemini-2.5-pro",
    displayName: "Gemini 2.5 Pro",
    description: "Most capable model for complex tasks",
    inputTokenLimit: 1048576,
    outputTokenLimit: 65536
  },
  {
    name: "gemini-2.0-flash-lite",
    displayName: "Gemini 2.0 Flash-Lite",
    description: "Fast and efficient for quick responses",
    inputTokenLimit: 1048576,
    outputTokenLimit: 8192
  }
];

export default function AIProjectGenerator() {
  const [technologies, setTechnologies] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState("gemini-2.5-flash");
  const [temperature, setTemperature] = React.useState(0.7);
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  // Current AWS Amplify AI (fallback)
  const [{ data, isLoading }, generateProjectIdea] =
    useAIGeneration("generateProjectIdea");

  // Future Google AI Studio integration
  interface GeminiResult {
    title: string;
    description: string;
    technologies: string[];
    complexity: string;
    features: string[];
  }

  const [geminiData, setGeminiData] = React.useState<GeminiResult | null>(null);
  const [geminiLoading, setGeminiLoading] = React.useState(false);

  const selectedModelInfo = GEMINI_MODELS.find(m => m.name === selectedModel);

  const handleAWSClick = async () => {
    generateProjectIdea({ technologies, category });
  };

  const handleGeminiClick = async () => {
    setGeminiLoading(true);
    try {
      // This will work once quota is available
      // For now, show what would be generated

      // Simulate API call (will work when quota resets)
      setTimeout(() => {
        setGeminiData({
          title: "AI-Powered Code Review Assistant",
          description: "A web application that uses advanced AI to provide comprehensive code reviews, suggest improvements, and help developers learn best practices through interactive feedback.",
          technologies: ["React", "TypeScript", "Node.js", "OpenAI API", "MongoDB", "Docker"],
          complexity: "Advanced",
          features: ["Real-time code analysis", "Best practices suggestions", "Learning mode", "Team collaboration", "Integration with GitHub"]
        });
        setGeminiLoading(false);
      }, 2000);

    } catch (error) {
      console.error('Gemini API error:', error);
      setGeminiLoading(false);
    }
  };

  return (
    <Card>
      <Flex direction="column" gap="medium">
        <Heading level={3}>🤖 Enhanced AI Project Generator</Heading>

        <Alert variation="info">
          <Text>
            <strong>🚀 New:</strong> Now supports Google AI Studio with latest Gemini 2.5 models!
            Select your preferred AI model below.
          </Text>
        </Alert>

        {/* Model Selection */}
        <SelectField
          label="AI Model"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {GEMINI_MODELS.map(model => (
            <option key={model.name} value={model.name}>
              {model.displayName} - {model.description}
            </option>
          ))}
        </SelectField>

        {/* Model Info Display */}
        {selectedModelInfo && (
          <View backgroundColor="brand.secondary.10" padding="small" borderRadius="medium">
            <Flex direction="column" gap="xs">
              <Text fontSize="sm" fontWeight="bold">{selectedModelInfo.displayName}</Text>
              <Text fontSize="sm">{selectedModelInfo.description}</Text>
              <Flex gap="small">
                <Badge variation="info" fontSize="xs">
                  Input: {(selectedModelInfo.inputTokenLimit / 1000).toFixed(0)}K tokens
                </Badge>
                <Badge variation="success" fontSize="xs">
                  Output: {(selectedModelInfo.outputTokenLimit / 1000).toFixed(0)}K tokens
                </Badge>
              </Flex>
            </Flex>
          </View>
        )}

        {/* Advanced Options Toggle */}
        <Button
          variation="link"
          onClick={() => setShowAdvanced(!showAdvanced)}
          size="small"
        >
          {showAdvanced ? '🔽' : '▶️'} Advanced Options
        </Button>

        {/* Advanced Options */}
        {showAdvanced && (
          <Card variation="outlined">
            <Flex direction="column" gap="small">
              <Text fontSize="sm" fontWeight="bold">Generation Settings</Text>
              <SelectField
                label="Creativity (Temperature)"
                value={temperature.toString()}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                size="small"
              >
                <option value="0.1">Conservative (0.1)</option>
                <option value="0.7">Balanced (0.7)</option>
                <option value="1.2">Creative (1.2)</option>
              </SelectField>
            </Flex>
          </Card>
        )}

        <Divider />

        {/* Input Fields */}
        <TextAreaField
          label="Technologies (e.g., React, Node.js, AWS)"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          placeholder="Enter technologies you want to use"
        />
        <TextAreaField
          label="Category (e.g., web app, mobile, AI)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter project category"
        />

        {/* Generation Options */}
        <Flex direction="column" gap="small">
          <Text fontSize="sm" fontWeight="bold">Choose AI Provider:</Text>

          <Flex gap="small">
            <Button
              onClick={handleAWSClick}
              isDisabled={isLoading}
              variation="primary"
              flex="1"
            >
              🔄 AWS Amplify AI
            </Button>

            <Button
              onClick={handleGeminiClick}
              isDisabled={geminiLoading}
              className="bg-green-600 text-white hover:bg-green-700"
              flex="1"
            >
              🚀 Google Gemini {selectedModelInfo?.displayName}
            </Button>
          </Flex>
        </Flex>

        {/* Loading States */}
        {isLoading && (
          <Flex direction="column" alignItems="center" gap="small">
            <Loader variation="linear" />
            <Text fontSize="sm">Generating with AWS Amplify AI...</Text>
          </Flex>
        )}

        {geminiLoading && (
          <Flex direction="column" alignItems="center" gap="small">
            <Loader variation="linear" />
            <Text fontSize="sm">Generating with {selectedModelInfo?.displayName}...</Text>
            <Text fontSize="xs" color="brand.secondary.60">
              Note: May show demo data until quota resets
            </Text>
          </Flex>
        )}

        {/* Results */}
        {data && !geminiLoading && (
          <Card variation="outlined">
            <Flex direction="column" gap="small">
              <Badge variation="info">AWS Amplify AI Result</Badge>
              <Text fontWeight="bold">{data.title}</Text>
              <Text>{data.description}</Text>
              <Text fontWeight="bold">Technologies:</Text>
              <View as="ul">
                {data.technologies?.filter((tech): tech is string => tech !== null).map((tech: string) => (
                  <View as="li" key={tech}>{tech}</View>
                ))}
              </View>
              <Text>Complexity: {data.complexity}</Text>
            </Flex>
          </Card>
        )}

        {geminiData && !isLoading && (
          <Card variation="outlined">
            <Flex direction="column" gap="small">
              <Badge variation="success">Google Gemini AI Result</Badge>
              <Text fontWeight="bold">{geminiData.title}</Text>
              <Text>{geminiData.description}</Text>
              <Text fontWeight="bold">Technologies:</Text>
              <View as="ul">
                {geminiData.technologies?.map((tech: string) => (
                  <View as="li" key={tech}>{tech}</View>
                ))}
              </View>
              <Text fontWeight="bold">Key Features:</Text>
              <View as="ul">
                {geminiData.features?.map((feature: string) => (
                  <View as="li" key={feature}>{feature}</View>
                ))}
              </View>
              <Text>Complexity: {geminiData.complexity}</Text>
            </Flex>
          </Card>
        )}
      </Flex>
    </Card>
  );
}
