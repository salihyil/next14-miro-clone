"use client";

import { useAction } from "convex/react";
import { Poppins } from "next/font/google";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useProModal } from "@/store/use-pro-modal";
import { useOrganization } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ProModal = () => {
  const { isOpen, onClose } = useProModal();
  const [pending, setPending] = useState(false);
  const { organization } = useOrganization();
  const pay = useAction(api.stripe.pay);

  const onClick = async () => {
    if (!organization?.id) return;

    try {
      const redirectUrl = await pay({ orgId: organization.id });
      onClose();
      window.location.href = redirectUrl;
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[340px] p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src={"/pro.svg"} alt="pro" className="object-fill" fill />
        </div>
        <div className={cn("text-neutral-700 mx-auto space-y-6 p-6", font.className)}>
          <h2 className="font-medium text-lg">🚀 Upgrade to Pro today!</h2>
          <div className="pl-3">
            <ul className="text-xs space-y-1 list-disc">
              <li>Unlimited Board</li>
              <li>Unlimited tools</li>
              <li>Unlimited organizations</li>
              <li>Unlimited members </li>
            </ul>
          </div>
          <Button onClick={onClick} disabled={pending} size={"sm"} className="w-full">
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
