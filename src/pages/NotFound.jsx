export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="bg-white rounded-lg shadow p-8 text-center max-w-md">
        <h1 className="text-3xl font-bold mb-3 text-gray-800">Page not found</h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}