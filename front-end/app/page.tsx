import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <main className="flex w-full max-w-2xl flex-col items-center justify-center gap-8 px-8 py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-6xl font-bold tracking-tight text-black dark:text-zinc-50">
            Welcome
          </h1>
          <p className="max-w-lg text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Welcome to our application. Please log in to access your dashboard and manage your account.
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Link
            href="/login"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-black px-6 text-lg font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="flex h-14 w-full items-center justify-center rounded-lg border-2 border-zinc-300 px-6 text-lg font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Go to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
