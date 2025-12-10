import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";
import useUsersStore from "../store/useUsersStore";

function Users() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Zustand
  const setSelectedUserId = useUsersStore((state) => state.setSelectedUserId);

  const { data: users = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return <h1 className="text-center text-gray-500 text-3xl mt-10">Loading users...</h1>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-xl">Failed to load users. Please try again.</p>
        <button onClick={refetch} className="mt-4 px-4 py-2 bg-gray-800 text-white rounded">
          Retry
        </button>
      </div>
    );
  }

  // Filter + Sort
  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.address?.city?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "email") return a.email.localeCompare(b.email);
      if (sortBy === "city") return (a.address?.city || "").localeCompare(b.address?.city || "");
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Highlight
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
    );
  };

  return (
    <div className="overflow-x-auto mt-6">
      {/* Search + Sort */}
      <div className="flex justify-between items-center mb-4 gap-2">
        <input
          type="text"
          className="border rounded-xl p-2 w-[200px] md:w-1/3"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <label>Sort by:</label>
          <select
            className="border rounded-xl p-1"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="city">City</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left hidden lg:table-cell">Email</th>
            <th className="px-4 py-3 text-left hidden md:table-cell">Username</th>
            <th className="px-4 py-3 text-left">City</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {paginatedUsers.map((user) => (
            <tr
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-4 py-3"><p className="line-clamp-1">{highlightText(user.name, search)}</p></td>
              <td className="px-4 py-3 hidden lg:table-cell"><p className="line-clamp-1">{highlightText(user.email, search)}</p></td>
              <td className="px-4 py-3 hidden md:table-cell"><p className="line-clamp-1">@{user.username}</p></td>
              <td className="px-4 py-3"><p className="line-clamp-1">{highlightText(user.address?.city || "-", search)}</p></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 border rounded hover:bg-gray-200"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded hover:bg-gray-200 ${page === currentPage ? "bg-blue-600 text-white" : ""}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 border rounded hover:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Users;
