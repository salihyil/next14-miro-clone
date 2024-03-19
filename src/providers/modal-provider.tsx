"use client";

import { useEffect, useState } from "react";

import { RenameModal } from "@/components/modals/rename-modal";

export const ModalProvider = () => {
  /* Bu provider RenameModal veya diğer oluşturacağımız modalları kullanacağımız zaman tekrar tekrar yazmaktan kurtarır. */

  const [isMounted, setIsMounted] = useState(false);

  //bunu yapmazsak hydration error alabiliriz.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RenameModal />
      {/* Birden fazla modalları eklersin */}
    </>
  );
};
