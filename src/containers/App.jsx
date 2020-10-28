import React from 'react';
import { connect } from 'react-redux'
import styles from '../styles/App.module.scss';
import Container from '@material-ui/core/Container';
import { Route, Switch, Redirect } from "react-router-dom";
import { Footer } from '../components';
import Navbar from './Navbar'
import MainPage from './MainPage'
import TimetablePage from './TimetablePage'
import { UsersPage } from '../components/UsersPage'
import ThreadsPage from './ThreadsPage'
import UserPage from './UserPage';
import Media from 'react-media';
import { setMobile, setTablet } from '../actions';

class App extends React.Component {
    render() {
        return (
            <div className={styles.web_app}>
                <Media query={{ minWidth: 601, maxWidth: 1000 }} onChange={matches => (matches ^ this.props.isTablet ? this.props.setTablet(matches) : null)} />
                <Media query={{ maxWidth: 600 }} onChange={matches => (matches ^ this.props.isMobile ? this.props.setMobile(matches) : null)} />
                <Navbar />
                <Container maxWidth="md" style={{ paddingTop: "88px", flexGrow: 1, width: "calc(100% - 280px)" }}>
                    <Switch>
                        <Route path="/" exact component={MainPage} />
                        <Route path="/timetable" exact component={TimetablePage} />
                        <Route path="/users" component={UsersPage} />
                        <Route path="/threads" component={ThreadsPage} />
                        <Route path="/:userShort" exact component={UserPage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                    <Footer />
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isMobile: state.app.isMobile,
    isTablet: state.app.isTablet,
})

const mapDispatchToProps = (dispatch) => ({
    setMobile: flag => dispatch(setMobile(flag)),
    setTablet: flag => dispatch(setTablet(flag)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)