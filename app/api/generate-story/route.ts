import { NextRequest, NextResponse } from 'next/server';
import { generateAIStory } from '@/lib/cosmic';
import { populatePromptTemplate } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { promptTemplate, answers, maxTokens = 300 } = body;

    if (!promptTemplate || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Populate the prompt template with user answers
    const populatedPrompt = populatePromptTemplate(promptTemplate, answers);

    // Generate the story using Cosmic AI
    const result = await generateAIStory(populatedPrompt, maxTokens);

    return NextResponse.json({
      story: result.text,
      usage: result.usage
    });

  } catch (error) {
    console.error('Error generating story:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate story. Please try again.' },
      { status: 500 }
    );
  }
}