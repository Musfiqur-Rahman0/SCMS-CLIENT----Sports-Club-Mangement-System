import { Input } from "@/components/ui/input";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCurd from "@/Hooks/useCurd";
import PaginationComp from "@/Pages/Shared/PaginationComp";
import SearchInput from "@/Pages/Shared/SearchInput";
import SharedTable from "@/Pages/Shared/SharedTable";
import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchName, setSearchName] = useState("");
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const { read } = useCurd(`/users?page=${currentPage}&limit=${limit}`, [
    "admin",
  ]);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchName !== "") {
      const res = await axiosSecure.get(`/users?name=${searchName}`);
      setUsers(res.data.users);
    }
  };

  useEffect(() => {
    if (data) {
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.totalUsers);
    }
  }, [data]);

  return (
    <div className="space-y-4">
      {totalUsers && (
        <h2 className="text-xl font-semibold">Manage all users {totalUsers}</h2>
      )}

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
      <div className="flex items-center justify-center">
        <PaginationComp
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default AllUsers;
