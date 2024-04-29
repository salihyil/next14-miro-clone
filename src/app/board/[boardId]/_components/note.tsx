import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { NoteLayer } from "@/types/canvas";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "../../../../../liveblocks.config";

type NoteProps = {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

const font = Kalam({ subsets: ["latin"], weight: ["400"] });

export const Note = ({ id, layer, onPointerDown, selectionColor }: NoteProps) => {
  const { x, y, width, height, fill, value } = layer;

  const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.15;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;
    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
  };

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      className="shadow-md drop-shadow-xl"
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? colorToCss(fill) : "#CCC",
      }}>
      <ContentEditable
        className={cn("h-full w-full flex items-center justify-center text-center outline-none ", font.className)}
        html={value || "Note"}
        onChange={(e) => handleContentChange(e)}
        style={{
          color: fill ? getContrastingTextColor(fill) : "#CCC",
          fontSize: calculateFontSize(width, height),
        }}
      />
    </foreignObject>
  );
};
