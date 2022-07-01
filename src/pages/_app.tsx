import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <div className="mx-auto max-w-screen-lg p-2">
      <header className="border-b border-gray-300 py-4">
        <h1>
          <Link href="/">
            <a className="text-3xl font-bold">emi blog</a>
          </Link>
          
          </h1>
      </header>
      <main className="mt-8">
        <Component {...pageProps} />
      </main>

    </div>
  );
}

export default MyApp;
