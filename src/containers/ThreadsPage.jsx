import React from 'react';
import { connect } from 'react-redux'
import stylesPage from '../styles/ThreadsPage.module.scss';
import stylesMain from '../styles/App.module.scss';

import { MarkdownEditor } from '../components'
import { Paper } from '@material-ui/core';

class ThreadsPage extends React.Component {
    classes = { ...stylesMain, ...stylesPage }

    render() {
        return (
            <Paper className={this.classes.page + " " + this.classes.threads_page}>
                <MarkdownEditor />
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadsPage)