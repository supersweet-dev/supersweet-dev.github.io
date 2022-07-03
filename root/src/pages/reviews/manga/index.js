import { Typography } from "@mui/material"
import * as React from "react"
import Layoutw2l from "../../../components/layout-w2l"
import Seo from "../../../components/seo"
import MangaCard from "../../../components/manga-card"
import { reviews } from "../../../components/reviews"

const IndexPage = () => {
  const entries = []
  for (const key in reviews) {
    entries.push(<MangaCard {...reviews[key]} index key={key} />)
  }
  return (
    <Layoutw2l>
      <Seo title="Write 2 Left Reviews" />
      <Typography variant="h3">Manga Reviews</Typography>
      <br />

      <Typography variant="body1" paragraph>
        Volume 1 must be the most endearing.
      </Typography>
      <Typography variant="body1" paragraph>
        Hi, in the next few weeks I'll be using this site to publish my thoughts
        on manga.
      </Typography>
      <Typography variant="body1" paragraph>
        I'll be exclusively reviewing Volume 1 of each series. And I'm only
        reviewing physical books with official North American releases.
      </Typography>
      <Typography variant="body1" paragraph>
        I plan to review each volume mostly as an individual work, but also the
        seed that gave room to the rest of the series. So, I will read each
        manga all the way up to its current release. Unless it becomes
        unreadable.
      </Typography>
      <Typography variant="body1" paragraph>
        Each volume will be compared to its predecesors and contemporaries, in
        an effort to acertain its cultural impact at release.
      </Typography>
      <br />
      <br />

      {entries}
    </Layoutw2l>
  )
}

export default IndexPage
