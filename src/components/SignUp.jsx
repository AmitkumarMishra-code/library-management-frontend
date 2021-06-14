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
    input:{
        display:'none',
    }
});


export default function SignUp() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const history = useHistory()

    const classes = useStyles()
    const url = 'http://localhost:3300/auth/signup'
    let submitForm = async () => {
        setLoading(true)
        let formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        if(image){
            formData.append('profilePic', image)
        }

        let response = await fetch(url, {
            method: 'POST',
            body: formData
        })
        if (response.status !== 201) {
            console.log(await response.text())
            setLoading(false)
            return
        }
        else{
            history.push('/login')
        }
        let result = await response.json()
        console.log(result)
        setLoading(false)
    }
    return (
        <Paper elevation={2} className={classes.container}>
            <h1>Sign Up</h1>
            {/* <form autoComplete='off'> */}
            <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} name='name' variant='outlined' />
            <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' variant='outlined' />
            <TextField label='Password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' name='password' variant='outlined' />
            <TextField label='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' variant='outlined' />
            <input
                accept="image/*"
                className={classes.input}
                id="profilePic"
                name="profilePic"
                type="file"
                onChange = {(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="profilePic">
                <Button variant="contained" color="primary" component="span">
                    Upload Avatar
                </Button>
                <p>{image?.name}</p>
            </label>
            <Button
                type='raised'
                disabled={!name.length || !email.length || !password.length || confirmPassword !== password || loading}
                variant='contained'
                color='primary'
                onClick={submitForm}
            >
                Submit
                </Button>
            {/* </form> */}
        </Paper>
    )
}