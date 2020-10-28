import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link as RouterLink } from "react-router-dom"


export const ListItemLink = (props) => {
    const renderLink = React.forwardRef((itemProps, ref) => (
        <RouterLink to={props.to} {...itemProps} innerRef={ref} />
    ));
    const { icon, primary } = props;

    return (
        <li>
            <ListItem button component={renderLink} onClick={props.onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}