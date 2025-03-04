export type DropdownValue<T extends boolean> = T extends true
  ? string[]
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
