import * as React from "react"
import Layoutw2l from "./layout-w2l"
import Seo from "./seo"
import MangaCard from "./manga-card"

const Entry = props => {
  return (
    <Layoutw2l>
      <Seo title={"w2l: " + props.book} />
      <MangaCard {...props} />
      <br />
      <br />
      {props.body}
    </Layoutw2l>
  )
}

export default Entry