import React from 'react';
import axios from 'axios';

export default function Onboarding() {
    const call = async () => {
        const response = await axios('/api/v1/square/');
        console.log(response);
    }
    call();
	return (
		<div>
            hello
        </div>
	);
}
