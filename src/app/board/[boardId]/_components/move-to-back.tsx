import * as React from "react";

const MoveToBack = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      fill="currentColor"
      d="M11.176 4.235 4.024 6.28c-.725.207-.725 1.235 0 1.442l7.152 2.044a3 3 0 0 0 1.648 0l7.152-2.044c.725-.207.725-1.235 0-1.442l-7.152-2.044a3 3 0 0 0-1.648 0ZM4.023 10.78 6.75 10 12 11.5l5.25-1.5 2.727.779c.725.207.725 1.235 0 1.442l-7.152 2.043a2.763 2.763 0 0 1-.074.02V17.5H15L12 22l-3-4.5h2.25v-3.215a3.163 3.163 0 0 1-.075-.02L4.023 12.22c-.725-.207-.725-1.235 0-1.442Z"
    />
  </svg>
);
export default MoveToBack;
