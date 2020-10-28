import React from 'react'
import { Route } from 'react-router-dom'

import UsersList from '../containers/UsersList';
import UserPage from '../containers/UserPage';

export function UsersPage({ match }) {
    return (
        <div>
            <Route path={`${match.path}/:userId`} component={UserPage} />
            <Route exact path={match.path} component={UsersList} />
        </div>
    )
}