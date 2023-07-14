import * as React from "react"
import * as Tarot from "velvet-tarocchi"
import Layout from "../components/layout"
import FeatureCard from "../components/FeatureCard"
import { featureData } from "../components/features"
import Seo from "../components/seo"
import { Box, Card, CardContent, Typography } from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"
const topBilling = featureData.slice(0, 2)
const features = featureData.slice(2)
const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "no-wrap",
          justifyContent: "space-between",
          width: ["100%", "64%"],
          flexWrap: "wrap",
        }}
      >
        <Card
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#d6729d",
            width: {
              sm: 1.0,
              md: "50%",
            },
          }}
        >
          <Box sx={{ alignItems: "center", width: 200, height: 180, mb: 4 }}>
            <StaticImage alt="this is jimi" src={"../images/me.jpeg"} />
          </Box>
          <CardContent
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              flexWrap: "wrap",
              display: "flex",
            }}
          >
            <Typography variant="h4">Jimi Alvarez</Typography>
            <Typography variant="body2" paragraph>
              Computer Scientist, Amateur Electrician, Writer, Artist.
            </Typography>
            <Typography variant="body1">FEATURED: </Typography>
            <Typography variant="body2" paragraph>
              Reviews, Vignettes, Microgames, Photography, Blogs
            </Typography>
          </CardContent>
        </Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: {
              sm: 1.0,
              md: "50%",
            },
          }}
        >
          {topBilling.map((data, index) => (
            <FeatureCard
              key={index}
              bgcolor={data.bgcolor}
              imageAlt={data.imageAlt}
              imagePath={data.imagePath}
              title={data.title}
              link={data.link}
              buttonText={data.buttonText}
              buttonColor={data.buttonColor}
              maxWidth={data.maxWidth}
            >
              {data.content}
            </FeatureCard>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "no-wrap",
          justifyContent: "space-between",
          width: ["100%", "64%"],
          flexWrap: "wrap",
        }}
      >
        {features.map((data, index) => (
          <FeatureCard
            key={index}
            bgcolor={data.bgcolor}
            imageAlt={data.imageAlt}
            imagePath={data.imagePath}
            title={data.title}
            link={data.link}
            buttonText={data.buttonText}
            buttonColor={data.buttonColor}
            maxWidth={data.maxWidth}
          >
            {data.content}
          </FeatureCard>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: ["column", "row"],
          justifyContent: "space-between",
          alignItems: "stretch",
          width: ["100%", "64%"],
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Tarot.TarotBoard />
        </Box>
      </Box>
    </Box>
  </Layout>
)

export default IndexPage
