/**
 * Personalization processor that applies transformations to content
 * This module handles content transformation for the chapter content personalization feature.
 */

/**
 * Personalization processor that applies transformations to content
 */
class PersonalizationProcessor {
  /**
   * Apply personalization to content based on user preferences
   * @param {string} content - Original content to be personalized
   * @param {Object} preferences - User preferences
   * @returns {string} Personalized content
   */
  static personalizeContent(content, preferences) {
    if (!preferences) {
      console.warn('[PersonalizationProcessor] No preferences provided, returning original content');
      return content;
    }

    let personalizedContent = content;

    // Apply difficulty-based personalization
    if (preferences.difficulty) {
      switch (preferences.difficulty) {
        case 'simple':
          personalizedContent = this.applySimpleStyle(personalizedContent);
          break;
        case 'detailed':
          personalizedContent = this.applyDetailedStyle(personalizedContent);
          break;
        case 'standard':
        default:
          // No transformation needed for standard
          break;
      }
    }

    // Include user's name in the content if requested
    if (preferences.includeName && preferences.userName) {
      personalizedContent = this.includeUserInContent(personalizedContent, preferences.userName);
    }

    // Emphasize topics based on user interests
    if (preferences.interests && preferences.interests.length > 0) {
      personalizedContent = this.emphasizeInterests(personalizedContent, preferences.interests);
    }

    return personalizedContent;
  }

  /**
   * Apply simple style to content
   * @param {string} content - Content to transform
   * @returns {string} Simplified content
   */
  static applySimpleStyle(content) {
    // Replace complex terms with simpler alternatives
    let simpleContent = content
      .replace(/\badvanced\b/gi, 'simple')
      .replace(/\bcomplex\b/gi, 'easy')
      .replace(/\bsophisticated\b/gi, 'basic')
      .replace(/\butilize\b/gi, 'use')
      .replace(/\bconsequently\b/gi, 'so')
      .replace(/\btherefore\b/gi, 'so')
      .replace(/\bHowever,\s/g, 'But, ')
      .replace(/\bNevertheless,\s/g, 'But, ')
      .replace(/\bFurthermore,\s/g, 'Also, ')
      .replace(/\bMoreover,\s/g, 'Also, ');

    return simpleContent;
  }

  /**
   * Apply detailed style to content
   * @param {string} content - Content to transform
   * @returns {string} Detailed content
   */
  static applyDetailedStyle(content) {
    // Add more detail and examples to the content
    let detailedContent = content;

    // Add more examples and explanations
    detailedContent += `\n\n**Additional Details:** Further elaboration and depth to concepts...\n\n`;
    detailedContent += `*This expanded section includes additional insights, practical examples, and deeper exploration of the concepts mentioned above.*\n\n`;

    return detailedContent;
  }

  /**
   * Include user's name in content
   * @param {string} content - Content to modify
   * @param {string} userName - User's name to include
   * @returns {string} Content with user's name included
   */
  static includeUserInContent(content, userName) {
    // Replace generic terms with the user's name
    let personalizedContent = content
      .replace(/\b(user|reader|student)\b/gi, userName)
      .replace(/\bthe user\b/gi, userName)
      .replace(/\byou\b/gi, userName);

    // Add a personalized greeting if needed
    if (!content.includes(userName)) {
      personalizedContent = `Dear ${userName},\n\n${personalizedContent}`;
    }

    return personalizedContent;
  }

  /**
   * Emphasize topics based on user interests
   * @param {string} content - Content to modify
   * @param {Array} interests - Array of user interests
   * @returns {string} Content with interests emphasized
   */
  static emphasizeInterests(content, interests) {
    let emphasizedContent = content;

    interests.forEach(interest => {
      // Create a case-insensitive regex to find the interest in the content
      const regex = new RegExp(`\\b(${interest})\\b`, 'gi');

      // Emphasize the interest by wrapping it in bold/strong tags
      emphasizedContent = emphasizedContent.replace(regex, '**$1**');
    });

    // Add a note about the emphasis
    if (interests.length > 0) {
      const interestSummary = interests.join(', ');
      emphasizedContent += `\n\n*Note: This content has been tailored based on your interests in ${interestSummary}.*`;
    }

    return emphasizedContent;
  }
}

export { PersonalizationProcessor };