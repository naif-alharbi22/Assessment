import "../styles/globals.css";
import Link from "next/link";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "../themes/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
       
      {/* Navigation Bar */}
      <nav className="bg-gray-100 py-4">
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link href="/">
              <a className="text-gray-700 font-semibold hover:text-blue-500 transition-colors">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/customers">
              <a className="text-gray-700 font-semibold hover:text-blue-500 transition-colors">Customers</a>
            </Link>
          </li>
          <li>
            <Link href="/Reservations">
              <a className="text-gray-700 font-semibold hover:text-blue-500 transition-colors">Reservations</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>

      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
