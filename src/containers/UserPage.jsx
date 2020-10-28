import React from 'react'
import { connect } from 'react-redux'

import stylesPage from '../styles/UserPage.module.scss'
import stylesMain from '../styles/App.module.scss'
import { Paper } from '@material-ui/core';
import { requestUser, recieveUser, clearUserData, changeError } from '../actions';

class UserPage extends React.Component {
    localClasses = { ...stylesMain, ...stylesPage }

    componentWillMount() {
        if (this.props.match.params.userId)
            this.props.requestUserById(this.props.match.params.userId, this.props.recieveUser.bind(this), this.props.changeError.bind(this))
        else if (this.props.match.params.userShort)
            this.props.requestUserByShort(this.props.match.params.userShort, this.props.recieveUser.bind(this), this.props.changeError.bind(this))
    }

    componentDidUpdate() {
        if (this.props.errorRecieve)
            this.props.history.push("/")
        document.title = this.props.userData ? this.props.userData.login : "User";
    }

    componentWillUnmount() {
        this.props.clearUserData()
    }
    
    render() {
        return this.props.userData ? (
            <div>
                <Paper className={`
                    ${this.localClasses.page}
                    ${this.localClasses.user_page}
                `}>
                    <div>{this.props.userData.login}</div>
                    <div>{this.props.userData.status}</div>
                </Paper>
            </div>
        ) : ""
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.user.userData,
        errorRecieve: state.user.errorRecieve,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestUserById: (userId, dispMain, dispErr) => dispatch(requestUser(userId, null, dispMain, dispErr)),
        requestUserByShort: (userShort, dispMain, dispErr) => dispatch(requestUser(null, userShort, dispMain, dispErr)),
        recieveUser: (user) => dispatch(recieveUser(user)),
        changeError: (flag) => dispatch(changeError(flag)),
        clearUserData: () => dispatch(clearUserData()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)