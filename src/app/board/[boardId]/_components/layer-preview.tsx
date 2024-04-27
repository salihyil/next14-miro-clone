"use client";

import { colorToCss } from "@/lib/utils";
import { LayerType } from "@/types/canvas";
import React, { memo } from "react";
import { useStorage } from "../../../../../liveblocks.config";
import Ellipse from "./ellipse";
import Path from "./path";
import Rectangle from "./rectangle";

type LayerPreviewProps = {
  id: string;
  onLayerPointDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

export const LayerPreview = memo(({ id, onLayerPointDown, selectionColor }: LayerPreviewProps) => {
  const layer = useStorage(({ layers }) => layers.get(id));

  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Ellipse:
      return <Ellipse id={id} layer={layer} onPointerDown={onLayerPointDown} selectionColor={selectionColor} />;
/*     case LayerType.Path:
      return (
        <Path
          key={id}
          points={layer.points}
          onPointerDown={(e) => onLayerPointDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : "#CCC"}
          stroke={selectionColor}
        />
      ); */
    case LayerType.Rectangle:
      return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointDown} selectionColor={selectionColor} />;
    default:
      console.warn("Unknown layer type");
      return null;
  }
});

LayerPreview.displayName = "LayerPreview";
