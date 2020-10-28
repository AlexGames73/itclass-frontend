import React from 'react';
import stylesPage from '../styles/TimetablePage.module.scss'
import stylesMain from '../styles/App.module.scss'
import { Paper } from '@material-ui/core';
import ReactLoading from 'react-loading'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { connect } from 'react-redux'
import { recieveTables, requestTables } from '../actions'

class TimetablePage extends React.Component {
    classes = { ...stylesMain, ...stylesPage }

    componentDidMount() {
        document.title = 'Расписание'
        if (this.props.timetable == null)
            this.props.requestTables(this.props.recieveTables.bind(this))
    }

    lessonToString(lesson) {
        return lesson ? (
            <React.Fragment>
                <div>{lesson.subject}</div>
                <div>({lesson.cab})</div>
            </React.Fragment>
        ) : (
                <div>-</div>
            )
    }

    getTimetable() {
        return (
            <Paper className={`
                ${this.classes.timetable_page}
                ${this.classes.page}
            `}>
                <Table className={this.classes.timetable_table}>
                    <TableHead className={this.classes.table_head}>
                        <TableRow>
                            <TableCell className={this.classes.table_title} colSpan={7} align="center">Расписание уроков</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead className={this.classes.table_head}>
                        <TableRow>
                            <TableCell size="small" className={this.classes.table_cell}>№</TableCell>
                            <TableCell size="small" className={this.classes.table_cell} align="right">Понедельник</TableCell>
                            <TableCell size="small" className={this.classes.table_cell} align="right">Вторник</TableCell>
                            <TableCell size="small" className={this.classes.table_cell} align="right">Среда</TableCell>
                            <TableCell size="small" className={this.classes.table_cell} align="right">Четверг</TableCell>
                            <TableCell size="small" className={this.classes.table_cell} align="right">Пятница</TableCell>
                            <TableCell size="small" className={this.classes.table_cell} align="right">Суббота</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.timetable.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell size="small" className={this.classes.table_cell}>{index + 1}</TableCell>
                                {row.map((x, index2) => (
                                    <TableCell size="small" className={this.classes.table_cell} key={index2} align="right">{this.lessonToString(x)}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    getWeekdays() {
        return (
            <Paper className={`
                ${this.classes.timetable_page}
                ${this.classes.page}
            `}>
                <Table className={this.classes.weekdays_table}>
                    <TableHead className={this.classes.table_head}>
                        <TableRow>
                            <TableCell className={this.classes.table_title} align="center" colSpan={4}>Расписание звонков (будни)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead className={this.classes.table_head}>
                        <TableRow>
                            <TableCell size="small" />
                            <TableCell size="small" align="right">Начало урока</TableCell>
                            <TableCell size="small" align="right">Конец урока</TableCell>
                            <TableCell size="small" align="right">Время перемены, мин</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.weekdays.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell size="small">{index + 1}</TableCell>
                                <TableCell size="small" align="right">{row[0]}</TableCell>
                                <TableCell size="small" align="right">{row[1]}</TableCell>
                                <TableCell size="small" align="right">{row[2]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    getWeekend() {
        return (
            <Paper className={`
                ${this.classes.timetable_page}
                ${this.classes.page}
            `}>
                <Table className={this.classes.weekend_table}>
                    <TableHead className={this.classes.table_head}>
                        <TableRow>
                            <TableCell className={this.classes.table_title} align="center" colSpan={4}>Расписание звонков (выходные)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead className={this.classes.table_head}>
                        <TableRow>
                            <TableCell size="small"/>
                            <TableCell size="small" align="right">Начало урока</TableCell>
                            <TableCell size="small" align="right">Конец урока</TableCell>
                            <TableCell size="small" align="right">Время перемены, мин</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.weekend.map((row, index) => (
                            <TableRow key={index} className={this.classes.table_row}>
                                <TableCell size="small">{index + 1}</TableCell>
                                <TableCell size="small" align="right">{row[0]}</TableCell>
                                <TableCell size="small" align="right">{row[1]}</TableCell>
                                <TableCell size="small" align="right">{row[2]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.props.timetable ? this.getTimetable() : null}
                {this.props.weekdays ? this.getWeekdays() : null}
                {this.props.weekend ? this.getWeekend() : null}
                {(this.props.timetable || this.props.weekdays || this.props.weekend) ? null : (
                    <ReactLoading type="spinningBubbles" color="#000" />
                )}
            </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        timetable: state.timetable.timetable,
        weekdays: state.timetable.weekdays,
        weekend: state.timetable.weekend,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        recieveTables: tables => {
            dispatch(recieveTables(tables))
        },
        requestTables: (disp) => {
            dispatch(requestTables(disp))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimetablePage)