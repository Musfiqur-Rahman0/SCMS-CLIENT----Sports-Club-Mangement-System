import { Button } from "@/components/ui/button";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCurd from "@/Hooks/useCurd";
import PaginationComp from "@/Pages/Shared/PaginationComp";
import SearchInput from "@/Pages/Shared/SearchInput";
import SharedTable from "@/Pages/Shared/SharedTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMember, setTotalMember] = useState(0);
  const queryClient = useQueryClient();
  const limit = 10;

  const { read } = useCurd(
    `/users?role=member&page=${currentPage}&limit=${limit}`,
    ["admin"]
  );
  const { data, isPending, isError } = read;
  const { updateWithPatch } = useCurd("/users", ["admin"]);

  const { mutate: deleteMember } = updateWithPatch;

  const handleSearch = async (e) => {
    e.preventDefault();

    const res = await axiosSecure.get(`/users?name=${query}&role=member`);
    setMembers(res.data.users);
  };

  // ✅ Your delete handler with Swal
  const handleDeleteMember = async (id, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this member? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMember({ id, updatedItems: { role: "user", email } });
      }
    });
  };

  const headItems = ["#", "Name", "Email", "Role", "Last Log In", "Action"];
  const bodyItems = members?.map((member, index) => ({
    cells: [
      index + 1,
      member.name || "Guest",
      member.email,
      member.role,
      new Date(member.last_loged_in).toLocaleString(),
      <Button onClick={() => handleDeleteMember(member._id, member.email)}>
        {" "}
        Delete{" "}
      </Button>,
    ],
  }));

  useEffect(() => {
    if (data) {
      setMembers(data.users);
      setTotalPages(data.totalPages);
      setTotalMember(data.totalUsers);
    }
  }, [data, currentPage]);

  if (isPending) {
    return <p>loading...</p>;
  }
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Manage all members ({members?.length})
      </h2>

      <SearchInput
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />

      {isPending && <p>Loading members...</p>}
      {isError && <p>Error loading members...</p>}

      {!isPending && !isError && (
        <SharedTable headItems={headItems} bodyItems={bodyItems} />
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <PaginationComp
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
