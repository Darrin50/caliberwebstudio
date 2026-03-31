'use client';

import { useState, KeyboardEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface TagInputProps {
  name: string;
  label?: string;
  placeholder?: string;
}

export default function TagInput({
  name,
  label = 'Service Area',
  placeholder = 'Type a city name and press Enter',
}: TagInputProps) {
  const { control } = useFormContext();
  const { field } = useController({ name, control, defaultValue: [] });
  const [input, setInput] = useState('');

  const tags: string[] = Array.isArray(field.value) ? field.value : [];

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      field.onChange([...tags, trimmed]);
    }
    setInput('');
  };

  const removeTag = (tag: string) => {
    field.onChange(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
    if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-1.5">
          {label}
        </label>
      )}
      <div className="w-full min-h-[54px] bg-[#1A1A1A] border border-white/10 rounded-lg p-3 flex flex-wrap gap-2 focus-within:border-[#1E3D8F] focus-within:shadow-[0_0_0_3px_rgba(30,61,143,0.15)] transition-all duration-200 cursor-text">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 bg-[#1E3D8F]/20 text-[#4E73EF] px-3 py-1 rounded-full text-sm leading-none"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-white transition-colors leading-none flex items-center justify-center w-3.5 h-3.5"
              aria-label={`Remove ${tag}`}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M1 1l6 6M7 1L1 7" />
              </svg>
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input.trim() && addTag()}
          placeholder={tags.length === 0 ? placeholder : 'Add another city...'}
          className="flex-1 min-w-[160px] bg-transparent text-white placeholder-[#4A4A4A] text-base outline-none"
        />
      </div>
      <p className="mt-1.5 text-xs text-[#4A4A4A]">Press Enter to add · Backspace to remove last</p>
    </div>
  );
}
