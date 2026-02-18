/**
 * Working Memory Assessment Battery
 * Includes: Digit Span Forward, Digit Span Backward
 * Age-normed scoring for ages 8-18 years
 */

const workingMemoryBattery = {
    dimension: 'working_memory',
    name: 'Working Memory Assessment',
    description: 'Measures your ability to hold and manipulate information in mind',

    // Digit Span Forward (Phonological Loop)
    digitSpanForward: {
        name: 'Digit Span Forward',
        subtest: 'verbal_short_term',
        instructions: 'Listen to the numbers. When finished, enter them in the SAME order you heard them.',
        adaptive: true,
        startingSpan: 3,
        maxSpan: 9,
        trialsPerSpan: 2,
        timePerDigit: 1000, // ms
        interTrialInterval: 500,

        /**
         * Generate digit sequences for a given span length
         */
        generateItems(span) {
            const items = [];
            for (let i = 0; i < this.trialsPerSpan; i++) {
                const sequence = [];
                const usedDigits = new Set();

                // Generate unique digits (no repeats in same sequence)
                while (sequence.length < span) {
                    const digit = Math.floor(Math.random() * 9) + 1; // 1-9
                    if (!usedDigits.has(digit)) {
                        sequence.push(digit);
                        usedDigits.add(digit);
                    }
                }

                items.push({
                    id: `dsf_${span}_${i}`,
                    type: 'digit_span_forward',
                    subtest: 'verbal_short_term',
                    span,
                    sequence,
                    correctResponse: sequence,
                    timePerDigit: this.timePerDigit,
                    interTrialInterval: this.interTrialInterval
                });
            }
            return items;
        },

        /**
         * Check if response is correct
         */
        checkCorrect(item, response) {
            if (!Array.isArray(response) || response.length !== item.sequence.length) {
                return false;
            }
            return item.sequence.every((digit, i) => digit === response[i]);
        }
    },

    // Digit Span Backward (Central Executive / Working Memory)
    digitSpanBackward: {
        name: 'Digit Span Backward',
        subtest: 'verbal_working',
        instructions: 'Listen to the numbers. When finished, enter them in REVERSE order (backwards).',
        adaptive: true,
        startingSpan: 2,
        maxSpan: 8,
        trialsPerSpan: 2,
        timePerDigit: 1000,
        interTrialInterval: 500,

        generateItems(span) {
            const items = [];
            for (let i = 0; i < this.trialsPerSpan; i++) {
                const sequence = [];
                const usedDigits = new Set();

                while (sequence.length < span) {
                    const digit = Math.floor(Math.random() * 9) + 1;
                    if (!usedDigits.has(digit)) {
                        sequence.push(digit);
                        usedDigits.add(digit);
                    }
                }

                items.push({
                    id: `dsb_${span}_${i}`,
                    type: 'digit_span_backward',
                    subtest: 'verbal_working',
                    span,
                    sequence,
                    correctResponse: [...sequence].reverse(), // Reversed for backward
                    timePerDigit: this.timePerDigit,
                    interTrialInterval: this.interTrialInterval
                });
            }
            return items;
        },

        checkCorrect(item, response) {
            if (!Array.isArray(response) || response.length !== item.sequence.length) {
                return false;
            }
            // Check if response matches reversed sequence
            return item.correctResponse.every((digit, i) => digit === response[i]);
        }
    },

    /**
     * Age-normed tables (ages 8-18)
     * Data based on WISC-V standardization
     * Format: { forward: { mean, sd }, backward: { mean, sd } }
     */
    norms: {
        96: { forward: { mean: 5.2, sd: 1.1 }, backward: { mean: 3.1, sd: 0.9 } },  // 8 years
        102: { forward: { mean: 5.5, sd: 1.1 }, backward: { mean: 3.4, sd: 0.9 } }, // 8.5 years
        108: { forward: { mean: 5.8, sd: 1.0 }, backward: { mean: 3.8, sd: 1.0 } }, // 9 years
        114: { forward: { mean: 6.0, sd: 1.0 }, backward: { mean: 4.1, sd: 1.0 } }, // 9.5 years
        120: { forward: { mean: 6.3, sd: 1.0 }, backward: { mean: 4.4, sd: 1.1 } }, // 10 years
        126: { forward: { mean: 6.5, sd: 1.0 }, backward: { mean: 4.6, sd: 1.0 } }, // 10.5 years
        132: { forward: { mean: 6.7, sd: 0.9 }, backward: { mean: 4.9, sd: 1.0 } }, // 11 years
        138: { forward: { mean: 6.8, sd: 0.9 }, backward: { mean: 5.1, sd: 1.0 } }, // 11.5 years
        144: { forward: { mean: 7.0, sd: 0.9 }, backward: { mean: 5.3, sd: 1.0 } }, // 12 years
        150: { forward: { mean: 7.1, sd: 0.9 }, backward: { mean: 5.4, sd: 0.9 } }, // 12.5 years
        156: { forward: { mean: 7.2, sd: 0.8 }, backward: { mean: 5.6, sd: 0.9 } }, // 13 years
        162: { forward: { mean: 7.3, sd: 0.8 }, backward: { mean: 5.7, sd: 0.9 } }, // 13.5 years
        168: { forward: { mean: 7.4, sd: 0.8 }, backward: { mean: 5.9, sd: 0.9 } }, // 14 years
        174: { forward: { mean: 7.4, sd: 0.8 }, backward: { mean: 6.0, sd: 0.8 } }, // 14.5 years
        180: { forward: { mean: 7.5, sd: 0.7 }, backward: { mean: 6.1, sd: 0.8 } }, // 15 years
        186: { forward: { mean: 7.6, sd: 0.7 }, backward: { mean: 6.2, sd: 0.8 } }, // 15.5 years
        192: { forward: { mean: 7.6, sd: 0.7 }, backward: { mean: 6.3, sd: 0.8 } }, // 16 years
        198: { forward: { mean: 7.7, sd: 0.7 }, backward: { mean: 6.3, sd: 0.7 } }, // 16.5 years
        204: { forward: { mean: 7.7, sd: 0.7 }, backward: { mean: 6.4, sd: 0.7 } }, // 17 years
        210: { forward: { mean: 7.8, sd: 0.6 }, backward: { mean: 6.4, sd: 0.7 } }, // 17.5 years
        216: { forward: { mean: 7.8, sd: 0.6 }, backward: { mean: 6.5, sd: 0.7 } }  // 18 years
    },

    /**
     * Get nearest norm for a given age in months
     */
    getNorm(ageMonths) {
        const ages = Object.keys(this.norms).map(Number).sort((a, b) => a - b);
        const nearestAge = ages.reduce((prev, curr) =>
            Math.abs(curr - ageMonths) < Math.abs(prev - ageMonths) ? curr : prev
        );
        return this.norms[nearestAge];
    },

    /**
     * Calculate final working memory score
     */
    calculateScore(ageMonths, forwardSpan, backwardSpan) {
        const norm = this.getNorm(ageMonths);

        // Calculate scaled scores (mean 10, SD 3) for each subtest
        const forwardZScore = (forwardSpan - norm.forward.mean) / norm.forward.sd;
        const backwardZScore = (backwardSpan - norm.backward.mean) / norm.backward.sd;

        const forwardScaled = Math.round(10 + (forwardZScore * 3));
        const backwardScaled = Math.round(10 + (backwardZScore * 3));

        // Clamp to valid range (1-19)
        const forwardSS = Math.max(1, Math.min(19, forwardScaled));
        const backwardSS = Math.max(1, Math.min(19, backwardScaled));

        // Calculate composite Working Memory Index (mean 100, SD 15)
        const sumScaled = forwardSS + backwardSS;
        const compositeZScore = (sumScaled - 20) / 6; // Sum of two subtests mean=20, SD=6
        const composite = Math.round(100 + (compositeZScore * 15));

        // Clamp to valid range (40-160)
        const compositeScore = Math.max(40, Math.min(160, composite));

        // Convert to percentile
        const percentile = this.standardScoreToPercentile(compositeScore);

        // Calculate 95% confidence interval
        const sem = 5; // Standard error of measurement for WMI
        const ci = [
            Math.max(40, Math.round(compositeScore - 1.96 * sem)),
            Math.min(160, Math.round(compositeScore + 1.96 * sem))
        ];

        return {
            forwardSpan,
            backwardSpan,
            forwardScaledScore: forwardSS,
            backwardScaledScore: backwardSS,
            compositeScore,
            percentile,
            confidenceInterval: ci,
            ageNorm: norm
        };
    },

    /**
     * Convert standard score to percentile using normal distribution
     */
    standardScoreToPercentile(score) {
        const z = (score - 100) / 15;
        const percentile = this.normalCDF(z) * 100;
        return Math.round(Math.max(0.1, Math.min(99.9, percentile)));
    },

    /**
     * Normal cumulative distribution function
     */
    normalCDF(z) {
        if (z < -6) return 0;
        if (z > 6) return 1;

        const t = 1 / (1 + 0.2316419 * Math.abs(z));
        const d = 0.3989423 * Math.exp(-z * z / 2);
        const probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));

        return z > 0 ? 1 - probability : probability;
    },

    /**
     * Determine if testing should continue (adaptive logic)
     */
    shouldContinue(results, currentSpan) {
        // Get results for current span
        const currentResults = results.filter(r => r.span === currentSpan);

        if (currentResults.length < 2) {
            return { continue: true, reason: 'incomplete_span' };
        }

        const correctCount = currentResults.filter(r => r.correct).length;

        // Discontinue if both trials failed
        if (correctCount === 0) {
            return { continue: false, reason: 'two_failures', finalSpan: currentSpan - 1 };
        }

        // Continue if at least one correct
        return { continue: true, reason: 'has_success', nextSpan: currentSpan + 1 };
    },

    /**
     * Generate full battery for a test session
     */
    generateBattery(testType = 'standard') {
        const items = [];

        // Forward: spans 3-9 (2 trials each = 14 items max)
        if (testType === 'standard' || testType === 'full') {
            for (let span = this.digitSpanForward.startingSpan; span <= this.digitSpanForward.maxSpan; span++) {
                items.push(...this.digitSpanForward.generateItems(span));
            }
        }

        // Backward: spans 2-8 (2 trials each = 14 items max)
        if (testType === 'standard' || testType === 'full') {
            for (let span = this.digitSpanBackward.startingSpan; span <= this.digitSpanBackward.maxSpan; span++) {
                items.push(...this.digitSpanBackward.generateItems(span));
            }
        }

        return {
            id: `wm_battery_${Date.now()}`,
            dimension: this.dimension,
            name: this.name,
            testType,
            duration_minutes: 8,
            items,
            instructions: 'You will see numbers appear one at a time. Remember them in order.',
            adaptive: true
        };
    }
};

module.exports = workingMemoryBattery;
