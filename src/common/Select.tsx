import { useEffect, useRef, useState, useCallback } from "react";

export type SelectOption = {
  label: string;
  value: string;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export default function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearOptions = useCallback(() => {
    multiple ? onChange([]) : onChange(undefined);
  }, [multiple, onChange]);

  const selectOption = useCallback(
    (option: SelectOption) => {
      if (multiple) {
        if (value.some((v) => v.value === option.value)) {
          onChange(value.filter((o) => o.value !== option.value));
        } else {
          onChange([...value, option]);
        }
      } else {
        if (option !== value) onChange(option);
      }
    },
    [multiple, value, onChange]
  );

  const isOptionSelected = useCallback(
    (option: SelectOption) => {
      return multiple ? value.includes(option) : option === value;
    },
    [multiple, value]
  );

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue =
            highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    const containerCurrent = containerRef.current;
    containerCurrent?.addEventListener("keydown", handler);

    return () => {
      containerCurrent?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options, selectOption]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className="container form-control border border-gray-200"
    >
      <span className="value">
        {multiple
          ? value.map((v) => (
            <button
              key={v.value}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(v);
              }}
              className="option-badge border border-gray-200 text-gray-500"
            >
              {v.label}
              <span className="remove-btn">&times;</span>
            </button>
          ))
          : value?.label}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className="clear-btn"
      >
        &times;
      </button>
      <div className="divider"></div>
      <div className="caret"></div>
      <ul className={`options ${isOpen ? "show" : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}
            className={`option ${isOptionSelected(option) ? "selected" : ""
              } ${index === highlightedIndex ? "highlighted" : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
