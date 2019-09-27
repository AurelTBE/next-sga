import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'next/router';

export default function(ChildComponent) {
    class withAuth extends Component {
        componentDidMount() {
            const { router } = this.props;
            if(!this.props.isLoggedIn) {
                router.push('/connexion');
                console.log("Hey t'es pas connecté!")
            }
        }
        render() {
            return <ChildComponent />;
        }
    }
    const mapStateToProps = state => ({
        isLoggedIn: state.authentication.token
    })
    return withRouter(connect(mapStateToProps)(withAuth));
}
