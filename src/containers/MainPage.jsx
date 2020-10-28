import React from 'react';
import { connect } from 'react-redux'
import classes from '../styles/MainPage.module.scss'

export class MainPage extends React.Component {
    componentWillMount() {
        document.title = "Главная"
    }

    render() {
        return (
            <div className={classes.main_page}>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);