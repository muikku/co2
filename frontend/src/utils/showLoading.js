import { Grid, Header } from 'semantic-ui-react'
import React from 'react'

const showLoading = (data) => {
  if(data === null){
    return (
      <div>
        <Grid centered columns={1} padded>
          <Grid.Column>
            <Header textAlign='center'> Loading... </Header>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default showLoading