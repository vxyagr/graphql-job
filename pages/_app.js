import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
      </ChakraProvider>
  )
}

export default MyApp
