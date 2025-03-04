"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaXmark,
  FaPlus,
  FaMinus,
} from "react-icons/fa6";

// Data type for the value of the dropdown depending on whether it is multi-select or not
export type DropdownValue<T extends boolean> = T extends true
  ? string[] | null
  : string | null;

export interface DropdownProps<T extends boolean> {
  title: string;
  height?: string;
  width?: string;
  options: string[];
  required?: boolean;
  multiSelect?: T;
  value: DropdownValue<T>;
  onChange: (selected: DropdownValue<T>) => void;
}

function Dropdown<T extends boolean = false>({
  title,
  height = "3rem",
  width = "15rem",
  options,
  required = false,
  multiSelect = false as T,
  value,
  onChange,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const preview =
    value === null ? null : Array.isArray(value) ? value.join(", ") : value;

  const handleSelect = (option: string) => {
    let newValue: DropdownValue<T>;
    if (multiSelect) {
      if (Array.isArray(value)) {
        if (value.includes(option)) {
          newValue = removeInOrder(value, option) as DropdownValue<T>;
        } else {
          newValue = insertInOrder(value, option) as DropdownValue<T>;
        }
      } else {
        newValue = [option] as unknown as DropdownValue<T>;
      }
    } else {
      newValue =
        value === option
          ? (null as DropdownValue<T>)
          : (option as DropdownValue<T>);
    }
    onChange(newValue);
    if (!multiSelect) {
      setOpen(false);
    }
  };

  function insertInOrder(arr: string[], option: string): string[] {
    const optionIndex = options.indexOf(option);
    const newArr = [...arr];
    let inserted = false;
    for (let i = 0; i < newArr.length; i++) {
      if (options.indexOf(newArr[i]) > optionIndex) {
        newArr.splice(i, 0, option);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      newArr.push(option);
    }
    return newArr;
  }

  function removeInOrder(arr: string[], option: string): string[] {
    return arr.filter((item) => item !== option);
  }

  const clearSelection = () => {
    onChange(
      multiSelect
        ? ([] as unknown as DropdownValue<T>)
        : (null as DropdownValue<T>)
    );
  };

  const selectAll = () => {
    onChange([...options] as unknown as DropdownValue<T>);
  };

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
            required && !preview && "text-red-500"
          } text-xs pb-1 text-(--foreground)`}
        >
          {title}
          {required && "*"}
        </div>
        <div
          className={`cursor-pointer bg-white rounded text-[0.875rem] ${
            !open
              ? required && !preview
                ? "border-red-500"
                : "border-gray-300"
              : "border-(--accent)"
          } border-[1px] overflow-hidden flex justify-between items-center p-3`}
          style={{ height, width }}
          onClick={() => setOpen(!open)}
        >
          {preview ? (
            <>
              <div className="truncate w-4/5 text-gray-700">{preview}</div>
              <div className="text-gray-700">
                <FaXmark
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
              <div className="text-gray-700">
                {open ? <FaAngleUp /> : <FaAngleDown />}
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
              className={`px-3 py-1 text-gray-700 text-[0.875rem] select-none cursor-pointer flex justify-between items-center 
                ${
                  Array.isArray(value)
                    ? value.includes(option)
                      ? "hover:bg-gray-300 bg-gray-200"
                      : "hover:bg-gray-200"
                    : value === option
                    ? "hover:bg-gray-300 bg-gray-200"
                    : "hover:bg-gray-200"
                }`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option);
                if (!multiSelect) setOpen(false);
              }}
              style={{ height }}
            >
              <span>{option}</span>
              {multiSelect && (
                <div className="text-gray-700">
                  {Array.isArray(value) ? (
                    value.includes(option) ? (
                      <FaMinus />
                    ) : (
                      <FaPlus />
                    )
                  ) : (
                    <FaPlus />
                  )}
                </div>
              )}
            </div>
          ))}
          {multiSelect && (
            <div
              className="px-3 py-1 text-gray-700 select-none cursor-pointer hover:bg-gray-100 flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                if (Array.isArray(value) && value.length === options.length) {
                  clearSelection();
                } else {
                  selectAll();
                }
              }}
              style={{ height }}
            >
              {Array.isArray(value) && value.length === options.length
                ? "Deselect all"
                : "Select all"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
