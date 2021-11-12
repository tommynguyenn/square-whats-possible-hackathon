import React from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

export default function Login( { setUser } ) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');

    const login = async () => {
        const response = await axios.post('/api/v1/auth/login', { email, password });
        if ( response.data.status === 'OK' ) {
            setUser(response.data.data);
        } else {
            setErrorMsg(response.data.data);
        }
    }

    const test = async () => {
        const response = await axios.post('/api/v1/auth/login', { email: 'tnguuyen@outlook.com', password: 'test123' });
        console.log(response);
        if ( response.data.status === 'OK' ) {
            setUser(response.data.data);
            const res = await axios(`/api/v1/coinbase/test`);
            console.log(res);
        } else {
            setErrorMsg(response.data.data);
        }
    }

    React.useEffect(() => {
		test();
	}, []);

	return (
        <React.Fragment>
            <h1>Square: Build What's POS_sible </h1>
            <div>
                <TextField label="Email" variant="outlined" type="email" onChange={e => setEmail(e.target.value)} />
                <TextField label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} />
                <Button variant="contained" onClick={login}>Log in</Button>
            </div>
            { errorMsg }
        </React.Fragment>
	);
}
