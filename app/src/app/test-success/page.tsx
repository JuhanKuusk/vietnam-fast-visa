export default function TestSuccessPage() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          The test payment of 1 EUR was successful. The Stripe integration is working correctly.
        </p>
        <a
          href="/"
          className="inline-block py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
