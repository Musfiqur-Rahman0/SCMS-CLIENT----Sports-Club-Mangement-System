export default function MemberProfile({ user }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Member Profile</h1>
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
            Member since: {new Date(user?.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
