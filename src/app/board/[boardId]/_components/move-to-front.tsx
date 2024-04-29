import * as React from "react";

const MoveToFront = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      fill="currentColor"
      d="M9 6.5 12 2l3 4.5h-2.25v3.214l7.226 2.065c.725.207.725 1.235 0 1.442l-7.152 2.043a3 3 0 0 1-1.648 0l-7.152-2.043c-.725-.207-.725-1.235 0-1.442l7.226-2.065V6.5H9Zm-2.25 9-2.727.779c-.725.207-.725 1.235 0 1.442l7.152 2.044a3 3 0 0 0 1.649 0l7.152-2.044c.725-.207.725-1.235 0-1.442l-2.727-.78-4.426 1.266a3 3 0 0 1-1.648 0L6.749 15.5Z"
    />
  </svg>
);
export default MoveToFront;
