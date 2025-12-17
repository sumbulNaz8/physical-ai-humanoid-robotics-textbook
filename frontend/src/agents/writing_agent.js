/**
 * Type alias for a collection of research notes, typically strings of facts or summaries.
 */
const ResearchNotes = Array;

/**
 * Type alias for an outline, which is an ordered list of headings and sub-headings.
 */
const Outline = Array;

/**
 * A reusable Writing Agent responsible for converting research outputs
 * into structured, high-quality book content.
 *
 * This agent simulates content generation and styling based on provided inputs.
 * It's designed to demonstrate the concept of a writing agent in a sandbox environment
 * without direct external API calls to LLMs or advanced NLP services.
 * The logic provided for each skill is deterministic and heuristic-based.
 */
export class WritingAgent {
    constructor(defaultStyle = "academic") {
        this.defaultStyle = defaultStyle;
        console.log(`[WritingAgent] Initialized with default style: '${this.defaultStyle}'`);
    }

    /**
     * Generates a structured outline for a given topic.
     * This method simulates a sophisticated outlining process by breaking down
     * the topic into an introduction, core principles, and detailed sections.
     *
     * @param {string} topic The main subject or chapter title for which to generate the outline.
     * @returns {Array} An array of strings, where each string is a heading or sub-heading in the outline.
     */
    generateOutline(topic) {
        console.log(`[WritingAgent] Generating outline for topic: '${topic}'`);
        if (!topic || topic.trim() === "") {
            console.warn("[WritingAgent] generateOutline: No topic provided. Returning empty outline.");
            return [];
        }

        const formattedTopic = topic.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const keywords = topic.toLowerCase().split(' ').filter(word => word.length > 2);
        const outline = [];

        outline.push(`Introduction to ${formattedTopic}`);
        outline.push(`  1.1 Defining ${keywords[0] || 'Core Concepts'}`);
        if (keywords.length > 1) {
            outline.push(`  1.2 Historical Context of ${keywords[0]} and ${keywords[1]}`);
        } else {
            outline.push(`  1.2 Background and Evolution`);
        }
        outline.push(`  1.3 Significance and Future Prospects`);

        outline.push(`Core Principles of ${formattedTopic}`);
        outline.push(`  2.1 Foundational Theories and Models`);
        outline.push(`  2.2 Key Methodologies and Approaches`);
        outline.push(`  2.3 Practical Applications and Case Studies`);

        console.log(`[WritingAgent] Successfully generated outline for '${formattedTopic}'.`);
        return outline;
    }

    /**
     * Writes a coherent section of book content based on a specific heading
     * and relevant research notes. It integrates the notes into a narrative.
     *
     * @param {string} heading The title of the section to be written.
     * @param {Array} researchNotes An array of research facts, summaries, or key points.
     * @returns {string} A string containing the formatted section content.
     */
    writeSection(heading, researchNotes) {
        console.log(`[WritingAgent] Writing section: '${heading}' with ${researchNotes.length} research notes.`);
        if (!heading || heading.trim() === "") {
            console.warn("[WritingAgent] writeSection: No heading provided. Returning empty string.");
            return "";
        }

        let sectionContent = `## ${heading}\n\n`;
        sectionContent += `This section meticulously examines the critical aspects pertaining to **${heading}**. `;

        if (researchNotes.length > 0) {
            sectionContent += `Drawing upon comprehensive data, including insights such as: \n\n`;
            researchNotes.forEach((note, index) => {
                sectionContent += `- *${note.trim().replace(/[^a-zA-Z0-9 .,!?;:'"()-]/g, '').trim()}*.\n`; // Clean and format note
            });
            sectionContent += `\nThis detailed synthesis underscores the fundamental principles and practical implications crucial for a thorough understanding of ${heading.toLowerCase()}.`;
        } else {
            sectionContent += `While specific research notes were not available for this segment, the foundational importance of ${heading.toLowerCase()} is universally acknowledged within the discipline. This introduction lays the groundwork for a more profound exploration.`;
        }

        console.log(`[WritingAgent] Finished writing section for '${heading}'.`);
        return sectionContent;
    }

    /**
     * Expands an entire chapter by iterating through an outline and generating
     * content for each major heading, leveraging comprehensive research notes.
     * It uses `writeSection` internally for detailed content generation.
     *
     * @param {Array} outline An array of strings representing the chapter's outline.
     * @param {Array} researchNotes A comprehensive collection of research notes pertinent to the entire chapter.
     * @returns {string} A single string containing the entire expanded chapter content.
     */
    expandChapter(outline, researchNotes) {
        console.log(`[WritingAgent] Expanding chapter with ${outline.length} outline items and ${researchNotes.length} research notes.`);
        if (!outline || outline.length === 0) {
            console.warn("[WritingAgent] expandChapter: No outline provided. Returning empty chapter.");
            return "";
        }

        let chapterContent = "";
        outline.forEach(outlineItem => {
            const trimmedItem = outlineItem.trim();
            if (trimmedItem.startsWith('Chapter ')) {
                // Main Chapter Heading
                chapterContent += `# ${trimmedItem}\n\n`;
            } else if (trimmedItem.match(/^\d+\.\d+\s/)) { // Matches "X.Y " sub-headings
                const heading = trimmedItem.replace(/^\d+\.\d+\s/, '');
                // Simple heuristic: try to find notes relevant to the first word of the heading
                const relevantNotes = researchNotes.filter(note =>
                    note.toLowerCase().includes(heading.toLowerCase().split(' ')[0] || '')
                );
                // Use relevant notes, or a subset of all notes if no specific ones found
                const notesForSection = relevantNotes.length > 0 ? relevantNotes : researchNotes.slice(0, Math.min(2, researchNotes.length));
                chapterContent += this.writeSection(heading, notesForSection) + '\n\n';
            } else {
                // Other types of sub-headings (e.g., 1.1.1 or just text)
                chapterContent += `### ${trimmedItem}\n\n`;
                const notesForSection = researchNotes.slice(0, Math.min(1, researchNotes.length)); // Use just one note for simpler headings
                chapterContent += this.writeSection(trimmedItem, notesForSection) + '\n\n';
            }
        });
        console.log("[WritingAgent] Finished expanding chapter.");
        return chapterContent;
    }

    /**
     * Applies a specific style guide to the given text, transforming its tone or format.
     * This method simulates stylistic adjustments based on common writing conventions.
     *
     * @param {string} text The input text string to which to apply the style.
     * @param {string} style An optional string (e.g., "formal", "concise", "academic", "simple")
     *              indicating the desired stylistic transformation.
     *              If not provided, the agent's default style is used.
     * @returns {string} The text with the simulated style applied.
     */
    applyStyleGuide(text, style) {
        const effectiveStyle = style || this.defaultStyle;
        console.log(`[WritingAgent] Applying style guide: '${effectiveStyle}' to text (length: ${text.length}).`);

        if (!text || text.trim() === "") {
            console.warn("[WritingAgent] applyStyleGuide: No text provided. Returning empty string.");
            return "";
        }

        let styledText = text;

        switch (effectiveStyle.toLowerCase()) {
            case "formal":
                styledText = text
                    .replace(/\bi\b/g, 'one')
                    .replace(/\bwe\b/g, 'the authors')
                    .replace(/can't/g, 'cannot')
                    .replace(/don't/g, 'do not')
                    .replace(/It's/g, 'It is')
                    .replace(/\byou\b/g, 'the reader')
                    .replace(/a lot of/g, 'numerous');
                styledText = `[FORMAL STYLE START]\n${styledText}\n[FORMAL STYLE END]`;
                break;
            case "concise":
                styledText = text
                    .replace(/^(The purpose of this section is to discuss|This section explores)/i, '') // Remove intros
                    .replace(/(\.){2,}/g, '.') // Reduce multiple periods
                    .replace(/\s(a|an|the|is|are|was|were|that|this|it|just|really|very)\s/gi, ' ') // Remove filler words
                    .replace(/\s+/g, ' ').trim(); // Reduce multiple spaces
                styledText = `[CONCISE STYLE START]\n${styledText}\n[CONCISE STYLE END]`;
                break;
            case "academic":
                styledText = text
                    .replace(/([A-Z][a-z]+(\s[A-Z][a-z]+)*)/g, (match) => `*${match}*`) // Italicize potential proper nouns/terms
                    .replace(/\b(is|are|was|were)\b/g, 'can be observed as');
                styledText = `[ACADEMIC STYLE START]\n${styledText}\n(Citation: [Author, Year])\n[ACADEMIC STYLE END]`;
                break;
            case "simple":
                styledText = text
                    .replace(/However, /g, 'But, ')
                    .replace(/consequently/g, 'so')
                    .replace(/therefore/g, 'so')
                    .replace(/utilize/g, 'use')
                    .replace(/advanced/g, 'simple')
                    .replace(/complex/g, 'easy')
                    .replace(/sophisticated/g, 'basic');
                styledText = `[SIMPLE STYLE START]\n${styledText}\n[SIMPLE STYLE END]`;
                break;
            default:
                console.warn(`[WritingAgent] applyStyleGuide: Unknown style '${effectiveStyle}'. Returning original text.`);
        }
        console.log(`[WritingAgent] Finished applying style guide: '${effectiveStyle}'.`);
        return styledText;
    }
}

/**
 * Demonstrates the functionality of the WritingAgent class end-to-end.
 * This function showcases how outlines are generated, sections are written,
 * chapters are expanded, and different style guides are applied.
 */
export function demoWritingAgent() {
    console.log("\n======================================");
    console.log(">>> Starting Writing Agent Demo <<< ");
    console.log("======================================");

    const agent = new WritingAgent("academic"); // Initialize with a default academic style

    const demoTopic = "Physical AI and Humanoid Robotics";
    const researchNotesForDemo = [
        "Physical AI integrates AI algorithms with robotic bodies, enabling interaction with the real world.",
        "Humanoid robots are designed to mimic human form and behavior, presenting unique challenges.",
        "Key challenges in this field include robust perception, dexterous manipulation, and ethical considerations.",
        "ROS2 and NVIDIA Isaac are foundational software frameworks used for developing robotic applications.",
        "Embodied intelligence, where intelligence arises from physical interaction, is a crucial concept.",
        "Advanced locomotion techniques are essential for humanoid robots to navigate complex, unstructured environments."
    ];

    // --- Demo Step 1: Generate Outline ---
    console.log("\n--- [STEP 1] Generating Outline ---");
    console.log(`Input Topic: "${demoTopic}"`);
    const outline = agent.generateOutline(demoTopic);
    console.log("Output Outline:");
    outline.forEach((item, index) => console.log(`  ${index + 1}. ${item}`));

    // --- Demo Step 2: Write a Section ---
    console.log("\n--- [STEP 2] Writing a Section ---");
    const sectionHeading = "Defining Physical AI";
    // Filter research notes relevant to this specific section
    const sectionSpecificNotes = researchNotesForDemo.filter(note => note.includes("Physical AI"));
    console.log(`Input Heading: "${sectionHeading}"`);
    console.log(`Input Research Notes (filtered): [${sectionSpecificNotes.map(n => `'${n.substring(0, 30)}...'`).join(', ')}]`);
    const sectionContent = agent.writeSection(sectionHeading, sectionSpecificNotes);
    console.log(`Output Section Content (first 300 chars):\n${sectionContent.substring(0, 300)}...\n`);

    // --- Demo Step 3: Expand a Chapter ---
    console.log("\n--- [STEP 3] Expanding a Chapter ---");
    const chapterTopic = "Humanoid Robot Perception";
    const chapterOutline = agent.generateOutline(chapterTopic).slice(0, 5); // Take first few items for a chapter
    console.log(`Input Chapter Outline (generated for "${chapterTopic}"):`);
    chapterOutline.forEach((item, index) => console.log(`  ${index + 1}. ${item}`));
    console.log(`Input Research Notes (comprehensive): [${researchNotesForDemo.map(n => `'${n.substring(0, 30)}...'`).join(', ')}]`);
    const expandedChapterContent = agent.expandChapter(chapterOutline, researchNotesForDemo);
    console.log(`Output Expanded Chapter Content (first 800 chars):\n${expandedChapterContent.substring(0, 800)}...\n`);

    // --- Demo Step 4: Apply Style Guide ---
    console.log("\n--- [STEP 4] Applying Style Guide ---");
    const textToStyle = "This is a simple text that needs to be formatted for an academic paper. We will ensure proper terminology. However, it needs to be concise and easy to understand.";
    console.log(`Original Text for Styling:\n'${textToStyle}'`);

    console.log("\n  Applying Academic Style (default):");
    const styledAcademic = agent.applyStyleGuide(textToStyle); // Uses default 'academic'
    console.log(`  Output Academic Style:\n'${styledAcademic}'`);

    console.log("\n  Applying Concise Style:");
    const styledConcise = agent.applyStyleGuide(textToStyle, "concise");
    console.log(`  Output Concise Style:\n'${styledConcise}'`);

    console.log("\n  Applying Formal Style:");
    const styledFormal = agent.applyStyleGuide(textToStyle, "formal");
    console.log(`  Output Formal Style:\n'${styledFormal}'`);

    console.log("\n--- [STEP 5] Testing with Empty/Invalid Inputs ---");
    console.log("  generateOutline(''):", agent.generateOutline(''));
    console.log("  writeSection('', ['note']):", agent.writeSection('', ['note']));
    console.log("  expandChapter([], ['note']):", agent.expandChapter([], ['note']));
    console.log("  applyStyleGuide('', 'formal'):", agent.applyStyleGuide('', 'formal'));

    console.log("\n======================================");
    console.log(">>> Writing Agent Demo Finished <<< ");
    console.log("======================================");
}