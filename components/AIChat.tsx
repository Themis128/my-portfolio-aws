'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import { AIConversation } from '@aws-amplify/ui-react-ai';
import { Amplify } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { useAIConversation } from '../lib/client';
import { Flex, SelectField, Alert, Badge, Button, Card, Text, View, Divider } from '@aws-amplify/ui-react';

interface GeminiModel {
  name: string;
  displayName: string;
  description: string;
  inputTokenLimit: number;
  outputTokenLimit: number;
}

const GEMINI_MODELS: GeminiModel[] = [
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

// Separate component for the AI conversation to avoid conditional hook calls
function AIConversationWrapper() {
  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation('chat');

  return (
    <AIConversation
      messages={messages}
      isLoading={isLoading}
      handleSendMessage={handleSendMessage}
    />
  );
}

// Enhanced Gemini Chat Component (placeholder for future implementation)
function GeminiChatWrapper({ selectedModel }: { selectedModel: string }) {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user' as const, content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // This will work once quota is available
      // For now, simulate a response
      setTimeout(() => {
        const assistantMessage = {
          role: 'assistant' as const,
          content: `Hello! I'm ${selectedModel} from Google AI Studio. I received your message: "${userMessage.content}". Once the API quota resets, I'll be able to provide intelligent responses using the latest Gemini capabilities!`
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Gemini API error:', error);
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Flex direction="column" gap="medium" height="500px">
        {/* Messages Display */}
        <View flex="1" overflow="auto" padding="medium" backgroundColor="background.secondary">
          {messages.length === 0 ? (
            <Text textAlign="center" color="font.secondary">
              Start a conversation with {selectedModel}!
            </Text>
          ) : (
            messages.map((message, index) => (
              <Flex
                key={index}
                direction="column"
                gap="xs"
                marginBottom="small"
                alignItems={message.role === 'user' ? 'flex-end' : 'flex-start'}
              >
                <Badge
                  variation={message.role === 'user' ? 'info' : 'success'}
                  size="small"
                >
                  {message.role === 'user' ? 'You' : selectedModel}
                </Badge>
                <View
                  backgroundColor={message.role === 'user' ? 'brand.primary.20' : 'background.primary'}
                  padding="small"
                  borderRadius="medium"
                  maxWidth="70%"
                >
                  <Text fontSize="sm">{message.content}</Text>
                </View>
              </Flex>
            ))
          )}
          {isLoading && (
            <Flex alignItems="center" gap="small">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <Text fontSize="sm" color="font.secondary">
                {selectedModel} is thinking...
              </Text>
            </Flex>
          )}
        </View>

        {/* Input Area */}
        <Divider />
        <Flex gap="small">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Ask ${selectedModel} anything...`}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            isDisabled={isLoading || !inputMessage.trim()}
            variation="primary"
          >
            Send
          </Button>
        </Flex>

        <Alert variation="warning">
          <Text fontSize="xs">
            <strong>Note:</strong> Gemini chat is currently in demo mode. Full functionality will be available once API quota resets.
          </Text>
        </Alert>
      </Flex>
    </Card>
  );
}

export default function AIChat() {
  const [isClient, setIsClient] = useState(false);
  const [isAmplifyReady, setIsAmplifyReady] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const [activeTab, setActiveTab] = useState("aws");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    // Check if Amplify is configured
    const checkAmplify = () => {
      try {
        // Try to get the current config - if this succeeds, Amplify is configured
        Amplify.getConfig();
        setIsAmplifyReady(true);
      } catch {
        // Amplify not configured yet, wait and check again
        setTimeout(checkAmplify, 100);
      }
    };

    checkAmplify();
  }, []);

  const selectedModelInfo = GEMINI_MODELS.find(m => m.name === selectedModel);

  if (!isClient || !isAmplifyReady) {
    return (
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              AI Assistant
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Loading AI chat interface...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            🚀 Enhanced AI Assistant
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Chat with advanced AI assistants powered by AWS Amplify and Google AI Studio
          </p>
        </div>

        <Alert variation="info" marginBottom="large">
          <Text>
            <strong>🎉 New:</strong> Choose between AWS Amplify AI and Google Gemini models!
            Experience the latest AI capabilities with Gemini 2.5.
          </Text>
        </Alert>

        {/* Model Selection for Gemini */}
        {activeTab === 'gemini' && (
          <Card marginBottom="large">
            <Flex direction="column" gap="small">
              <SelectField
                label="Google Gemini Model"
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
                        Context: {(selectedModelInfo.inputTokenLimit / 1000).toFixed(0)}K tokens
                      </Badge>
                      <Badge variation="success" fontSize="xs">
                        Response: {(selectedModelInfo.outputTokenLimit / 1000).toFixed(0)}K tokens
                      </Badge>
                    </Flex>
                  </Flex>
                </View>
              )}
            </Flex>
          </Card>
        )}

        {/* Simple Tab Interface */}
        <Flex justifyContent="center" gap="small" marginBottom="large">
          <Button
            onClick={() => setActiveTab("aws")}
            className={activeTab === "aws" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}
            size="large"
          >
            🔄 AWS Amplify AI
          </Button>
          <Button
            onClick={() => setActiveTab("gemini")}
            className={activeTab === "gemini" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}
            size="large"
          >
            🚀 Google Gemini AI
          </Button>
        </Flex>

        {/* Tab Content */}
        {activeTab === "aws" && (
          <Authenticator>
            <AIConversationWrapper />
          </Authenticator>
        )}

        {activeTab === "gemini" && (
          <GeminiChatWrapper selectedModel={selectedModel} />
        )}
      </div>
    </div>
  );
}
