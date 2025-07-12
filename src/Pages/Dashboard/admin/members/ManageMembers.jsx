import { Button } from "@/components/ui/button";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useCurd from "@/Hooks/useCurd";
import SearchInput from "@/Pages/Shared/SearchInput";
import SharedTable from "@/Pages/Shared/SharedTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const { read } = useCurd("/users?role=member", ["admin"]);
  const { data, isPending, isError } = read;

  const mutation = useMutation({
    mutationFn: async ({ role, id, email }) => {
      const res = await axiosSecure.patch(`/users/${id}`, { role, email });
      return res.data;
    },
    onSuccess: () => {
      // ✅ Refetch bookings to reflect changes
      queryClient.invalidateQueries(["members"]);

      // ✅ Or show a toast or SweetAlert
      Swal.fire({
        icon: "success",
        title: "Members Updated!",
        text: "The booking status has been updated successfully.",
      });
    },
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    const res = await axiosSecure.get(`/users?name=${query}&role=member`);
    setMembers(res.data);
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
        mutation.mutate(
          { role: "user", id, email },
          {
            onSuccess: () => {
              Swal.fire(
                "Removed!",
                "The member has been removed successfully.",
                "success"
              );
            },
            onError: (error) => {
              console.error(error);
              Swal.fire(
                "Error",
                "Something went wrong while removing the member.",
                "error"
              );
            },
          }
        );
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
      setMembers(data);
    }
  }, [data]);

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
    </div>
  );
};

export default ManageMembers;
