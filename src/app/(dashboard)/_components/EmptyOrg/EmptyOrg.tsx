import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";

type Props = {};

const EmptyOrg = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src={"/elements.svg"} priority alt="elements" width={200} height={200} />
      <h2 className="font-semibold text-2xl mt-6">Welcome to board </h2>
      <p className="text-muted-foreground text-sm mt-2">Create an organization to get started</p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"lg"}>Create an organization</Button>
          </DialogTrigger>
          <DialogContent className="bg-transparent p-0 border-none max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyOrg;
