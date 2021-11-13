import React from 'react';
import { Button, TextField } from '@mui/material';
import { login, register } from './utils/helpers';

export default function Login( { setUser } ) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [feedbackMsg, setFeedbackMsg] = React.useState('');

    const loginUser = () => {
        login({ email, password }, setUser, setFeedbackMsg);
    }

    const registerUser = () => {
        register({ email, password }, setFeedbackMsg);
    }

    const test = () => {
        login({ email: 'tnguuyen@outlook.com', password: 'test123' }, setUser, setFeedbackMsg);
    }

    React.useEffect( () => {
        test();
    }, []);

	return (
        <React.Fragment>
            <h1>Square: Build What's POS_sible </h1>
            <div className="authentication">
                <TextField label="Email" variant="outlined" type="email" onChange={e => setEmail(e.target.value)} />
                <TextField label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} />
                <div className="authentication-cta">
                    <Button variant="contained" onClick={loginUser}>Log in</Button>
                    <Button variant="outlined" onClick={registerUser}>Register</Button>
                </div>
            </div>
            { feedbackMsg }
        </React.Fragment>
	);
}
