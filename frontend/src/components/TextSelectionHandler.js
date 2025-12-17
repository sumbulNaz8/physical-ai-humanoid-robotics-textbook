import React, { useEffect, useState, useRef } from 'react';
import styles from './TextSelectionHandler.module.css'; // We'll create this CSS module later

const TextSelectionHandler = () => {
  const [selectedText, setSelectedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text.length > 0) {
      setSelectedText(text);
      setShowButton(true);

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Position the button slightly above and to the right of the selection
      setButtonPosition({
        x: rect.right + window.scrollX - 20, // Adjust as needed
        y: rect.top + window.scrollY - 40,   // Adjust as needed
      });
    } else {
      setSelectedText('');
      setShowButton(false);
    }
  };

  const handleClickAway = (event) => {
    // Hide button if click is outside the selection and the button itself
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      const selection = window.getSelection();
      if (selection.toString().trim().length === 0 || !selection.containsNode(event.target, true)) {
        setShowButton(false);
      }
    }
  };

  const handleQueryClick = () => {
    console.log('Querying with selected text:', selectedText);
    // TODO: Integrate with chatbot here
    setShowButton(false); // Hide button after clicking
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mousedown', handleClickAway); // To handle clicks away from selection

    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, []);

  if (!showButton || !selectedText) {
    return null;
  }

  return (
    <button
      ref={buttonRef}
      className={styles.queryButton}
      style={{ left: buttonPosition.x, top: buttonPosition.y }}
      onClick={handleQueryClick}
    >
      Ask Chatbot about this
    </button>
  );
};

export default TextSelectionHandler;
