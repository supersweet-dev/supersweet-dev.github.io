import * as React from "react"
import * as Tarot from "velvet-tarocchi"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"
import { Typography } from "@mui/material"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Typography variant="h3">Hi folks!</Typography>
    <br />
    <Typography variant="body1">
      <p>This is an under-development blog by Jimi Alvarez.</p>
      <p>
        <Link to="/reviews/manga">You can find my manga reviews here</Link>
      </p>
      <p>In the meantime, enjoy this small tarot reader!</p>
    </Typography>
    <br /> <br />
    <Tarot.TarotBoard />
  </Layout>
)

export default IndexPage
