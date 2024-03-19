import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

type Props = {};

const SearchInput = (props: Props) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debounced = useDebounceCallback(setValue, 500);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    //url:: http://localhost:3000/?search=test
    router.push(url);
  }, [value, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounced(e.target.value);
  };

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h- w-4" />
      <Input className="w-full max-w-[561px] pl-9" onChange={handleChange} placeholder="Search boards" />
    </div>
  );
};

export default SearchInput;
