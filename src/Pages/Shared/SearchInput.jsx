import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const SearchInput = ({ query, setQuery, handleSearch }) => {
  return (
    <form onSubmit={handleSearch} className="flex items-center gap-3">
      <Input
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-xs"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchInput;
