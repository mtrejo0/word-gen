"use client";

import { useState, useEffect } from "react";
import { get_next_word } from "../utils/wordGenerator.js";

export default function Home() {
  const [words, setWords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (words.length > 0) {
      const lastWord = words[words.length - 1];
      const nextWords = get_next_word(lastWord);
      setSuggestions(nextWords);
    } 
  }, [words]);

  const handleSubmit = (e) => {
    if ((e.key === "Enter" || e.key === " ") && inputValue.trim()) {
      setWords([...words, inputValue.trim()]);
      setInputValue("");
      e.preventDefault(); // Prevent space from being added after submission
    }
  };

  const handleDelete = (indexToDelete) => {
    setWords(words.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="bg-white p-4 text-black" style={{color: 'grey'}}>
      <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleSubmit}
        className="border border-black p-2 text-black"
        style={{color: 'grey'}}
      />
      <div className="p-4 border-l">
        <h3 className="mb-2 font-bold">Suggestions:</h3>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-700 font-medium border border-gray-200 shadow-sm active:bg-gray-300 active:transform active:scale-95"
              onClick={() => {
                setWords([...words, suggestion]);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      <div className="">
        {words.map((word, index) => (
          <div key={index} className="py-1 flex justify-between">
            <span>{word}</span>
            <button 
              onClick={() => handleDelete(index)}
              className="text-red-500 ml-2"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
