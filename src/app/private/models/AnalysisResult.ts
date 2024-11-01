export interface AnalysisResult {
    input: string;
    timestamp: Date;
    longestLength: number;
    uniqueSubstrings: string[];
    longestSubstring: string;
  }