import * as React from "react"
import * as Tarot from "velvet-tarocchi"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"
import { Typography } from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Typography variant="h3">Hi folks!</Typography>
    <br />
    <Typography variant="body1" paragraph>
      This is an under-development blog by Jimi Alvarez.
    </Typography>
    <Link to="/reviews/manga">
      <StaticImage
        width={50}
        src="../images/w2l-icon.png"
        alt="Write 2 Left Reviews"
      />
      <Typography variant="body1" paragraph>
        You can find my manga reviews here
      </Typography>
    </Link>
    <Typography variant="body1" paragraph>
      In the meantime, enjoy this small tarot reader!
    </Typography>
    <br /> <br />
    <Tarot.TarotBoard />
  </Layout>
)

export default IndexPage
