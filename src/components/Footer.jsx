import React from 'react'
import classes from '../styles/Footer.module.scss'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Link } from '@material-ui/core';

export const Footer = () => {
    return (
        <Paper className={classes.footer} color="#95e1d3">
            <Typography variant="h6">
                Apache License 2.0 | Copyright 2017 - 2020 v01d, nik0n, Magik, APGames
            </Typography>
            <br/>
            <br/>

            <Typography variant="subtitle2">
                v01d — администратор, back-end dev, любые вопросы
            </Typography>
            <Typography variant="body2">
                email: <Link href="mailto:v01dmain@aol.com">v01dmain@aol.com</Link><br/>
                telegram: <Link href="https://tlgg.ru/v01d_t">@v01d_t</Link><br/>
                vk: <Link href="https://vk.com/v01d_vk">v01d_vk</Link><br/>
            </Typography>
            <br/>

            <Typography variant="subtitle2">
                APGames — администратор, front-end dev
            </Typography>
            <Typography variant="body2">
                email: <Link href="mailto:permenev.alex@ya.ru">permenev.alex@ya.ru</Link><br/>
                vk: <Link href="https://vk.com/apgames73">apgames73</Link><br/>
                skype: <Link href="skype:AlexGames73?chat">AlexGames73</Link><br/>
            </Typography>
            <br/>

            <Typography variant="subtitle2">
                nik0n aka Санчоус - администратор, front-end dev
            </Typography>
            <Typography variant="body2">
                vk: <Link href="https://vk.com/aleks_two">aleks_two</Link><br/>
                telegram: <Link href="https://tlgg.ru/n1k0n">@n1k0n</Link>
            </Typography>
            <br/>

            <Typography variant="subtitle2">
                Magik — администратор, android dev
            </Typography>
            <Typography variant="body2">
                vk: <Link href="https://vk.com/magik_21">magik_21</Link>
            </Typography>
        </Paper>
    )
}