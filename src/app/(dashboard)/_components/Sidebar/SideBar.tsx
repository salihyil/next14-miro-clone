"use client";

import List from "./List";
import NewButton from "./NewButton";

type Props = {};

const SideBar = (props: Props) => {
  return (
    <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white">
      <List />
      <NewButton />
    </aside>
  );
};

export default SideBar;
