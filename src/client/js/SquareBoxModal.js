import React from 'react';
import axios from 'axios';


export default function SquareBoxModal() {
    const call = async () => {
        const response = await axios('/api/v1/square/');
        console.log(response);
    }
    call();
	return (
		<div className="box">
            <h2>Testing Styling</h2>
            <p>Randomness</p>
        </div>
  
	);
}
