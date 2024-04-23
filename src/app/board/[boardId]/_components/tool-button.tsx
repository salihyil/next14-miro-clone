"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type ToolButtonProps = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

const ToolButton = ({ label, icon: Icon, onClick, isActive = false, isDisabled }: ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button disabled={isDisabled} onClick={onClick} variant={isActive ? "boardActive" : "board"}>
        <Icon />
      </Button>
    </Hint>
  );
};

export default ToolButton;
