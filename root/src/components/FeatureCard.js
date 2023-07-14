import * as React from "react"
import { Link } from "gatsby"
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"

const cardStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
}

const imageBoxStyles = {
  alignItems: "center",
  width: 120,
}

const contentStyles = {
  flexDirection: "column",
  justifyContent: "center",
  flexWrap: "wrap",
  display: "inline-flex",
  flexShrink: 1,
}

const FeatureCard = ({
  bgcolor,
  imageAlt,
  imagePath,
  title,
  link,
  buttonText,
  buttonColor,
  children,
  maxWidth = "100%",
}) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allFile {
        edges {
          node {
            childImageSharp {
              gatsbyImageData
            }
            relativePath
          }
        }
      }
    }
  `)

  const image = data.allFile.edges.find(
    edge => edge.node.relativePath === imagePath
  )

  return (
    <Card
      elevation={3}
      sx={{
        ...cardStyles,
        bgcolor,
        p: 2,
        width: {
          sm: 1.0,
          md: maxWidth,
        },
      }}
    >
      <Box sx={imageBoxStyles}>
        <GatsbyImage
          alt={imageAlt}
          image={getImage(image.node.childImageSharp)}
        />
      </Box>
      <Box
        sx={{
          width: {
            sm: 1.0,
            md: 300,
          },
        }}
      >
        <CardContent sx={contentStyles}>
          <Typography component="div" variant="h6">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {children}
          </Typography>
          <br />
          <Link to={link} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color={buttonColor}
              aria-label={`Go to ${title}`}
            >
              {buttonText}
            </Button>
          </Link>
        </CardContent>
      </Box>
    </Card>
  )
}

export default FeatureCard
