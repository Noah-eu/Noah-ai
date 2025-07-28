import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Meet Noah</h1>
      <Image
        src="/noah.png"
        alt="Noah"
        width={500}
        height={700}
        className="rounded-2xl shadow-lg"
      />
      <p className="mt-4 max-w-xl text-lg">
        Noah is your gentle AI companion – a writer with a poetic soul,
        always here to talk with you.
      </p>
    </main>
  );
}