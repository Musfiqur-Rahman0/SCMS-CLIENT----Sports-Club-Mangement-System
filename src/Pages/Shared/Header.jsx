import { Link, useNavigate } from "react-router";

export default function Header({ user }) {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <Link to="/" className="text-xl font-bold">
        🏆 SCMS
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/courts">Courts</Link>
        {user ? (
          <div className="relative">
            <img
              src={user.photoURL}
              alt="profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => navigate("/dashboard")}
            />
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
