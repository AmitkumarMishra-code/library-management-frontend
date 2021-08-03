import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, makeStyles, Paper, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete'
import axios from "axios";
import { useEffect, useState } from "react";
const useStyles = makeStyles((theme) => ({
    customPaper: {
        padding: theme.spacing(2),
        width: '50%'
    },
    margin: {
        margin: theme.spacing(1),
    },
}));
export default function BooksList() {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)


    const url = '/books'
    let getBooks = async () => {
        let response = await axios.get(url)
        let data = await response.data
        setBooks(data)
        setLoading(false)
    }

    useEffect(() => {
        getBooks()
    }, [])

    useEffect(() => { }, [books])

    let dialogHandler = (book) => {
        setOpenDialog(true)
        setSelectedBook(book)
    }

    let handleClose = () => {
        setOpenDialog(false)
    }

    return (
        <Paper elevation={3} className={classes.customPaper}>
            <Typography variant='h3' align='center' style={{ borderBottom: '1px solid black' }}>
                All Books
            </Typography>
            {loading ?
                <Box m={2} textAlign='center'>
                    <CircularProgress />
                </Box> :
                <List>
                    {books.map((book, index) => {
                        return (
                            <ListItem key ={index}>
                                <ListItemText primary={book.title} secondary={book.authors.join(', ')} />
                                <IconButton
                                    aria-label="delete"
                                    className={classes.margin}
                                    onClick={() => dialogHandler(book)}
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
                book={selectedBook}
                setBooks={setBooks}
            />}
        </Paper>
    )
}

function ConfirmDialog({ open, book, handleClose, setBooks }) {
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState('')
    const url = 'https://library-management-back-end.herokuapp.com/books'

    let deleteHandler = async () => {
        setDeleting(true)
        let response = await fetch(url + '/' + book._id, { method: 'DELETE' })
        if (response.status === 201) {
            setDeleting(false)
            setBooks(prev => prev.filter(val => val._id !== book._id))
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
                    Are you sure you want to delete {book.title}
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