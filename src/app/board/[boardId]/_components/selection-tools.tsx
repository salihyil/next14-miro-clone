"use client";

import { Trash2 } from "lucide-react";
import { memo } from "react";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import useDeleteLayers from "@/hooks/use-delete-layers";
import useSelectionBounds from "@/hooks/use-selection-bounds";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "../../../../../liveblocks.config";
import ColorPicker from "./color-picker";

type SelectionToolsProps = {
  isAnimated: boolean;
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
};

function SelectionTools({ isAnimated, camera, setLastUsedColor }: SelectionToolsProps) {
  const selection = useSelf((me) => me.presence.selection);

  /**
   * Move all the selected layers to the front
   */
  const moveToFront = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i));
      }
    },
    [selection]
  );

  /**
   * Move all the selected layers to the back
   */
  const moveToBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = 0; i < indices.length; i++) {
        liveLayerIds.move(indices[i], i);
      }
    },
    [selection]
  );

  /**
   * Change the color of all the selected layers
   */
  const setFill = useMutation(
    ({ storage }, fill: Color) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);
      selection.forEach((id) => {
        liveLayers.get(id)?.set("fill", fill);
      });
    },
    [selection, setLastUsedColor]
  );

  const deleteLayers = useDeleteLayers();

  const selectionBounds = useSelectionBounds();
  if (!selectionBounds) {
    return null;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;

  return (
    <div
      className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
      style={{
        transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
      }}>
      <ColorPicker onChange={setFill} />

      <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
        <Hint label="Move To Front">
          <Button variant={"board"} size={"icon"} onClick={moveToFront}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 6.5L12 2L15 6.5H12.75V9.71429L19.976 11.7789C20.7013 11.9861 20.7013 13.0139 19.976 13.2211L12.8242 15.2645C12.2855 15.4184 11.7145 15.4184 11.1758 15.2645L4.024 13.2211C3.29872 13.0139 3.29872 11.9861 4.024 11.7789L11.25 9.71429V6.5H9ZM6.7493 15.5L4.02345 16.2788C3.29817 16.486 3.29817 17.5139 4.02345 17.7211L11.1753 19.7645C11.714 19.9184 12.285 19.9184 12.8236 19.7645L19.9755 17.7211C20.7007 17.5139 20.7007 16.486 19.9755 16.2788L17.2493 15.4999L12.8233 16.7645C12.2847 16.9184 11.7137 16.9184 11.175 16.7645L6.7493 15.5Z"
                fill="currentColor"
              />
            </svg>
          </Button>
        </Hint>
        <Hint label="Move To Back">
          <Button variant={"board"} size={"icon"} onClick={moveToBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.1758 4.23547L4.024 6.27885C3.29872 6.48607 3.29872 7.51391 4.024 7.72114L11.1758 9.76452C11.7145 9.91842 12.2855 9.91842 12.8242 9.76452L19.976 7.72114C20.7013 7.51391 20.7013 6.48607 19.976 6.27885L12.8242 4.23547C12.2855 4.08156 11.7145 4.08156 11.1758 4.23547ZM4.02345 10.7788L6.7493 10L11.9992 11.5L17.2493 9.99992L19.9755 10.7788C20.7007 10.986 20.7007 12.0139 19.9755 12.2211L12.8236 14.2645C12.7991 14.2715 12.7746 14.2782 12.75 14.2845V17.5H15L12 22L9 17.5H11.25V14.2848C11.225 14.2783 11.2001 14.2716 11.1753 14.2645L4.02345 12.2211C3.29817 12.0139 3.29817 10.986 4.02345 10.7788Z"
                fill="currentColor"
              />
            </svg>
          </Button>
        </Hint>
        <Hint label="Delete">
          <Button variant={"board"} size={"icon"} onClick={deleteLayers}>
            <Trash2 />
          </Button>
        </Hint>
      </div>
    </div>
  );
}

export default memo(SelectionTools);
