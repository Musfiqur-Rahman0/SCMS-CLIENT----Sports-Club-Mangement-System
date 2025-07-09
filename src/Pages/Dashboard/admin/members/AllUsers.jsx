import { Input } from "@/components/ui/input";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import SearchInput from "@/Pages/Shared/SearchInput";
import SharedTable from "@/Pages/Shared/SharedTable";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchName, setSearchName] = useState("");
  const [users, setUsers] = useState();

  const { data, isPending, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
      return res.data;
    },
  });

  if (isPending) {
    return <p>loading...</p>;
  }
  if (isError) {
    return <p>error ..</p>;
  }

  const headItems = ["#", "Name", "Email", "Role", "Last Login"];

  const bodyItems = users?.map((user, index) => ({
    cells: [
      index + 1,
      user.name || "Guest",
      user.email,
      user.role,
      new Date(user.last_loged_in).toLocaleString(),
    ],
  }));

  // console.log(users);

  const handleSearch = async (e) => {
    e.preventDefault();

    const res = await axiosSecure.get(`/users?name=${searchName}`);
    setUsers(res.data);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Manage all users ({users.length})
      </h2>

      <SearchInput
        query={searchName}
        setQuery={setSearchName}
        handleSearch={handleSearch}
      />

      {isPending && <p>Loading users...</p>}
      {isError && <p>Error loading users...</p>}

      {!isPending && !isError && (
        <SharedTable headItems={headItems} bodyItems={bodyItems} />
      )}
    </div>
  );
};

export default AllUsers;
