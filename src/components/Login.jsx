import { Button, makeStyles, Paper, TextField } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";

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
export default function Login() {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const url = 'http://localhost:3300/auth/login'
    const history = useHistory()

    let handleLogin = async () => {
        setDisabled(true)

        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: { 'Content-Type': 'application/json' }
        })
        let data = await response.json()
        if (response.status !== 200) {
            console.log(data.message)
            setError(data.message)
            setDisabled(false)
            return
        }
        else {
            console.log(data.result)
            setDisabled(false)
            window.localStorage.setItem('access_Token', data.access_Token)
            window.localStorage.setItem('refresh_Token', data.refresh_Token)
            history.push('/books')
        }
    }

    return (
        <Paper elevation={2} className={classes.container}>
            <h1>Login</h1>
            <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' variant='outlined' />
            <TextField label='Password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' name='password' variant='outlined' />
            <Button
                disabled={!email || !password || disabled}
                type='raised'
                variant='contained'
                color='primary'
                onClick={handleLogin}
            >
                Login
                </Button>

            <Button
                type='raised'
                variant='contained'
                color='primary'
                onClick={() => history.push('/signup')}>
                New User? Sign Up
                </Button>
            <p>
                {error}
            </p>
        </Paper>
    )
}