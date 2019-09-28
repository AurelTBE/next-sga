import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

// Layout
import Layout from '../components/Layout.js';

import { connect } from 'react-redux'
import { withRouter } from 'next/router';
import { reauthenticate } from '../redux/actions/authActions';

const withAuth = restricted => ChildComponent => {
    class withAuth extends Component {
        componentDidMount() {
            const isLoggedIn = this.props.authentication.token
            const { router } = this.props;
            if(!isLoggedIn) {
                router.push('/connexion');
            }
        }
        render(props) {
            return (
                <>
                {
                    this.props.authentication.token ? 
                    (restricted ? 
                        (restricted.includes(this.props.authentication.token.user_role[0]) ? 
                            <ChildComponent {...props} />
                            :
                            <Layout>
                                <Typography variant="h5" component="h2" color="primary">Désolé, tu n'as pas accès à cette page. Si tu fais partie de ce groupe, prend contact avec un bénévole pour demander qu'on valide ton compte</Typography>
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
