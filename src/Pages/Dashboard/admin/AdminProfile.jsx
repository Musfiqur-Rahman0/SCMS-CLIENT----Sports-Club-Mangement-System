import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCurd from "@/Hooks/useCurd";

export default function AdminProfile({ user }) {
  const { read } = useCurd("/admin-stats", ["admin"]);

  const { data: adminStats = {}, isPending, isError } = read;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user?.photoURL}
          alt={user?.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-primary"
        />
        <div>
          <h2 className="text-2xl font-semibold capitalize">
            {user?.displayName}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {isPending ? (
          <p>loading adminStats...</p>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Total Courts</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">
                {adminStats.totalCourts ?? 0}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">
                {adminStats.totalUsers ?? 0}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total bookings</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">
                {adminStats.totalMembers ?? 0}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
