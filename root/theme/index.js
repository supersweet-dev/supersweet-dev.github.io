import { createTheme } from "@mui/material/styles"

import themeData from "./theme.json"

const themeName = "super-sweet"

export default createTheme({ ...themeData, themeName })
