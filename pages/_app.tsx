import "nextra-theme-blog/style.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/main.css";
import { useCallback, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {}, []);
    return (
        <>
            <Head children={""}></Head>
            <Component {...pageProps} />
        </>
    );
}
