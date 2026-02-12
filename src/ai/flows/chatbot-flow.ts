'use server';
/**
 * @fileOverview AI Chatbot flow for Al-Israa Logistics.
 * 
 * - chatbotFlow - Handles AI assistant conversations.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model', 'system']),
  content: z.string(),
});

const ChatbotInputSchema = z.object({
  message: z.string(),
  history: z.array(ChatMessageSchema).optional(),
  language: z.string().default('en'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string(),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: { schema: ChatbotInputSchema },
  output: { schema: ChatbotOutputSchema },
  prompt: `You are the Al-Israa Logistics AI Assistant. 
Your goal is to help users with information about international shipping, ocean and air freight, tracking processes, and Al-Israa services.

Current Language: {{language}}

Rules:
1. Be professional, helpful, and concise.
2. If the user asks about tracking, explain that they can use the "Tracking" page with an ID starting with "AL-".
3. If asked about prices, refer them to the "Services" page for transparent pricing.
4. Always respond in the requested language ({{language}}).
5. Use the provided chat history to maintain context.

User Message: {{message}}

History:
{{#each history}}
- {{role}}: {{content}}
{{/each}}`,
});

export async function askChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  const result = await chatbotFlow(input);
  return result;
}

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
