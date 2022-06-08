import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import * as Tarot from "velvet-tarocchi"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Hi folks!</h1>
    <StaticImage
      src="../images/ss-icon.png"
      alt="supersweet"
      width={300}
      quality={95}
      formats={["auto", "webp", "avif"]}
      style={{ marginBottom: `1.45rem` }}
    />
    <p>This is an under-development Gatbsy site by Jimi Alvarez.</p>
    <p>In the meantime, enjoy:</p>
    <Tarot.TarotBoard />
  </Layout>
)

export default IndexPage
