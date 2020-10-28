import React from 'react'
import { connect } from 'react-redux'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'

import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

import classes from "../styles/Navbar.module.scss"
import { ListItemLink } from '../components'
import {
    menuLeftChangeActionCreator,
    menuRightChangeActionCreator
} from '../actions'

class Navbar extends React.Component {
    getUserLogin = () => {
        return this.props.user.isAuth ?
            this.props.user.data.login :
            "ПОЛЬЗОВАТЕЛЬ";
    }

    getLinksMenuLeft = () => {
        return this.props.linksMenuLeft.map((item, index) => (
            <ListItemLink key={index} to={item[2]} primary={item[0]} icon={React.createElement(item[1])} onClick={() => this.props.menuLeftChange(false)} />
        ))
    }

    getLinksMenuRight = () => {
        return (
            <React.Fragment>
                {(this.props.user.isAuth ? this.props.linksMenuRightAuth : this.props.linksMenuRightUnauth).map((item, index) => (
                    <ListItemLink key={index} to={item[2]} primary={item[0]} icon={React.createElement(item[1])} onClick={() => this.props.menuRightChange(false)} />
                ))}
                {(this.props.user.isAuth && (this.props.user.data.role === "admin")) ? (
                    <ListItemLink key={-1} to={"/admin"} primary={"Админ"} icon={<VpnKeyIcon />} onClick={() => this.props.menuRightChange(false)} />
                ) : null}
            </React.Fragment>
        )
    }

    getUserButton = () => {
        return this.props.isMobile ? (
            <React.Fragment>
                <AccountCircleIcon fontSize="large" />
            </React.Fragment>
        ) : (
            <React.Fragment>
                <AccountCircleIcon fontSize="large" />
                <Typography variant="h5">{this.getUserLogin()}</Typography>
            </React.Fragment>
        )
    }

    getMenuLeft = () => {
        return this.props.isMobile || this.props.isTablet ? (
            <SwipeableDrawer
                onOpen={() => this.props.menuLeftChange(true)}
                open={this.props.openLeftMenu}
                onClose={() => this.props.menuLeftChange(false)}
                className={classes.drawer}
                classes={{ "paper": classes.drawerPaper }}
                swipeAreaWidth={40}
            >
                <List>{this.getLinksMenuLeft()}</List>
            </SwipeableDrawer>
        ) : (
            <SwipeableDrawer
                onOpen={() => this.props.menuLeftChange(true)}
                open={this.props.openLeftMenu}
                onClose={() => this.props.menuLeftChange(false)}
                className={`
                    ${classes.drawer}
                    ${classes.navbar}
                `}
                classes={{ "paper": classes.drawerPaper }}
                variant="permanent"
                
            >
                <List>{this.getLinksMenuLeft()}</List>
            </SwipeableDrawer>
        )
    }

    getMenuRight = () => {
        return (
            <SwipeableDrawer
                onOpen={() => this.props.menuRightChange(true)}
                open={this.props.openRightMenu}
                onClose={() => this.props.menuRightChange(false)}
                anchor={"right"}
                className={`
                    ${classes.drawer}
                `}
                classes={{ "paper": classes.drawerPaper }}
                swipeAreaWidth={40}
            >
                {this.props.isMobile ? (
                    <Typography className={classes.typography} variant="h5">{this.getUserLogin()}</Typography>
                ) : ""}
                <List>{this.getLinksMenuRight()}</List>
            </SwipeableDrawer>
        )
    }

    render() {
        return (
            <div>
                <AppBar position="fixed" className={classes.appbar}>
                    <Toolbar>
                        {this.props.isMobile || this.props.isTablet ? (
                            <IconButton color="inherit"
                                aria-label="Open drawer"
                                onClick={() => this.props.menuLeftChange(!this.props.openLeftMenu)}
                            ><MenuIcon fontSize="large" /></IconButton>
                        ) : ""}
                        <Typography variant="h5" noWrap className={classes.label}>ITCLASS</Typography>
                        <Button color="inherit"
                            aria-label="Open drawer"
                            onClick={() => this.props.menuRightChange(!this.props.openRightMenu)}
                        >{this.getUserButton()}</Button>
                    </Toolbar>
                </AppBar>
                {this.getMenuLeft()}
                {this.getMenuRight()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        openLeftMenu: state.navbar.openLeftMenu,
        openRightMenu: state.navbar.openRightMenu,
        linksMenuLeft: state.navbar.linksMenuLeft,
        linksMenuRightUnauth: state.navbar.linksMenuRightUnauth,
        linksMenuRightAuth: state.navbar.linksMenuRightAuth,
        user: state.app.user,
        isMobile: state.app.isMobile,
        isTablet: state.app.isTablet,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        menuLeftChange: (value) => dispatch(menuLeftChangeActionCreator(value)),
        menuRightChange: (value) => dispatch(menuRightChangeActionCreator(value))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)