import Swal from "sweetalert2";
import SharedTable from "@/Pages/Shared/SharedTable";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router";
import useCurd from "@/Hooks/useCurd";
import { useEffect, useState } from "react";
import { dataTagErrorSymbol } from "@tanstack/react-query";
import PaginationComp from "@/Pages/Shared/PaginationComp";

export default function ManageCourts() {
  const navigate = useNavigate();

  const { deleteMutation } = useCurd("/courts", ["admin"]);
  const [courts, setCourts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourts, setTotalCourts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const { read } = useCurd(`/courts?page=${currentPage}&limit=${limit}`, [
    "member",
    "admin",
    "user",
  ]);

  const { data, isPending, isError } = read;

  const { mutate: deleteCourt } = deleteMutation;

  const handleDelete = (court) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete "${court.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourt(court._id);
      }
    });
  };

  useEffect(() => {
    if (data) {
      setCourts(data.courts);
      setTotalPages(data.totalPages);
      setTotalCourts(data.totalCourts);
    }
  }, [data, currentPage]);

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4">
      {totalCourts && (
        <h2 className="text-xl font-semibold">
          Manage all courts {totalCourts}
        </h2>
      )}
      {/* Your table rows */}
      <SharedTable
        headItems={["#", "Name", "Type", "Capacity", "Price/hr", "Actions"]}
        bodyItems={courts.map((court, i) => ({
          cells: [
            i + 1,
            court.name,
            court.type,
            court.capacity,
            `$${court.price}`,
            <div className="flex gap-2">
              <Button
                onClick={() => navigate(`/dashboard/update-court/${court._id}`)}
              >
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(court)}>
                Delete
              </Button>
            </div>,
          ],
        }))}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-3">
          <PaginationComp
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}
