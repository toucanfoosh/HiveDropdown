"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaXmark,
  FaPlus,
  FaMinus,
} from "react-icons/fa6";

interface DropdownProps {
  title: string;
  height?: string;
  width?: string;
  options: string[];
  required?: boolean;
  multiSelect?: boolean;
  value?: number | number[];
  onChange?: (selected: number | number[] | null) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  height = "2rem",
  width = "15rem",
  options,
  required = false,
  multiSelect = false,
  value,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<number | number[] | null>(
    value !== undefined ? value : multiSelect ? [] : null
  );
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Checks if this should be a controlled or uncontrolled component
  const selected = value !== undefined ? value : internalValue;

  const updateValue = (newValue: number | number[] | null) => {
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
    setPreview(
      newValue === null
        ? null
        : Array.isArray(newValue)
        ? newValue.map((index) => options[index]).join(", ")
        : options[newValue]
    );
  };

  const handleSelect = (optionIndex: number) => {
    let newValue;
    if (multiSelect) {
      if (Array.isArray(selected)) {
        if (selected.includes(optionIndex)) {
          newValue = removeInOrder(selected, optionIndex);
        } else {
          newValue = insertInOrder(selected, optionIndex);
        }
      } else {
        newValue = [optionIndex];
      }
    } else {
      newValue = selected === optionIndex ? null : optionIndex;
    }
    updateValue(newValue);
    if (!multiSelect) {
      setOpen(false);
    }
  };

  function insertInOrder(arr: number[], num: number): number[] {
    let left = 0,
      right = arr.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // Create a new array to avoid mutating state directly.
    const newArr = [...arr];
    newArr.splice(left, 0, num);
    return newArr;
  }

  function removeInOrder(arr: number[], num: number): number[] {
    let left = 0,
      right = arr.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    const newArr = [...arr];
    newArr.splice(left, 1);
    return newArr;
  }

  function clearSelection() {
    updateValue(multiSelect ? [] : null);
  }

  function selectAll() {
    updateValue(Array.from({ length: options.length }, (_, i) => i));
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col" ref={dropdownRef}>
      <div>
        <div
          className={`${
            required ? "text-red-500" : "text-(--foreground)"
          } text-xs pb-1`}
        >
          {title}
          {required && "*"}
        </div>
        <div
          className={`cursor-pointer bg-white rounded text-[0.875rem] border-gray-300 border-[1px] overflow-hidden flex justify-between items-center p-3`}
          style={{ height, width }}
          onClick={(e) => {
            setOpen(!open);
          }}
        >
          {preview ? (
            <>
              <div className={`truncate w-4/5 text-gray-700`}>{preview}</div>
              <div>
                <FaXmark
                  className={`text-gray-700`}
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelection();
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="text-gray-500 select-none">
                Select {multiSelect ? "all" : "one"} {!required && "(Optional)"}
              </div>
              <div>
                {open ? (
                  <FaAngleUp className={`text-gray-700`} />
                ) : (
                  <FaAngleDown className={`text-gray-700`} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {open && (
        <div
          className="absolute bg-white rounded shadow-md top-full left-0 z-1"
          style={{ width }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-3 py-1 text-gray-700 select-none cursor-pointer ${
                multiSelect ? "flex justify-between items-center" : ""
              } ${
                Array.isArray(selected)
                  ? selected.includes(index)
                    ? "hover:bg-gray-300 bg-gray-200"
                    : "hover:bg-gray-100"
                  : selected === index
                  ? "hover:bg-gray-300 bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(index);
                if (!multiSelect) {
                  setOpen(false);
                }
              }}
            >
              <>{option}</>
              {multiSelect && (
                <>
                  {Array.isArray(selected) ? (
                    selected.includes(index) ? (
                      <FaMinus className={`text-gray-700`} />
                    ) : (
                      <FaPlus className={`text-gray-700`} />
                    )
                  ) : (
                    <FaPlus className={`text-gray-700`} />
                  )}{" "}
                </>
              )}
            </div>
          ))}
          {multiSelect && (
            <div
              className="px-3 py-1 text-gray-700 select-none cursor-pointer hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                if (
                  Array.isArray(selected) &&
                  selected.length === options.length
                ) {
                  clearSelection();
                } else {
                  selectAll();
                }
              }}
            >
              {Array.isArray(selected) && selected.length === options.length
                ? "Deselect all"
                : "Select all"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
