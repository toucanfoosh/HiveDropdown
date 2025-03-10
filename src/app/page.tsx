"use client";
import Dropdown from "@/components/Dropdown";
import { useState } from "react";

export default function Home() {
  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string[] | null>(null);
  const [value3, setValue3] = useState<string | null>(null);
  const [value4, setValue4] = useState<string[] | null>(null);
  const [value5, setValue5] = useState<string[] | null>(null);

  const options = ["Option 1", "Option 2", "Option 3"];
  const manyOptions = [
    ...Array.from({ length: 500 }, (_, i) => `Option ${i + 1}`),
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-20 text-[0.875rem]">
      <div className="flex flex-col justify-start w-[50rem]">
        <div className="flex items-end">
          <Dropdown
            options={options}
            title="Optional Single Select"
            multiSelect={false}
            onChange={(selected) => setValue1(selected)}
            value={value1}
          />
          <div className="ps-10">
            Value: {value1 !== null ? value1 : "None"}{" "}
          </div>
        </div>
        <div className="h-8" />
        <div className="flex items-end">
          <Dropdown
            options={options}
            title="Optional Multi Select"
            multiSelect={true}
            onChange={(selected) => setValue2(selected)}
            value={value2}
          />
          <div className="ps-10">
            Value: {value2 && value2.length > 0 ? value2.join(", ") : "None"}{" "}
          </div>
        </div>
        <div className="h-8" />
        <div className="flex items-end">
          <Dropdown
            options={options}
            title="Required Single Select"
            multiSelect={false}
            required={true}
            onChange={(selected) => setValue3(selected)}
            value={value3}
          />
          <div className="ps-10">
            Value: {value3 !== null ? value3 : "None"}{" "}
          </div>
        </div>
        <div className="h-8" />
        <div className="flex items-end">
          <Dropdown
            options={options}
            title="Required Multi Select"
            multiSelect={true}
            required={true}
            onChange={(selected) => setValue4(selected)}
            value={value4}
          />
          <div className="ps-10">
            Value: {value4 && value4.length > 0 ? value4.join(", ") : "None"}{" "}
          </div>
        </div>
        <div className="h-8" />
        <div className="flex items-end">
          <Dropdown
            options={manyOptions}
            title="So many options..."
            multiSelect={true}
            onChange={(selected) => setValue5(selected)}
            value={value5}
          />
          <div className="ps-10">
            Value: {value5 && value5.length > 0 ? value5.join(", ") : "None"}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
