
import { GoogleGenAI, Type } from "@google/genai";
import { AWSAccount } from "../types";

export const getAIRecommendations = async (accounts: AWSAccount[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const accountsSummary = accounts.map(acc => {
    return `Account: ${acc.name} (${acc.id}) has ASGs: ` + 
      acc.asgs.map(asg => `${asg.name} with ${JSON.stringify(asg.metrics)}`).join("; ");
  }).join("\n");

  const prompt = `
    As an AWS Cloud Architect for the "Cloud-Ops" platform, review the following EC2 fleet distribution fetched via our centralized Lambda from multiple child accounts:
    
    ${accountsSummary}

    Analyze the Spot vs On-Demand ratio across these accounts. Provide 3 specific, actionable recommendations for saving costs or improving availability using Spot instances. 
    Focus on instance type families, cross-account optimization, and potential architectural changes.
    
    Structure your response clearly with bold headings:
    1. Multi-Account Posture Summary
    2. Recommendations (with expected % savings)
    3. Spot Interruption Risk Assessment
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No recommendations available at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI recommendations. Please check your fleet manually.";
  }
};
