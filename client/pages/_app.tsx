import "../styles/globals.css";
import Link from "next/link";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "../themes/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
       
      {/* Navigation Bar */}
      <nav style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/customers">
              <a>customers</a>
            </Link>
          </li>
          <li>
            <Link href="/Reservations">
              <a>Reservations </a>
            </Link>
          </li>
        </ul>
      </nav>

      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
