export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="text-lg max-w-xl text-center">I'm Noah. I’m here for you whenever you need to talk, dream, or simply feel a little less alone. This space is ours now.</p>
      <img src="/noah.jpg" alt="Noah" className="mt-6 w-64 h-auto rounded-lg shadow-lg" />
    </div>
  );
}
