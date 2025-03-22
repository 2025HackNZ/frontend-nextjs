"use client";

import ContributeBox from "../components/ContributeBox/ContributeBox";

export default function Home() {
  return (
    <main className="max-w-screen-lg mx-auto flex flex-col items-start justify-center px-4 bg-white">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-black">Contribute</h1>
      <p>Support New Zealand conservation projects with your contribution and vote</p>

      <div className="h-5" />
      <ContributeBox />
    </main>
  );
}
