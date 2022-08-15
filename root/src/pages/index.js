import * as React from "react"
import * as Tarot from "velvet-tarocchi"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",

        justifyContent: "center",
        alignItems: "top",
        alignContent: "top",
        flexWrap: "wrap",
      }}
    >
      <br />
      <Card
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          m: 2,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          flexWrap: "wrap",
          width: {
            sx: 1.0,

            md: 350,
          },
          bgcolor: "#a6606a",
        }}
      >
        <Card sx={{ alignItems: "center", width: 200, height: 180 }}>
          <StaticImage alt="this is jimi" src={"../images/me.jpeg"} />
        </Card>
        <Box>
          <CardContent
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              flexWrap: "wrap",
              display: "inline-flex",
              flexShrink: 1,
            }}
          >
            <Typography variant="h4">Jimi Alvarez</Typography>
            <Typography variant="body2" paragraph>
              BSC in Computer Science, Writer, Artist.
            </Typography>
            <Typography variant="body2" paragraph>
              Welcome to my little corner of the internet. I'm housing a few
              different projects here, from programming samples, to my writing,
              to my hobbies.
            </Typography>
            <Typography variant="body2" paragraph>
              I write fun code to keep you on your toes and sad stories to keep
              you in your feels.
            </Typography>
          </CardContent>
        </Box>
      </Card>

      <Box>
        <Card
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 2,
            m: 2,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            bgcolor: "#e3a462",
          }}
        >
          <Box sx={{ alignItems: "center", width: 180 }}>
            <StaticImage alt="Write 2 Left" src={"../images/w2l-icon.png"} />
          </Box>
          <Box
            sx={{
              width: {
                sm: 1.0,

                md: 350,
              },
            }}
          >
            <CardContent
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                flexWrap: "wrap",
                display: "inline-flex",
                flexShrink: 1,
              }}
            >
              <Typography component="div" variant="h6">
                Write 2 Left
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
              >
                Volume 1 must be the most endearing! In this review series I do
                a deep dive into the first volume of some of my favorite manga
                series. The first few chapters are crucial, you have to make
                readers fall in love with your main cast, your world, and your
                style of storytelling. Let's analyze all the different ways one
                can kick off a succesful serialization!
              </Typography>
              <br />
              <Link to="/reviews/manga/" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="w2l">
                  Go!
                </Button>
              </Link>
            </CardContent>
          </Box>
        </Card>
        <Card
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 2,
            m: 2,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            bgcolor: "#7d9e8b",
          }}
        >
          <Card sx={{ alignItems: "center", width: 180 }}>
            <StaticImage alt="Tampico Vibes" src={"../images/tampico.png"} />
          </Card>
          <Box
            sx={{
              width: {
                sm: 1.0,

                md: 350,
              },
            }}
          >
            <CardContent
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                flexWrap: "wrap",
                display: "inline-flex",
                flexShrink: 1,
              }}
            >
              <Typography component="div" variant="h6">
                Novel Sample
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
              >
                A short writing sample from a novel I'm working on. This is the
                first half of an early chapter, a mood piece to introduce you to
                the protagonist and her best friend. The story takes place in my
                hometown, Tampico, in the late 80s. One of the main themes is
                the anguish that comes from conflicting desires. I think that
                comes through candidly in this one. I hope I can show you how
                cold a tropical summer can feel.
              </Typography>
              <br />
              <Link to="/cosas/" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="tampico">
                  Go!
                </Button>
              </Link>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",

        justifyContent: "center",
        alignItems: "top",
        alignContent: "top",
        flexWrap: "wrap",
      }}
    >
      <Card
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          m: 2,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          bgcolor: "#cfb25d",
          width: {
            sm: 1.0,

            md: 460,
          },
        }}
      >
        <Card sx={{ alignItems: "center", width: 120 }}>
          <StaticImage alt="goldenrod" src={"../images/goldenrod.png"} />
        </Card>
        <Box
          sx={{
            width: {
              sm: 1.0,

              md: 300,
            },
          }}
        >
          <CardContent
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              flexWrap: "wrap",
              display: "inline-flex",
              flexShrink: 1,
            }}
          >
            <Typography component="div" variant="h6">
              Goldenrod
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              A beautiful murderer carries the corpse of a prince. Goldenrod is
              the common name for various wild plants related to sunflowers.
              Passion is vice, love is opposite to temperance. Flowering
              goldenrod can be found in meadows, prairies, and lush plains.
            </Typography>
            <br />

            <Link to="/goldenrod/" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="goldenrod">
                Go!
              </Button>
            </Link>
          </CardContent>
        </Box>
      </Card>
      <Card
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          m: 2,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          bgcolor: "#768aab",
          width: {
            sm: 1.0,

            md: 460,
          },
        }}
      >
        <Card sx={{ alignItems: "center", width: 120 }}>
          <StaticImage alt="Make Space" src={"../images/ms-icon.png"} />
        </Card>
        <Box
          sx={{
            width: {
              sm: 1.0,

              md: 300,
            },
          }}
        >
          <CardContent
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              flexWrap: "wrap",
              display: "inline-flex",
              flexShrink: 1,
            }}
          >
            <Typography component="div" variant="h6">
              Make Space
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              A microblog to document my experiences with shortform projects.
              Little sculptures, keyboard builds, handmade toys, jewelry,
              personal recipes, minigames. I make all kinds of things.
            </Typography>
            <br />

            <Button variant="contained" color="makespace">
              Under Construction
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",

        justifyContent: "center",
        alignItems: "top",
        alignContent: "top",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ maxWidth: 940, m: 4 }}>
        <Tarot.TarotBoard />
      </Box>
    </Box>
  </Layout>
)

export default IndexPage
