import MyPendingBookings from "@/Pages/Shared/Bookings/MyPendingBookings";

export default function UserProfile({ user }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user?.photoURL}
          alt={user?.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-primary"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-600">
            Registered on:{" "}
            {new Date(user?.metadata?.creationTime).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="w-full">
        <MyPendingBookings />
      </div>
    </div>
  );
}
