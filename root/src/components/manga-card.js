import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { Link } from "gatsby"
import * as React from "react"

const MangaCard = props => {
  return (
    <Card sx={{ display: "flex" }}>
      {props.cover}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="div"
            variant="h6"
            sx={{ textTransform: "uppercase" }}
          >
            {props.book}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            sx={{ textTransform: "lowercase" }}
          >
            by {props.author}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{ textTransform: "lowercase" }}
          >
            {props.magazine}, {props.releaseYear}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{ textTransform: "lowercase" }}
          >
            score: {props.score}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{ textTransform: "lowercase" }}
          >
            tasting notes: {props.flavorProfile}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {props.index ? (
            <Link
              to={"/reviews/manga/" + props.slug}
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained" color="primary">
                Read
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Card>
  )
}

export default MangaCard
