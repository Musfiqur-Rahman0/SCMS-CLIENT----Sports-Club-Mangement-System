import { Card, CardContent } from "@/components/ui/card";
import { Users, CalendarDays, UserCheck } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const DashboardStats = ({ data }) => {
  console.log(data);
  // 📊 Sample data
  const stats = {
    bookings: data?.totalBookings || 100,
    users: data?.totalUsers || 10,
    members: data?.totalMembers,
  };

  const barData = [
    { name: "Bookings", value: stats.bookings },
    { name: "Users", value: stats.users },
    { name: "Members", value: stats.members },
  ];

  const pieData = [
    { name: "Bookings", value: stats.bookings },
    { name: "Users", value: stats.users },
    { name: "Members", value: stats.members },
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#f59e0b"]; // blue, green, amber

  return (
    <div className="p-6 space-y-8 w-full">
      {/* --- Top Stat Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-md">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <h2 className="text-2xl font-bold">{stats.bookings}</h2>
            </div>
            <CalendarDays className="w-10 h-10 text-green-500" />
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <h2 className="text-2xl font-bold">{stats.users}</h2>
            </div>
            <Users className="w-10 h-10 text-blue-500" />
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-gray-500 text-sm">Total Members</p>
              <h2 className="text-2xl font-bold">{stats.members}</h2>
            </div>
            <UserCheck className="w-10 h-10 text-amber-500" />
          </CardContent>
        </Card>
      </div>

      {/* --- Bar Chart --- */}
      <Card className="rounded-2xl shadow-md p-6 w-full">
        <h3 className="text-lg font-semibold mb-4">Overview (Comparison)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* --- Pie/Donut Chart --- */}
      <Card className="rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default DashboardStats;
