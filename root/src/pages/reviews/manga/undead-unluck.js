import * as React from "react"
import Entry from "../../../components/entry"
import { reviews } from "../../../components/reviews"
const slug = "undead-unluck"
const props = reviews[slug]
const UndeadUnluck = () => <Entry {...props} />

export default UndeadUnluck
