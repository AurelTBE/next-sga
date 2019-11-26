import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// Layout
import Layout from '../components/Layout.js';

import { connect } from 'react-redux'
import { withRouter } from 'next/router';
import { reauthenticate } from '../redux/actions/authActions';

const withAuth = restricted => ChildComponent => {
    class withAuth extends Component {
        static getInitialProps(ctx) {
            if(ChildComponent.getInitialProps)
                return ChildComponent.getInitialProps(ctx);
        }
        componentDidMount() {
            const isLoggedIn = this.props.authentication.token
            const { router } = this.props;
            if(!isLoggedIn) {
                router.push('/authentification');
            }
        }
        render(props) {
            return (
                <>
                {
                    this.props.authentication.token ? 
                    (restricted ? 
                        (restricted.includes(this.props.authentication.token.user_role[0]) ? 
                            <ChildComponent {...this.props} />
                            :
                            <Layout>
                                <Box p={3}>
                                    <Typography variant="h5" component="h2" color="primary">Désolé, tu n'as pas accès à cette page. Si tu fais partie de ce groupe, prend contact avec un bénévole pour demander qu'on valide ton compte</Typography>
                                    <Grid container spacing={1} direction="column" alignItems="center">
                                        <Box mt={3}>
                                            <Button variant="contained" color="primary" href="/">
                                                Retourner à l'accueil
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Box>
                            </Layout>
                        ) 
                        : 
                        <ChildComponent {...props} />
                        ) 
                    : null
                }
                </>
            )
        }
    }
    return withRouter(connect(
        state => state,
        { reauthenticate }
        )(withAuth));
}

export default withAuth;