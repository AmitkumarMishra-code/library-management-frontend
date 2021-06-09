import {
    AppBar,
    Button,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
    CssBaseline,
    ListItem,
    List,
    Drawer,
    ListItemText,
    ListItemIcon,
    Box,
    Container
} from "@material-ui/core";
import { Book, Category, Menu, People } from '@material-ui/icons'
import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import BooksList from "./BooksList";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    paddedContainer:{
        padding: theme.spacing(5)
    }
}));
export default function Main() {
    return (
        <Router>
            <Wrapper>
                <Switch>
                    <Route exact path='/'>
                        <Typography align='left' variant='h3'>
                            Welcome to McLaren Library
                    </Typography>
                    </Route>
                    <Route exact path='/books'>
                        <BooksList />
                    </Route>
                    <Route exact path='/categories'>
                        <Typography align='left' variant='h3'>
                            List of Categories
                    </Typography>
                    </Route>
                    <Route exact path='/members'>
                        <Typography align='left' variant='h3'>
                            List of Members
                    </Typography>
                    </Route>
                    <Route exact path='/issues'>
                        <Typography align='left' variant='h3'>
                            List of Book Issues
                    </Typography>
                    </Route>

                </Switch>
            </Wrapper>
        </Router>
    )
}

function Wrapper(props) {
    const classes = useStyles()
    let [drawerOpen, setDrawerOpen] = useState(false)

    let toggleDrawer = () => {
        setDrawerOpen(prev => !prev)
    }

    return (
        <div className="container">
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        McLaren College Library
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <React.Fragment>
                <Drawer
                    anchor={'left'}
                    open={drawerOpen}
                    onClose={toggleDrawer}
                >
                    <List>
                        <Typography align='center' variant='h5'>Menu</Typography>
                        <Box m={2} />
                        {[
                            { text: 'Books', icons: <Book />, link: '/books' },
                            { text: 'Categories', icons: <Category />, link: '/categories' },
                            { text: 'Members', icons: <People />, link: '/members' },
                            { text: 'Books Issued', icons: <Book />, link: '/issues' }
                        ].map(({ text, icons, link }, index) => (
                            <Link to={link} onClick={toggleDrawer}>
                                <ListItem className={classes.list} button key={text}>
                                    <ListItemIcon>{icons}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
            </React.Fragment>
            <Container fixed className = {classes.paddedContainer}>
                {props.children}
            </Container>
        </div>
    )
}