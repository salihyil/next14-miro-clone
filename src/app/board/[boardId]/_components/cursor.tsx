import { connectionIdtoColor } from "@/lib/utils";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";
import { useOther } from "../../../../../liveblocks.config";

type CursorProps = {
  connectionId: number;
};

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);
  const name = info?.name || "Teammate";

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    /* foreignObject ile normal HTML içeriğini SVG içine yerleştirebilirsiniz. */
    <foreignObject
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
      width={name.length * 10 + 24}
      height="50"
      className="relative drop-shadow-md">
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: connectionIdtoColor(connectionId),
          color: connectionIdtoColor(connectionId),
        }}
      />
      <div
        className=" absolute left-5 px-1.5 py-0.5 rounded-md text-xs font-semibold text-white"
        style={{ background: connectionIdtoColor(connectionId) }}>
        <span>{name}</span>
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";
