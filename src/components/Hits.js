import React from 'react'
import Grid from '@material-ui/core/Grid'
import { connectHits } from 'react-instantsearch-dom'

function Hits(props) {
  const { hits, hitComponent: HitComponent } = props

  return (
    <Grid container direction='column' spacing={2}>
      {hits.map(hit => (
        <Grid key={hit.objectID} item>
          <HitComponent hit={hit} />
        </Grid>
      ))}
    </Grid>
  )
}

export default connectHits(Hits)
