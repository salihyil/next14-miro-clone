"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { useAction, useQuery } from "convex/react";
import { Banknote, LayoutDashboard, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../../convex/_generated/api";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

type Props = {};

const OrgSideBar = (props: Props) => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  const { organization } = useOrganization();
  const isSubscribed = useQuery(api.subscriptions.getIsSubscribed, { orgId: organization?.id as string });

  const [pending, setPending] = useState(false);
  const portal = useAction(api.stripe.portal);
  const pay = useAction(api.stripe.pay);

  const onClick = async () => {
    if (!organization?.id) return;
    setPending(true);

    try {
      const action = isSubscribed ? portal : pay;
      const redirectUrl = await action({ orgId: organization.id });

      window.location.href = redirectUrl;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  };

  return (
    <aside className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src={"/logo.svg"} priority alt="Logo" height={60} width={60} />
          <span className={cn("font-semibold text-2xl", font.className)}>Board</span>
          {isSubscribed && <Badge variant={"secondary"}>Pro</Badge>}
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          asChild
          size={"lg"}
          variant={favorites ? "ghost" : "secondary"}
          className="w-full font-normal justify-start px-2">
          <Link href={"/"}>
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team Board
          </Link>
        </Button>
        <Button
          asChild
          size={"lg"}
          variant={favorites ? "secondary" : "ghost"}
          className="w-full font-normal justify-start px-2">
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}>
            <Star className="h-4 w-4 mr-2" />
            Favorite boards
          </Link>
        </Button>
        <Button
          disabled={pending}
          onClick={onClick}
          variant={"ghost"}
          size={"lg"}
          className="w-full font-normal justify-start px-2">
          <Banknote className="h-4 w-4 mr-2" />
          {isSubscribed ? "Payment Settings" : "Upgrade"}
        </Button>
      </div>
    </aside>
  );
};

export default OrgSideBar;
