import React from 'react';
import { Button, TextField } from '@mui/material';
import { login } from './utils/helpers';

export default function Login( { setUser } ) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState(''); 

    const loginUser = () => {
        login({ email, password }, setUser, setErrorMsg);
    }

	return (
        <React.Fragment>
            <h1>Square: Build What's POS_sible </h1>
            <div>
                <TextField label="Email" variant="outlined" type="email" onChange={e => setEmail(e.target.value)} />
                <TextField label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} />
                <Button variant="contained" onClick={loginUser}>Log in</Button>
            </div>
            { errorMsg }
        </React.Fragment>
	);
}
