import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'next/router';
import { reauthenticate } from '../redux/actions/authActions';

export default function(ChildComponent) {
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
                    this.props.authentication.token ? <ChildComponent {...props} /> : null
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
