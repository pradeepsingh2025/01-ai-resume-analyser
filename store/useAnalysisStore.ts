import { create } from 'zustand';
import { AnalysisResult } from '@/utils/types';

export type AnalysisEntry = {
    resumeText: string;
    jobDescription: string;
    analysisResult: AnalysisResult | null;
};

interface AnalysisState {
    analyses: Record<string, AnalysisEntry>;

    setAnalysisData: (
        id: string,
        data: Partial<AnalysisEntry>
    ) => void;
    clearAnalysis: (id: string) => void;
}

export const useAnalysisStore = create<AnalysisState>()((set) => ({
    analyses: {},

    setAnalysisData: (id, data) =>
        set((state) => ({
            analyses: {
                ...state.analyses,
                [id]: {
                    ...(state.analyses[id] || {
                        resumeText: '',
                        jobDescription: '',
                        analysisResult: null
                    }),
                    ...data,
                },
            },
        })),

    clearAnalysis: (id) =>
        set((state) => {
            const newAnalyses = { ...state.analyses };
            delete newAnalyses[id];
            return { analyses: newAnalyses };
        }),
}));