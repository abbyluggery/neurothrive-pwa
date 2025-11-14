/**
 * Imposter Syndrome Detector Unit Tests
 * Tests pattern matching, severity calculation, and suggestions
 */

const { ImposterSyndromeDetector } = require('../js/imposter-detection.js');

describe('ImposterSyndromeDetector', () => {
  let detector;

  beforeEach(() => {
    detector = new ImposterSyndromeDetector();
  });

  describe('Pattern Detection', () => {
    test('should detect strong imposter syndrome phrases', () => {
      const result = detector.detect("I'm such a fraud");
      expect(result.detected).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(3);
      expect(result.severity).toBe('moderate');
    });

    test('should detect "I don\'t belong here"', () => {
      const result = detector.detect("I don't belong here");
      expect(result.detected).toBe(true);
      expect(result.matches[0].category).toBe('belonging');
    });

    test('should detect luck attribution', () => {
      const result = detector.detect("I just got lucky");
      expect(result.detected).toBe(true);
      expect(result.matches.some(m => m.category === 'luck')).toBe(true);
    });

    test('should detect competence doubts', () => {
      const result = detector.detect("I'm not good enough");
      expect(result.detected).toBe(true);
      expect(result.matches.some(m => m.category === 'competence')).toBe(true);
    });

    test('should not detect normal positive statements', () => {
      const result = detector.detect("I'm feeling great today!");
      expect(result.detected).toBe(false);
      expect(result.score).toBe(0);
    });

    test('should not detect neutral statements', () => {
      const result = detector.detect("I went to the store");
      expect(result.detected).toBe(false);
    });
  });

  describe('Severity Calculation', () => {
    test('should calculate mild severity', () => {
      const result = detector.detect("Maybe I'm not cut out for this");
      expect(result.severity).toBe('mild');
    });

    test('should calculate moderate severity', () => {
      const result = detector.detect("I'm such a fraud and I just got lucky");
      expect(result.severity).toBe('moderate');
    });

    test('should calculate severe severity for multiple patterns', () => {
      const result = detector.detect(
        "I'm a fraud, I don't belong here, and everyone will find out I'm faking it"
      );
      expect(result.severity).toBe('severe');
      expect(result.score).toBeGreaterThanOrEqual(5);
    });

    test('should return none for no detection', () => {
      const result = detector.detect("Happy thoughts");
      expect(result.severity).toBe('none');
    });
  });

  describe('Score Accumulation', () => {
    test('should accumulate score from multiple patterns', () => {
      const result = detector.detect(
        "I'm a fraud and I just got lucky. I don't belong here."
      );
      expect(result.score).toBeGreaterThan(3);
      expect(result.matches.length).toBeGreaterThan(1);
    });

    test('should handle case-insensitive matching', () => {
      const lower = detector.detect("i'm a fraud");
      const upper = detector.detect("I'M A FRAUD");
      const mixed = detector.detect("I'm A fRaUd");

      expect(lower.detected).toBe(true);
      expect(upper.detected).toBe(true);
      expect(mixed.detected).toBe(true);
    });
  });

  describe('Category Classification', () => {
    test('should classify identity-related thoughts', () => {
      const result = detector.detect("I'm such an imposter");
      expect(result.matches[0].category).toBe('identity');
    });

    test('should classify fear-related thoughts', () => {
      const result = detector.detect("What if they find out I don't know what I'm doing");
      expect(result.matches.some(m => m.category === 'fear')).toBe(true);
    });

    test('should classify comparison thoughts', () => {
      const result = detector.detect("Everyone else knows more than me");
      expect(result.matches.some(m => m.category === 'comparison')).toBe(true);
    });
  });

  describe('Suggestions Generation', () => {
    test('should provide suggestions for detected patterns', () => {
      const result = detector.detect("I'm a fraud");
      expect(result.suggestions.length).toBeGreaterThan(0);
      expect(result.suggestions[0]).toHaveProperty('title');
      expect(result.suggestions[0]).toHaveProperty('text');
      expect(result.suggestions[0]).toHaveProperty('prompt');
    });

    test('should provide relevant suggestions for categories', () => {
      const result = detector.detect("I just got lucky");
      const suggestion = result.suggestions.find(s =>
        s.title.toLowerCase().includes('luck') ||
        s.title.toLowerCase().includes('effort')
      );
      expect(suggestion).toBeDefined();
    });

    test('should provide CBT reminder for multiple categories', () => {
      const result = detector.detect(
        "I'm a fraud, I don't belong, and I just got lucky"
      );
      const cbtSuggestion = result.suggestions.find(s =>
        s.title.toLowerCase().includes('cognitive')
      );
      expect(cbtSuggestion).toBeDefined();
    });
  });

  describe('Utility Methods', () => {
    test('getSeverityColor should return correct colors', () => {
      expect(detector.getSeverityColor('none')).toBe('var(--success)');
      expect(detector.getSeverityColor('mild')).toBe('var(--accent)');
      expect(detector.getSeverityColor('moderate')).toBe('var(--warning)');
      expect(detector.getSeverityColor('severe')).toBe('var(--error)');
    });

    test('getSeverityEmoji should return correct emojis', () => {
      expect(detector.getSeverityEmoji('none')).toBe('✅');
      expect(detector.getSeverityEmoji('mild')).toBe('💛');
      expect(detector.getSeverityEmoji('moderate')).toBe('⚠️');
      expect(detector.getSeverityEmoji('severe')).toBe('🚨');
    });

    test('getEncouragement should return appropriate messages', () => {
      const messages = {
        none: detector.getEncouragement('none'),
        mild: detector.getEncouragement('mild'),
        moderate: detector.getEncouragement('moderate'),
        severe: detector.getEncouragement('severe'),
      };

      expect(messages.none).toContain('No imposter syndrome');
      expect(messages.mild).toContain('Mild');
      expect(messages.moderate).toContain('Moderate');
      expect(messages.severe).toContain('Strong');
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty string', () => {
      const result = detector.detect('');
      expect(result.detected).toBe(false);
      expect(result.score).toBe(0);
    });

    test('should handle null input', () => {
      const result = detector.detect(null);
      expect(result.detected).toBe(false);
    });

    test('should handle undefined input', () => {
      const result = detector.detect(undefined);
      expect(result.detected).toBe(false);
    });

    test('should handle non-string input', () => {
      const result = detector.detect(123);
      expect(result.detected).toBe(false);
    });

    test('should handle very long text', () => {
      const longText = "I'm feeling okay. ".repeat(1000) + "I'm a fraud";
      const result = detector.detect(longText);
      expect(result.detected).toBe(true);
    });
  });

  describe('Pattern Variations', () => {
    test('should detect variations of fraud', () => {
      expect(detector.detect("I'm such a fraud").detected).toBe(true);
      expect(detector.detect("I'm a fake").detected).toBe(true);
      expect(detector.detect("I'm an imposter").detected).toBe(true);
    });

    test('should detect variations of luck', () => {
      expect(detector.detect("I just got lucky").detected).toBe(true);
      expect(detector.detect("It was just luck").detected).toBe(true);
      expect(detector.detect("I was fortunate").detected).toBe(true);
    });

    test('should detect minimizing achievements', () => {
      expect(detector.detect("Anyone could have done this").detected).toBe(true);
      expect(detector.detect("Anyone could have done it").detected).toBe(true);
    });
  });
});
