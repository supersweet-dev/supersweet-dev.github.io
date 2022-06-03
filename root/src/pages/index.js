import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as Tarot from "moonlight-tarot"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Hi folks!</h1>
    <StaticImage
      src="../images/ss-icon.png"
      width={300}
      quality={95}
      formats={["auto", "webp", "avif"]}
      style={{ marginBottom: `1.45rem` }}
    />
    <p>This is an under-development Gatbsy site for SuperSweet.</p>
    <p>In the meantime, enjoy:</p>
    <Tarot.TarotBoard />
  </Layout>
)

export default IndexPage