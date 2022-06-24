/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import "./layout.css"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Typography } from "@mui/material"

const Layoutw2l = ({ children }) => {
  return (
    <>
      <Header
        siteTitle={`Write 2 Left`}
        home={"/reviews/manga"}
        logo={
          <StaticImage
            alt="w2l"
            src="../images/w2l-icon.png"
            width={50}
            height={50}
          />
        }
      />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          <p>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </p>
          <p>
            <Link to="/">
              <Typography variant="body2">
                <StaticImage
                  alt="supersweet"
                  src="../images/ss-icon.png"
                  width={20}
                  height={20}
                />
                supersweet
              </Typography>
            </Link>
          </p>
        </footer>
      </div>
    </>
  )
}

Layoutw2l.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layoutw2l
