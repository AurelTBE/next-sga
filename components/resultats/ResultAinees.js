import React from 'react';

import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';

import CardSaisonAinees from '../cards/CardSaisonAinees';

function ResultAinees({results}) {

  return (
    <>     
      <Grid container alignItems="stretch" spacing={2}>
        {results.saisons.Ainées.map(saison => (
          <Grid item xs={12} sm={6} md={12} key={saison.groupe + saison.saison}>
            <CardSaisonAinees saison={saison} results={results} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const mapStateToProps = state => ({ 
  results: state.resultsbox,
 });

 export default connect(
  mapStateToProps
)(ResultAinees);