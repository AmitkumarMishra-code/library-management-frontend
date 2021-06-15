import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, makeStyles, Paper, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete'

import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        padding: '12px',
        width: '50%',
        justifyContent: 'center'
    },
});
export default function Categories() {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const url = '/categories'
    let getBooks = async () => {
        let response = await axios.get(url)
        let data = await response.data
        setCategories(data)
        setLoading(false)
    }

    useEffect(() => {
        getBooks()
    }, [])

    useEffect(() => { }, [categories])

    let dialogHandler = (category) => {
        setOpenDialog(true)
        setSelectedCategory(category)
    }

    let handleClose = () => {
        setOpenDialog(false)
    }


    return (
        <Paper elevation={2} className={classes.container}>
            <Typography variant='h3' align='center' style={{ borderBottom: '1px solid black' }}>
                Categories
        </Typography>
            {loading ?
                <Box m={2} textAlign='center'>
                    <CircularProgress />
                </Box> :
                <List>
                    {categories.map((category, index) => {
                        return (
                            <ListItem >
                                <ListItemText primary={category.name} />
                                <IconButton
                                    aria-label="delete"
                                    className={classes.margin}
                                    onClick={() => dialogHandler(category)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            }
            {openDialog && <ConfirmDialog
                open={openDialog}
                handleClose={handleClose}
                category={selectedCategory}
                setCategories={setCategories}
            />}
        </Paper>
    )
}

function ConfirmDialog({ open, category, handleClose, setCategories }) {
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState('')
    const url = 'http://localhost:3300/books'

    let deleteHandler = async () => {
        setDeleting(true)
        let response = await fetch(url + '/' + category._id, { method: 'DELETE' })
        if (response.status === 201) {
            setDeleting(false)
            setCategories(prev => prev.filter(val => val._id !== category._id))
            handleClose()
        }
        else {
            setDeleting(false)
            setError('Something went wrong! Book could not be deleted!')
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography variant='h5' align='center'>
                    Are you sure you want to delete {category.title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                {error}
            </DialogContent>
            {deleting ?
                <Box m={2} textAlign='center'>
                    <CircularProgress />
                </Box> :
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>Close</Button>
                    <Button onClick={deleteHandler} color='primary'>Yes</Button>
                </DialogActions>}
        </Dialog>
    )


}