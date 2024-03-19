"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";

import { Plus } from "lucide-react";

type Props = {};

const InviteButton = (props: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <Plus className="w-4 h-3 mr-2" /> Invite Members
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-transparent border-none max-w-[880px] p-0">
          <OrganizationProfile />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InviteButton;
