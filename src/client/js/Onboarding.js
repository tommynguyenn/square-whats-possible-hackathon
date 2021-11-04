import React from 'react';
import axios from 'axios';

export default function Onboarding() {
    const call = async () => {
        const response = await axios('/api/v1/square/');
        console.log(response);
    }
    call();
	return (
		
           <h1>Square: Build What's POS_sible </h1>
  
	);
}
