import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPostsByUser } from "../api/posts";
import useUsersStore from "../store/useUsersStore";

function Posts() {
  // ✅ گرفتن userId از Zustand
  const selectedUserId = useUsersStore((state) => state.selectedUserId);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts", selectedUserId],
    queryFn: () => fetchPostsByUser(selectedUserId),
    enabled: !!selectedUserId,
    keepPreviousData: true,
  });

  const posts = data ?? [];

  if (!selectedUserId) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Select a user to see posts
      </p>
    );
  }

  if (isLoading) {
    return (
      <h1 className="text-center text-gray-500 text-2xl mt-10">
        Loading posts...
      </h1>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-lg">Failed to load posts</p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-9">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Posts of User #{selectedUserId}</h2>
        <button
          onClick={refetch}
          className="px-3 py-1 text-sm text-gray-600 border rounded"
        >
          {isFetching ? "Refreshing..." : "Refetch"}
        </button>
      </div>

      <table className="w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-3 text-left">Title</th>
            <th className="px-2 py-3 text-left">Body</th>
          </tr>
        </thead>

        <tbody>
          {paginatedPosts.length ? (
            paginatedPosts.map((post) => (
              <tr key={post.id} className="border-t hover:bg-gray-50">
                <td className="px-2 py-3 font-medium">
                  <p className="line-clamp-2">{post.title}</p>
                </td>
                <td className="px-2 py-3 text-sm text-gray-600">
                  <p className="line-clamp-3">{post.body}</p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-4 text-gray-500">
                No posts found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
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
              className={`px-3 py-1 border rounded hover:bg-gray-200 ${
                page === currentPage ? "bg-blue-600 text-white" : ""
              }`}
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
      )}
    </div>
  );
}

export default Posts;
