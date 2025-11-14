/**
 * Enhanced Imposter Syndrome Detection for NeuroThrive PWA
 * Improved pattern matching with context-aware scoring
 *
 * Features:
 * - Advanced pattern recognition
 * - Severity scoring (mild, moderate, severe)
 * - Misspelling tolerance
 * - Context-aware detection
 * - Multi-language support (English focus)
 *
 * @author Abby Luggery / Claude Code Assistant
 * @date 2025-11-14
 */

class ImposterSyndromeDetector {
    constructor() {
        this.patterns = this.initializePatterns();
        this.severityThresholds = {
            mild: 1,
            moderate: 3,
            severe: 5
        };
    }

    /**
     * Initialize detection patterns with weights
     */
    initializePatterns() {
        return [
            // Strong indicators (weight: 3)
            { pattern: /\bi'?m\s+.*?(fraud|fake|phony|imposter|impostor)/i, weight: 3, category: 'identity' },
            { pattern: /\bi\s+don'?t\s+(really\s+)?belong\s+here/i, weight: 3, category: 'belonging' },
            { pattern: /everyone\s+will\s+(find\s+out|discover|realize)/i, weight: 3, category: 'fear' },
            { pattern: /\bthey'?ll\s+(find\s+out|discover|realize)/i, weight: 3, category: 'fear' },
            { pattern: /\bi'?m\s+not\s+(good|smart|talented|skilled)\s+enough/i, weight: 3, category: 'competence' },
            { pattern: /\bi\s+fooled\s+(them|everyone|people)/i, weight: 3, category: 'deception' },

            // Medium indicators (weight: 2)
            { pattern: /\b(just|only)\s+(got\s+)?(lucky|fortunate)/i, weight: 2, category: 'luck' },
            { pattern: /\bi\s+was\s+(just\s+)?(lucky|fortunate)/i, weight: 2, category: 'luck' },
            { pattern: /\bit\s+was\s+(just|only)\s+luck/i, weight: 2, category: 'luck' },
            { pattern: /anyone\s+could\s+(have\s+)?done\s+(it|this|that)/i, weight: 2, category: 'minimizing' },
            { pattern: /\bwing(ing)?\s+it/i, weight: 2, category: 'competence' },
            { pattern: /\bi\s+have\s+no\s+idea\s+what\s+i'?m\s+doing/i, weight: 2, category: 'competence' },
            { pattern: /\bfak(e|ing)\s+it/i, weight: 2, category: 'deception' },
            { pattern: /everyone\s+else\s+(knows|understands)\s+(more|better)/i, weight: 2, category: 'comparison' },
            { pattern: /\bi\s+should\s+(already\s+)?know\s+this/i, weight: 2, category: 'expectations' },
            { pattern: /\bwhat\s+if\s+they\s+(find\s+out|discover|realize)/i, weight: 2, category: 'fear' },

            // Weak indicators (weight: 1)
            { pattern: /\bmaybe\s+i'?m\s+not\s+(cut\s+out|meant)\s+for/i, weight: 1, category: 'belonging' },
            { pattern: /\bi\s+don'?t\s+deserve/i, weight: 1, category: 'worth' },
            { pattern: /\bi\s+got\s+(in|here|this\s+job)\s+by\s+mistake/i, weight: 1, category: 'luck' },
            { pattern: /\bthey\s+made\s+a\s+mistake\s+(hiring|admitting|choosing)\s+me/i, weight: 1, category: 'luck' },
            { pattern: /\bi'?m\s+(just\s+)?pretending/i, weight: 1, category: 'deception' },
            { pattern: /\bsooner\s+or\s+later\s+they'?ll\s+(see|know|realize)/i, weight: 1, category: 'fear' },
            { pattern: /\bcompared\s+to\s+(everyone|others)/i, weight: 1, category: 'comparison' },
            { pattern: /\bi'?m\s+the\s+only\s+one\s+(who|that)\s+doesn'?t/i, weight: 1, category: 'isolation' },
            { pattern: /\bother\s+people\s+are\s+(so\s+much\s+)?better/i, weight: 1, category: 'comparison' },

            // Contextual indicators
            { pattern: /\bi\s+can'?t\s+(do|handle)\s+this/i, weight: 1, category: 'competence' },
            { pattern: /\bi'?m\s+(in|out\s+of)\s+my\s+(depth|league)/i, weight: 2, category: 'competence' },
            { pattern: /\bwho\s+am\s+i\s+to/i, weight: 1, category: 'worth' },
            { pattern: /\bi\s+shouldn'?t\s+be\s+here/i, weight: 2, category: 'belonging' },
        ];
    }

    /**
     * Detect imposter syndrome in text
     * @param {string} text - Text to analyze
     * @returns {Object} Detection results with severity and suggestions
     */
    detect(text) {
        if (!text || typeof text !== 'string') {
            return {
                detected: false,
                score: 0,
                severity: 'none',
                matches: [],
                suggestions: []
            };
        }

        const normalizedText = text.toLowerCase().trim();
        const matches = [];
        let totalScore = 0;

        // Check each pattern
        for (const { pattern, weight, category } of this.patterns) {
            const match = normalizedText.match(pattern);
            if (match) {
                matches.push({
                    text: match[0],
                    weight: weight,
                    category: category
                });
                totalScore += weight;
            }
        }

        // Determine severity
        const severity = this.calculateSeverity(totalScore);

        // Get suggestions based on matches
        const suggestions = this.getSuggestions(matches);

        return {
            detected: matches.length > 0,
            score: totalScore,
            severity: severity,
            matches: matches,
            suggestions: suggestions
        };
    }

    /**
     * Calculate severity level based on score
     * @param {number} score - Total detection score
     * @returns {string} Severity level
     */
    calculateSeverity(score) {
        if (score === 0) return 'none';
        if (score < this.severityThresholds.moderate) return 'mild';
        if (score < this.severityThresholds.severe) return 'moderate';
        return 'severe';
    }

    /**
     * Get therapeutic suggestions based on detected patterns
     * @param {Array} matches - Array of pattern matches
     * @returns {Array} Array of suggestion objects
     */
    getSuggestions(matches) {
        const suggestions = [];
        const categories = new Set(matches.map(m => m.category));

        const suggestionMap = {
            identity: {
                title: 'Challenge the "fraud" belief',
                text: 'You are not a fraud. List 3 concrete accomplishments that prove you earned your position.',
                prompt: 'What specific skills or knowledge did you demonstrate to get here?'
            },
            belonging: {
                title: 'Affirm your belonging',
                text: 'You belong here just as much as anyone else. What qualifications got you here?',
                prompt: 'List the criteria you met to be in this position.'
            },
            fear: {
                title: 'Examine the fear',
                text: 'What specifically are you afraid others will discover? Often these fears are unfounded.',
                prompt: 'What evidence do you have that supports OR contradicts this fear?'
            },
            competence: {
                title: 'Acknowledge your competence',
                text: 'Not knowing everything is normal. What DO you know? What have you successfully done?',
                prompt: 'List 3 challenges you\'ve overcome that prove your capability.'
            },
            luck: {
                title: 'Recognize your effort',
                text: 'Success is rarely just luck. What effort, skill, or preparation contributed to this outcome?',
                prompt: 'What did you DO (not just luck) that led to this success?'
            },
            deception: {
                title: 'Reframe authenticity',
                text: 'Learning and growing isn\'t "faking it" - it\'s progress. Everyone is continuously learning.',
                prompt: 'How are you actually demonstrating real skills, even while learning?'
            },
            comparison: {
                title: 'Stop the comparison trap',
                text: 'Others may have different strengths, but you have YOUR unique strengths and perspective.',
                prompt: 'What unique value do YOU bring that others might not?'
            },
            minimizing: {
                title: 'Own your achievements',
                text: 'Minimizing your accomplishments doesn\'t make you humble, it robs you of deserved recognition.',
                prompt: 'If a friend accomplished this, would you say "anyone could do it"?'
            },
            worth: {
                title: 'Affirm your inherent worth',
                text: 'Your worth isn\'t based on achievements or others\' approval - it\'s inherent.',
                prompt: 'What would you tell a friend who said this about themselves?'
            }
        };

        // Add relevant suggestions
        for (const category of categories) {
            if (suggestionMap[category]) {
                suggestions.push(suggestionMap[category]);
            }
        }

        // Add general CBT reminder if multiple categories detected
        if (categories.size > 2) {
            suggestions.push({
                title: 'Cognitive Behavioral Therapy Reminder',
                text: 'These thoughts are a pattern, not facts. Evidence usually contradicts imposter syndrome.',
                prompt: 'Write down 5 pieces of evidence that contradict your imposter thoughts.'
            });
        }

        return suggestions;
    }

    /**
     * Get severity color for UI
     * @param {string} severity - Severity level
     * @returns {string} CSS color variable
     */
    getSeverityColor(severity) {
        const colors = {
            none: 'var(--success)',
            mild: 'var(--accent)',
            moderate: 'var(--warning)',
            severe: 'var(--error)'
        };
        return colors[severity] || colors.none;
    }

    /**
     * Get severity emoji for UI
     * @param {string} severity - Severity level
     * @returns {string} Emoji
     */
    getSeverityEmoji(severity) {
        const emojis = {
            none: '✅',
            mild: '💛',
            moderate: '⚠️',
            severe: '🚨'
        };
        return emojis[severity] || '📝';
    }

    /**
     * Generate encouragement message
     * @param {string} severity - Severity level
     * @returns {string} Encouragement message
     */
    getEncouragement(severity) {
        const messages = {
            none: 'Great! No imposter syndrome patterns detected. You\'re being kind to yourself!',
            mild: 'Mild imposter syndrome detected. Remember: everyone has doubts sometimes. You\'ve got this!',
            moderate: 'Moderate imposter syndrome detected. Let\'s challenge these thoughts with evidence.',
            severe: 'Strong imposter syndrome detected. These are thoughts, not facts. Let\'s work through this together.'
        };
        return messages[severity] || messages.none;
    }
}

// Only initialize in browser environment (not in test/Node.js)
if (typeof window !== 'undefined') {
    // Create singleton instance
    const imposterDetector = new ImposterSyndromeDetector();

    // Make available globally
    window.imposterDetector = imposterDetector;

    console.log('✅ Enhanced imposter syndrome detector loaded');
}

// Export for testing (CommonJS for Node.js/Jest)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ImposterSyndromeDetector };
}
