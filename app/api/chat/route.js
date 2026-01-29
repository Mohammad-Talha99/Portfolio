import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function POST(req) {
    try {
        const { messages } = await req.json();
        console.log(messages);
        const lastMessage = messages[messages.length - 1];

        if (!lastMessage) {
            return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
        }

        // 1. Generate Embedding for the user query using Gemini (via OpenAI compatibility or Google SDK if needed, 
        // strictly strictly using OpenAI SDK here as per request "gemini model with open ai sdk provider")
        // Note: text-embedding-004 is a good model for this.
        // However, the OpenAI SDK running against Gemini endpoint might need specific model names.
        // Let's assume 'text-embedding-004' works or we use a standard one.

        // Actually, for simplicity and ensuring compatibility with the "gemini model with open ai sdk provider" request:
        // We will use the chat generation part with OpenAI SDK.
        // For embeddings, usually we use the same provider. 
        // Let's try to use OpenAI SDK for embeddings too if supported, otherwise we might need a direct call or google-generative-ai package.
        // But since I installed 'openai', I will try to use it.

        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-004",
            input: lastMessage.content,
        });

        const embedding = embeddingResponse.data[0].embedding;

        // 2. Query Pinecone
        const index = pinecone.index(process.env.PINECONE_INDEX_NAME);
        const queryResponse = await index.query({
            vector: embedding,
            topK: 3,
            includeMetadata: true,
        });

        console.log(queryResponse);

        // 3. Construct Context
        const context = queryResponse.matches
            .map((match) => match.metadata?.text || '')
            .join('\n\n');

        // 4. Chat Completion
        const systemPrompt = `You are a helpful AI assistant for a portfolio website. 
    Use the following pieces of context to answer the user's question about the portfolio owner.
    If the answer is not in the context, say you don't know but offer to contact the owner.
    
    Context:
    ${context}
    `;

        const completion = await openai.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                { role: "system", content: systemPrompt },
                ...messages
            ],
            stream: true,
        });

        // Create a ReadableStream for the response
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content || '';
                    if (content) {
                        controller.enqueue(new TextEncoder().encode(content));
                    }
                }
                controller.close();
            },
        });

        return new NextResponse(stream, {
            headers: { 'Content-Type': 'text/plain' },
        });

    } catch (error) {
        console.error('Error in chat route:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
