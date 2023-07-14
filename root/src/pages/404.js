import { Typography } from "@mui/material"
import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
    <Typography variant="body2">
      You just hit a route that doesn&#39;t exist... the sadness.
    </Typography>
  </Layout>
)

export default NotFoundPage