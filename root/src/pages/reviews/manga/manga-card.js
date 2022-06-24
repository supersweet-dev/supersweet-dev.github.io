import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import * as React from "react"

const MangaCard = props => {
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="div"
            variant="h5"
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
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
      <CardMedia sx={{ width: 320 }}>{props.cover}</CardMedia>
    </Card>
  )
}

export default MangaCard
