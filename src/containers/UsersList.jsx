import React from 'react'
import { Paper, ButtonGroup, Button } from '@material-ui/core'
import ReactLoading from 'react-loading'
import jQuery from 'jquery'
import { connect } from 'react-redux'

import stylesPage from '../styles/UsersList.module.scss'
import stylesMain from '../styles/App.module.scss'
import UserCard from './UserCard';
import { recieveUsers, requestUsers, changePage, changeSize } from '../actions'

class UsersList extends React.Component {
    localClasses = { ...stylesMain, ...stylesPage }

    componentDidMount() {
        document.title = 'Пользователи';
        if (this.props.users == null)
            this.props.requestUsers(this.props.recieveUsers.bind(this))
    }

    handlePageButton(curPage) {
        jQuery("html, body").animate({ scrollTop: 0 }, 200, () => this.props.changePage(curPage));
    }

    handleSizePage(sizePage) {
        jQuery("html, body").animate({ scrollTop: 0 }, 200, () => this.props.changeSize(sizePage));
    }

    getNavigationButtons(page) {
        const pages = []
        const buf = Math.ceil(this.props.users.length / this.props.countUsersOnPage);
        for (let i = Math.max(Math.min(buf - 4, page - 2), 1); i <= Math.min(Math.max(5, page + 2), buf); i++) {
            pages.push(i)
        }
        return pages
    }

    getUsers() {
        return this.props.users.slice(
            (this.props.curPage - 1) * this.props.countUsersOnPage,
            Math.min(this.props.curPage * this.props.countUsersOnPage, this.props.users.length)
        ).map((user, index) => (
            <div className={this.localClasses.user_card} key={index} onClick={() => this.props.history.push(user.custom_link ? `/${user.custom_link}` : `/users/${user.id}`)}>
                <UserCard userData={user} />
            </div>
        ))
    }

    getTopButtons() {
        return (
            <div style={{textAlign: "center"}}>
                Count users on page:&nbsp;&nbsp;
                <ButtonGroup variant="contained" size="small" className={this.localClasses.size_page_group}>
                    {[5, 10, 20, 50].map((sizePage) => (
                        (sizePage === this.props.countUsersOnPage) ? (
                            <Button key={sizePage} style={{fontSize: (this.props.isMobile ? "8pt" : "10pt")}} disabled>{sizePage}</Button>
                        ) : (
                                <Button key={sizePage} style={{fontSize: (this.props.isMobile ? "8pt" : "10pt")}} onClick={() => this.handleSizePage(sizePage)}>{sizePage}</Button>
                            )
                    ))}
                </ButtonGroup>
            </div>
        )
    }

    getBottomButtons() {
        return (
            <div style={{textAlign: "center"}}>
                <ButtonGroup variant="contained" size="small">
                    {this.props.curPage > 3 && Math.ceil(this.props.users.length / this.props.countUsersOnPage) > 5 ? (
                        <Button variant="contained" style={{fontSize: (this.props.isMobile ? "8pt" : "10pt")}} onClick={() => this.handlePageButton(1)}>1...</Button>
                    ) : ""}
                    {this.getNavigationButtons(this.props.curPage).map((page) => (
                        (page === this.props.curPage) ? (
                            <Button key={page} style={{fontSize: (this.props.isMobile ? "8pt" : "10pt")}} disabled>{page}</Button>
                        ) : (
                                <Button key={page} style={{fontSize: (this.props.isMobile ? "8pt" : "10pt")}} onClick={() => this.handlePageButton(page)}>{page}</Button>
                            )
                    ))}
                    {Math.max(this.props.curPage + 3, 5) <= Math.ceil(this.props.users.length / this.props.countUsersOnPage) ? (
                        <Button variant="contained" style={{fontSize: (this.props.isMobile ? "8pt" : "10pt")}} onClick={() => this.handlePageButton(Math.ceil(this.props.users.length / this.props.countUsersOnPage))}>
                            ...{Math.ceil(this.props.users.length / this.props.countUsersOnPage)}
                        </Button>
                    ) : ""}
                </ButtonGroup>
            </div>
        )
    }

    render() {
        return (
            <Paper className={`
                ${this.localClasses.users_page}
                ${this.localClasses.page}
            `}>
                {this.props.users ? (
                    <React.Fragment>
                        {this.getTopButtons()}
                        {this.getUsers()}
                        {this.getBottomButtons()}
                    </React.Fragment>
                ) : <ReactLoading type="spinningBubbles" color="#000" />}
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        curPage: state.users.curPage,
        countUsersOnPage: state.users.countUsersOnPage,
        userId: state.users.userId,
        isMobile: state.app.isMobile,
        isTablet: state.app.isTablet,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestUsers: (disp) => dispatch(requestUsers(disp)),
        recieveUsers: (users) => dispatch(recieveUsers(users)),
        changePage: (page) => dispatch(changePage(page)),
        changeSize: (size) => dispatch(changeSize(size)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)