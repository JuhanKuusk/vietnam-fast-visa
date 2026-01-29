"use client";

import React, { useState, useEffect, useCallback } from "react";

interface EncryptedTextProps {
  text: string;
  encryptedClassName?: string;
  revealedClassName?: string;
  revealDelayMs?: number;
  className?: string;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function EncryptedText({
  text,
  encryptedClassName = "text-neutral-500",
  revealedClassName = "text-white",
  revealDelayMs = 50,
  className = "",
}: EncryptedTextProps) {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  const getRandomChar = useCallback(() => {
    return characters[Math.floor(Math.random() * characters.length)];
  }, []);

  // Initialize with random characters
  useEffect(() => {
    const initialText = text.split("").map((char) => (char === " " ? " " : getRandomChar()));
    setDisplayText(initialText);
    setRevealedIndices(new Set());
  }, [text, getRandomChar]);

  // Reveal characters one by one
  useEffect(() => {
    if (revealedIndices.size >= text.length) return;

    const timer = setTimeout(() => {
      setRevealedIndices((prev) => {
        const newSet = new Set(prev);
        newSet.add(prev.size);
        return newSet;
      });
    }, revealDelayMs);

    return () => clearTimeout(timer);
  }, [revealedIndices.size, text.length, revealDelayMs]);

  // Scramble unrevealed characters
  useEffect(() => {
    if (revealedIndices.size >= text.length) return;

    const scrambleInterval = setInterval(() => {
      setDisplayText((prev) =>
        prev.map((char, index) => {
          if (revealedIndices.has(index) || text[index] === " ") {
            return text[index];
          }
          return getRandomChar();
        })
      );
    }, 30);

    return () => clearInterval(scrambleInterval);
  }, [revealedIndices, text, getRandomChar]);

  return (
    <span className={className}>
      {displayText.map((char, index) => (
        <span
          key={index}
          className={revealedIndices.has(index) || text[index] === " " ? revealedClassName : encryptedClassName}
        >
          {revealedIndices.has(index) || text[index] === " " ? text[index] : char}
        </span>
      ))}
    </span>
  );
}
