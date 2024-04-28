"use"

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

type ColorPickerProps = {
  onChange: (color: Color) => void;
};

export default function ColorPicker({ onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[121px] pr-2 mr-2 border-r border-neutral-200">
      <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 198, b: 38 }} onClick={onChange} />
      <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
      <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
      <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onChange} />
      <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
      <ColorButton color={{ r: 82, g: 82, b: 82 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
    </div>
  );
}

function ColorButton({ onClick, color }: { onClick: (color: Color) => void; color: Color }) {
  return (
    <button className="w-7 h-7 flex items-center justify-center hover:opacity-75 transition" onClick={() => onClick(color)}>
      <div className="w-5 h-5 border border-neutral-300 rounded-xl" style={{ background: colorToCss(color) }} />
    </button>
  );
}
