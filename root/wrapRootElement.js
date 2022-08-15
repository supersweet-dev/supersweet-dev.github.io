import React from "react"

import { ThemeProvider } from "@mui/material/styles"

import theme from "./theme"

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <div id="rootest-root">{element}</div>
    </ThemeProvider>
  )
}
