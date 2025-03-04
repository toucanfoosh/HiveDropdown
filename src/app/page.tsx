import Dropdown from "@/components/Dropdown/Dropdown";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-around min-h-screen p-8 pb-20">
      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]}
        title="Optional Single Select"
        multiSelect={false}
      />
      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]}
        title="Optional Multi Select"
        multiSelect={true}
      />
      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]}
        title="Required Single Select"
        multiSelect={false}
        required={true}
      />
      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]}
        title="Required Multi Select"
        multiSelect={true}
        required={true}
      />
    </div>
  );
}
