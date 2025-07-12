import { Input } from "@/components/ui/input";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCurd from "@/Hooks/useCurd";
import SearchInput from "@/Pages/Shared/SearchInput";
import SharedTable from "@/Pages/Shared/SharedTable";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchName, setSearchName] = useState("");
  const [users, setUsers] = useState([]);

  const { read } = useCurd("/users", ["admin"]);
  const { data, isPending, isError } = read;

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

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Manage all users {users?.length}
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
