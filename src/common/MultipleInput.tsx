/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface MultipleInputProps {
  initialTags: string[];
  setTags?: React.Dispatch<React.SetStateAction<any>>;
  placeholder: string;
  disabled?: boolean;
}

const MultipleInput: React.FC<MultipleInputProps> = ({
  initialTags,
  setTags,
  placeholder,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setInternalTags] = useState<string[]>(initialTags);

  useEffect(() => {
    setInternalTags(initialTags);
  }, [initialTags]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "" && setTags) {
      setInternalTags([...tags, inputValue.trim()]);
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleTagDelete = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setInternalTags(updatedTags);
    if (setTags) setTags(updatedTags);
  };


  return (
    <div className="tags-input-container">
      <input
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        className="form-control w-full bg-white py-3 pl-2 rounded placeholder:text-gray-500 border border-gray-200 mb-2"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyPress}
      />
      <div className="flex flex-wrap gap-2">
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <div
              key={index}
              className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2"
            >
              {tag}
              <FaTimes
                onClick={() => handleTagDelete(tag)}
                className="cursor-pointer"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MultipleInput;
