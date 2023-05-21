import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ColorScheme, ColorSchemeProvider, MantineProvider, MantineProviderProps, MantineThemeOverride, createStyles } from '@mantine/core'
import Layout from '@/components/Layout/Layout'
import Head from 'next/head'
import { CSSProperties, useState } from 'react'
import { Notifications } from '@mantine/notifications';
import { SessionProvider } from "next-auth/react"
import { CryptoProvider } from '@/context/CryptoContext'


export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {

  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const toggleColorScheme = (value: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
  }

  return (
    <>
      <Head>
        <title>Vexr Finance</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Vexr Finance" />
        <meta name="keywords" content="Vexr Finance Buisness crypto money dollar euro bitcoin ethereum currencies cryptocurrencies" />
        <meta name="author" content="Vexr Group" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Head> 

      <SessionProvider session = {session}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: colorScheme,
              primaryColor: "yellow"
              
            }}
          >
              <Notifications />
              <Layout>
                <CryptoProvider> 

                  <Component {...pageProps} />
                </CryptoProvider>
              </Layout>
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionProvider>
    </>
  )
}
