import logging
from typing import List, Dict, Any, Optional
import re

logger = logging.getLogger(__name__)

class ResearchSubagent:
    """
    A reusable Research Subagent for collecting, summarizing, extracting key points,
synthesizing information, and categorizing sources on a given topic.

    This subagent is designed to integrate into larger agentic workflows,
    providing focused research capabilities without direct external API calls
    within its core methods, simulating results for demonstration in a sandbox environment.
    """

    def __init__(self, **kwargs):
        """
        Initializes the ResearchSubagent.

        Args:
            **kwargs: Additional configuration parameters.
        """
        self.config = kwargs
        logger.info("ResearchSubagent initialized.")

    def collect_sources(self, topic: str, num_results: int = 3) -> List[Dict[str, Any]]:
        """
        Simulates the collection of relevant sources (e.g., URLs, document snippets)
        for a given topic.

        In a real-world scenario, this method would interface with a search engine API.
        For this sandbox demonstration, it generates plausible dummy sources.

        Args:
            topic: The topic for which to collect sources.
            num_results: The desired number of simulated search results to retrieve.

        Returns:
            A list of dictionaries, where each dictionary represents a source
            and contains 'title', 'link', 'snippet', and 'content'.
        """
        logger.info(f"--- Calling collect_sources for topic: '{topic}' with {num_results} results ---")
        sources = []

        if not topic:
            logger.warning("collect_sources: No topic provided. Returning empty list.")
            return []

        # Generate more specific dummy sources based on the topic
        for i in range(num_results):
            title = f"Research Paper on {topic} - Part {i+1}"
            link = f"https://example.com/research/{topic.lower().replace(' ', '-')}/{i+1}"
            snippet = (
                f"This snippet discusses the latest advancements and challenges related to {topic}. "
                f"It highlights key findings from recent studies and theoretical frameworks."
            )
            content = (
                f"Full detailed content from Source {i+1} about {topic}. This section delves into "
                f"the methodologies, experimental setups, and results observed in the field of {topic}. "
                f"It also touches upon the future implications and potential areas for further research. "
                f"For example, in 'Physical AI', it might detail sensor integration, control algorithms, "
                f"and embodied cognition. In 'Humanoid Robotics', it could cover biomechanics, "
                f"human-robot interaction, and advanced locomotion techniques. "
                f"The importance of robust data collection and efficient processing is emphasized here."
            )
            sources.append({"title": title, "link": link, "snippet": snippet, "content": content})
        
        logger.info(f"collect_sources: Simulated {len(sources)} sources.")
        return sources

    def summarize_sources(self, sources: List[Dict[str, Any]], summary_length_sentences: int = 3) -> str:
        """
        Summarizes a list of collected sources using a heuristic-based approach.

        In a real-world scenario, this method would typically use an LLM for summarization.
        For this sandbox demonstration, it extracts key sentences from the combined content.

        Args:
            sources: A list of dictionaries, where each dictionary represents a source
                     and should ideally contain a 'content' or 'snippet' key.
            summary_length_sentences: The desired number of sentences for the summary.

        Returns:
            A concise summary of all provided sources. Returns a default message if
            no readable content is found in sources.
        """
        logger.info(f"--- Calling summarize_sources for {len(sources)} sources ---")
        if not sources:
            logger.warning("summarize_sources: No sources provided. Returning default message.")
            return "No sources to summarize."

        combined_content = []
        for source in sources:
            content = source.get("content") or source.get("snippet")
            if content:
                combined_content.append(content)
        
        if not combined_content:
            logger.warning("summarize_sources: No readable content found in sources. Returning default message.")
            return "No readable content found in sources to summarize."

        full_text = " ".join(combined_content)
        
        # Simple heuristic summarization: split into sentences and pick the first N.
        sentences = re.split(r'(?<=[.!?])\s+', full_text)
        
        # Filter out very short or non-informative sentences
        meaningful_sentences = [s.strip() for s in sentences if len(s.split()) > 5]
        
        summary_sentences = meaningful_sentences[:summary_length_sentences]
        summary = " ".join(summary_sentences)
        
        if not summary:
            logger.warning("summarize_sources: Could not generate a summary. Returning default message.")
            return "Could not generate a summary from the provided content."

        logger.info(f"summarize_sources: Generated summary of {len(summary_sentences)} sentences.")
        return summary

    def extract_key_points(self, text: str, num_key_points: int = 3) -> List[str]:
        """
        Extracts key points from a given text (e.g., a summary or document content)
         using a heuristic-based approach.

        In a real-world scenario, this would typically involve an LLM or more advanced
        NLP techniques. For this sandbox demonstration, it identifies prominent phrases
        or sentences.

        Args:
            text: The input text from which to extract key points.
            num_key_points: The desired number of key points to extract.

        Returns:
            A list of strings, where each string is a key point. Returns an empty list
            if no key points can be extracted.
        """
        logger.info(f"--- Calling extract_key_points from text (length: {len(text)}) ---")
        if not text:
            logger.warning("extract_key_points: No text provided. Returning empty list.")
            return []

        key_points = []

        # Heuristic: split by sentences and try to pick the most informative ones.
        sentences = re.split(r'(?<=[.!?])\s+', text)
        
        # Filter out short or common sentences
        meaningful_sentences = [s.strip() for s in sentences if len(s.split()) > 7]
        
        # Prioritize sentences that might contain keywords (e.g., capitalized words)
        prioritized_sentences = sorted(
            meaningful_sentences,
            key=lambda s: len(re.findall(r'\b[A-Z][a-z]*\b', s)), # Count capitalized words
            reverse=True
        )
        
        # Select the top N unique key points
        unique_key_points = []
        for sentence in prioritized_sentences:
            if sentence not in unique_key_points:
                unique_key_points.append(sentence)
            if len(unique_key_points) >= num_key_points:
                break
        
        logger.info(f"extract_key_points: Successfully extracted {len(unique_key_points)} key points.")
        return unique_key_points

    def synthesize_information(self, summaries: List[str]) -> str:
        """
        Synthesizes multiple summaries into a single, coherent narrative using
        a heuristic-based approach.

        In a real-world scenario, this method would typically involve an LLM.
        For this sandbox demonstration, it concatenates and slightly rephrases
        the input summaries.

        Args:
            summaries: A list of individual summary strings.

        Returns:
            A single, synthesized string combining the input summaries.
        """
        logger.info(f"--- Calling synthesize_information for {len(summaries)} summaries ---")
        if not summaries:
            logger.warning("synthesize_information: No summaries provided. Returning empty string.")
            return "No information to synthesize."

        # Heuristic: Join summaries and add a concluding sentence.
        combined_synthesis = " ".join(summaries)
        
        synthesis_output = (
            f"Based on the provided information, a synthesis reveals that: "
            f"{combined_synthesis.strip()} This combined understanding "
            f"offers a comprehensive view of the diverse aspects covered."
        )
        logger.info("synthesize_information: Successfully synthesized information.")
        return synthesis_output

    def categorize_sources(self, sources: List[Dict[str, Any]], categories: Dict[str, List[str]]) -> Dict[str, List[Dict[str, Any]]]:
        """
        Categorizes a list of sources based on keywords present in their content
        or snippet, assigning them to predefined categories.

        Args:
            sources: A list of dictionaries, where each dictionary represents a source.
            categories: A dictionary where keys are category names (str) and values
                        are lists of keywords (str) associated with that category.

        Returns:
            A dictionary where keys are category names and values are lists of
            source dictionaries belonging to that category. Sources can belong
            to multiple categories.
        """
        logger.info(f"--- Calling categorize_sources for {len(sources)} sources ---")
        categorized_results: Dict[str, List[Dict[str, Any]]] = {cat: [] for cat in categories.keys()}
        
        if not sources:
            logger.warning("categorize_sources: No sources provided. Returning empty categorized results.")
            return categorized_results
        if not categories:
            logger.warning("categorize_sources: No categories provided. Returning empty categorized results.")
            return categorized_results

        for source in sources:
            text_to_analyze = (source.get("content", "") + " " + source.get("snippet", "")).lower()
            for category_name, keywords in categories.items():
                for keyword in keywords:
                    if keyword.lower() in text_to_analyze:
                        # Add a copy of the source to avoid modifying original list in dict
                        categorized_results[category_name].append(source.copy()) 
                        break # Move to the next category for this source

        logger.info("categorize_sources: Successfully categorized sources.")
        return categorized_results


def run_research_subagent_demo():
    """
    Demonstrates the functionality of the ResearchSubagent class
    by running through its collect_sources, summarize_sources,
    extract_key_points, synthesize_information, and categorize_sources methods.
    """
    # Configure logging for the demo
    logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
    
    logger.info("\n--- Starting Research Subagent Demo ---")
    print("\n--- Starting Research Subagent Demo ---")

    subagent = ResearchSubagent()

    # --- Step 1: Collect Sources ---
    print("\n[STEP 1] Collecting Sources:")
    demo_topic = "Advancements in Physical AI"
    print(f"  Input Topic: '{demo_topic}'")
    collected_sources = subagent.collect_sources(demo_topic, num_results=3)
    
    if collected_sources:
        print(f"  Output: Collected {len(collected_sources)} sources.")
        for i, source in enumerate(collected_sources):
            print(f"    Source {i+1}: Title='{source['title']}', Link='{source['link']}'")
            print(f"      Snippet: {source['snippet'][:70]}...") 
    else:
        print("  Output: No sources collected for the demo topic.")
        
    # --- Step 2: Summarize Sources ---
    print("\n[STEP 2] Summarizing Sources:")
    generated_summary = ""
    if collected_sources:
        print(f"  Input: {len(collected_sources)} sources.")
        generated_summary = subagent.summarize_sources(collected_sources, summary_length_sentences=2)
        print(f"  Output Summary: \n'{generated_summary}'")
    else:
        print("  Skipping summarization as no sources were collected.")

    # --- Step 3: Extract Key Points from Summary ---
    print("\n[STEP 3] Extracting Key Points:")
    key_points = []
    if generated_summary and generated_summary != "No sources to summarize." and generated_summary != "Could not generate a summary from the provided content.":
        print(f"  Input Summary (first 100 chars): '{generated_summary[:100]}...'")
        key_points = subagent.extract_key_points(generated_summary, num_key_points=2)
        print("  Output Key Points:")
        if key_points:
            for i, point in enumerate(key_points):
                print(f"    - {point}")
        else:
            print("    No key points extracted.")
    else:
        print("  Skipping key point extraction as no valid summary was generated.")

    # --- Step 4: Synthesize Information ---
    print("\n[STEP 4] Synthesizing Information:")
    if key_points: # Use key points as small summaries for synthesis demo
        print(f"  Input: {len(key_points)} key points (acting as summaries).")
        synthesized_text = subagent.synthesize_information(key_points)
        print(f"  Output Synthesis: \n'{synthesized_text}'")
    elif generated_summary:
        print(f"  Input: One generated summary (as a list).")
        synthesized_text = subagent.synthesize_information([generated_summary])
        print(f"  Output Synthesis: \n'{synthesized_text}'")
    else:
        print("  Skipping synthesis as no valid summaries or key points were generated.")

    # --- Step 5: Categorize Sources ---
    print("\n[STEP 5] Categorizing Sources:")
    demo_categories = {
        "Robotics": ["robotics", "locomotion", "humanoid"],
        "AI": ["ai", "intelligence", "algorithms"],
        "Advancements": ["advancements", "latest findings", "future implications"]
    }
    print(f"  Input Categories: {list(demo_categories.keys())}")
    if collected_sources:
        print(f"  Input: {len(collected_sources)} sources.")
        categorized_results = subagent.categorize_sources(collected_sources, demo_categories)
        print("  Output Categorized Sources:")
        for category, sources_in_cat in categorized_results.items():
            print(f"    Category '{category}':")
            if sources_in_cat:
                for src in sources_in_cat:
                    print(f"      - {src['title']}")
            else:
                print("      No sources in this category.")
    else:
        print("  Skipping categorization as no sources were collected.")

    # --- Step 6: Testing with Empty Inputs (extended) ---
    print("\n[STEP 6] Testing with Empty/Invalid Inputs (extended):")
    print("  Call: subagent.collect_sources('', num_results=1)")
    print(f"  Result: {subagent.collect_sources('', num_results=1)}")
    
    print("\n  Call: subagent.summarize_sources([])")
    print(f"  Result: {subagent.summarize_sources([])}")
    
    print("\n  Call: subagent.extract_key_points('')")
    print(f"  Result: {subagent.extract_key_points('')}")
    
    print("\n  Call: subagent.synthesize_information([])")
    print(f"  Result: {subagent.synthesize_information([])}")
    
    print("\n  Call: subagent.categorize_sources([], {{}})")
    print(f"  Result: {subagent.categorize_sources([], {})}")

    logger.info("\n--- Research Subagent Demo Finished ---")
    print("\n--- Research Subagent Demo Finished ---")

# Run the demo when the script is executed directly
if __name__ == "__main__":
    run_research_subagent_demo()
