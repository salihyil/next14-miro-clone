import { Camera } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function connectionIdtoColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(event: React.PointerEvent, camera: Camera): { x: number; y: number } {
  return {
    x: Math.round(event.clientX - camera.x),
    y: Math.round(event.clientY - camera.y),
  };
}
