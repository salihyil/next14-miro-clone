import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipProvider } from "./ui/tooltip";

type HintProps = {
  children: React.ReactNode;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "end" | "center";
  sideOffset?: number;
  alignOffset?: number;
};

const Hint = ({ children, label, side, align, sideOffset, alignOffset }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="text-white bg-black border-black"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}>
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
