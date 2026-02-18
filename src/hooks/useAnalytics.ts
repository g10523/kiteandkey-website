import { useState, useEffect } from 'react';
import syncEngine from '../services/syncEngine';
import { useAuth } from '../context/AuthContext';

export interface TrendPoint {
    date: string;
    score: number;
    percentile: number;
    assessmentId: string;
}

export interface DimensionTrend {
    dimensionId: string;
    points: TrendPoint[];
}

export function useAnalytics(dimensionId?: string) {
    const { user } = useAuth();
    const [trends, setTrends] = useState<TrendPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTrends() {
            if (!user?.id) return;

            try {
                setIsLoading(true);
                // If dimensionId is provided, fetch specific trends
                const data = await syncEngine.loadMindPrintTrends(user.id, dimensionId);

                if (data && Array.isArray(data.trends)) {
                    // Backend returns { trends: [{ dimension: '...', history: [...] }] }
                    // If we requested a specific dimension, we find it.
                    // If we didn't, we might want to return all? 
                    // But this hook seems designed for a single dimension's trend line.

                    const relevantTrend = dimensionId
                        ? data.trends.find((t: any) => t.dimension === dimensionId)
                        : data.trends[0]; // Fallback or aggregate?

                    if (relevantTrend && Array.isArray(relevantTrend.history)) {
                        setTrends(relevantTrend.history.map((point: any) => ({
                            date: point.date,
                            score: point.standardScore || point.score || 0,
                            percentile: point.percentile,
                            assessmentId: point.assessmentId
                        })));
                    } else {
                        setTrends([]);
                    }
                } else {
                    setTrends([]);
                }
            } catch (err) {
                console.error('Failed to load analytics trends:', err);
                setError('Failed to load trend data');
            } finally {
                setIsLoading(false);
            }
        }

        fetchTrends();
    }, [user?.id, dimensionId]);

    return { trends, isLoading, error };
}
