import React from 'react'
import { connect } from 'react-redux'
import classes from "../styles/UserCard.module.scss"
import { Paper, Tooltip } from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars'

const UserCard = (props) => {
    return (
        <Tooltip title={`Нажмите, чтобы перейти`}>
            <Paper className={classes.user_card}>
                <Paper className={classes.avatar}>
                    <img src={props.userData.main_picture} alt="User's avatar" />
                </Paper>
                <div style={{textDecorationStyle: "none"}} className={classes.login}>{props.userData.login}{props.userData.role === "admin" ? <StarsIcon fontSize={props.isMobile ? "small" : "large"} /> : ""}</div>
            </Paper>
        </Tooltip>
    )
}

const mapStateToProps = (state) => ({
    isMobile: state.app.isMobile,
    isTablet: state.app.isTablet,
})

export default connect(mapStateToProps)(UserCard)