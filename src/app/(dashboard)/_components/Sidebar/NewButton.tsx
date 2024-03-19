import Hint from "@/components/hint";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";

type Props = {};

const NewButton = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint label="Create new organization" align="start" side="right" sideOffset={18}>
            <button className="h-full w-full flex items-center justify-center rounded-md opacity-60 hover:opacity-100 transition bg-white/25">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-transparent p-0 border-none max-w-[480px]">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;
