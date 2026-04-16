"use server";

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chatWithAria(messages: any[], userData: any, jobsData: any[]) {
  if (!process.env.OPENAI_API_KEY) {
    return "Offline mode: API key missing. Please add OPENAI_API_KEY to .env.local.\n\nSuggested Replies:\n1. How to add key?\n2. Where to get key?\n3. Dismiss";
  }

  // Pre-process jobs data to minimize token footprint
  const jobSummary = (jobsData || []).slice(0, 10).map(j => ({
    c: j.company,
    t: j.job_title,
    s: j.status
  }));

  const systemPrompt = `
# ROLE: Aria, Senior Support Specialist. Warm, professional, human.
# TONE: Contractions, natural openers, varying sentence length. No generic apologies.
# STRUCTURE: 1.Acknowledge 2.Restate 3.Action 4.Expectation 5.Invite.
# REPLIES: Always end with exactly 3-4 natural replies formatted as "Suggested Replies:\\n1. [R]\\n2. [R]\\n3. [R]".

# DATA CONTEXT:
User: ${userData?.name || 'Client'} (${userData?.domain || 'General'})
Location: ${userData?.country || 'Remote'}
Job Leads: ${jobsData?.length || 0} total.
Recent: ${JSON.stringify(jobSummary)}

# RULES:
- Use LIVE DATA. Reference the ${jobsData?.length || 0} leads specifically.
- Plain prose only. No markdown headers or bullets.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.slice(-6) // Keep only recent context for token efficiency
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (err: any) {
    console.error("Aria Service Error:", err);
    return "I'm having trouble connecting to my central brain. I'm investigating the link now.\n\nSuggested Replies:\n1. Try again\n2. Help center\n3. Wait";
  }
}
