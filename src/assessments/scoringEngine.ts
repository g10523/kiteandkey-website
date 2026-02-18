import type { CognitiveDimensionId, NormTable } from './types';

// Mock Norm Tables (Ages 8-18)
// In a real app, this would be a large dataset
export const normTables: NormTable[] = [
    // Working Memory Screener (Digit Span) - Mean ranges from 6 to 12 over age 8 to 18
    { dimensionId: 'working_memory', age: 8, mean: 6.2, sd: 1.2 },
    { dimensionId: 'working_memory', age: 10, mean: 7.5, sd: 1.5 },
    { dimensionId: 'working_memory', age: 12, mean: 8.8, sd: 1.8 },
    { dimensionId: 'working_memory', age: 14, mean: 10.1, sd: 2.0 },
    { dimensionId: 'working_memory', age: 16, mean: 11.4, sd: 2.2 },
    { dimensionId: 'working_memory', age: 18, mean: 12.0, sd: 2.5 },
];

/**
 * Calculates current age-appropriate norm for a dimension.
 * Linear interpolation between mock data points.
 */
function getNormsForAge(dimensionId: CognitiveDimensionId, age: number): { mean: number; sd: number } {
    const table = normTables.filter(n => n.dimensionId === dimensionId).sort((a, b) => a.age - b.age);

    if (table.length === 0) return { mean: 10, sd: 2 }; // Default if no norms found

    if (age <= table[0].age) return { mean: table[0].mean, sd: table[0].sd };
    if (age >= table[table.length - 1].age) return { mean: table[table.length - 1].mean, sd: table[table.length - 1].sd };

    for (let i = 0; i < table.length - 1; i++) {
        const start = table[i];
        const end = table[i + 1];
        if (age >= start.age && age <= end.age) {
            const t = (age - start.age) / (end.age - start.age);
            return {
                mean: start.mean + t * (end.mean - start.mean),
                sd: start.sd + t * (end.sd - start.sd)
            };
        }
    }
    return { mean: 10, sd: 2 }; // Fallback
}

/**
 * Standard Normal Cumulative Distribution Function (CDF)
 */
function normalCDF(z: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - p : p;
}

export const scoringEngine = {
    calculatePercentile: (rawScore: number, dimensionId: CognitiveDimensionId, age: number): number => {
        const { mean, sd } = getNormsForAge(dimensionId, age);
        const zScore = (rawScore - mean) / sd;
        const percentile = Math.round(normalCDF(zScore) * 100);
        return Math.max(1, Math.min(99, percentile));
    },

    calculateStandardScore: (percentile: number): number => {
        // Inverse normal distribution approximation (simplified for IQ-style: mean 100, sd 15)
        // Map percentile back to z-score then to 100 + z*15
        const z = (percentile - 50) / 15; // Rough approximation
        return Math.round(100 + z * 15);
    },

    calculateConfidence: (reliability: number): number => {
        return Math.round(reliability * 100);
    },

    getTrend: (scores: { date: string; percentile: number }[]): 'improving' | 'stable' | 'declining' => {
        if (scores.length < 2) return 'stable';
        const sorted = [...scores].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const last = sorted[sorted.length - 1].percentile;
        const prev = sorted[sorted.length - 2].percentile;
        const diff = last - prev;
        if (diff > 5) return 'improving';
        if (diff < -5) return 'declining';
        return 'stable';
    }
};
