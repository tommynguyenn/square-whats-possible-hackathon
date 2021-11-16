import { Button, Box, Stepper, Step, StepLabel, Typography, TextField } from '@mui/material';
import React from 'react';
import { authorize } from './utils/helpers';

export default function Onboarding() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [link, setLink] = React.useState('linkhere');
    const [feedbackOpen, setFeedbackOpen] = React.useState(false);

    const steps = ['Connect with Square', "Share!"];
    
    const handleNext = () => {
        window.location.href = `/get-started?step=2`;
    };
    
    const handleBack = () => {
        window.location.href = `/get-started?step=1`;
    };
    
    const handleReset = () => {
        setActiveStep(0);
    };

    const handleConnect = async () => {
        const url = await authorize();
        window.open(url, '_blank').focus();
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        setFeedbackOpen(true);
    }

    React.useEffect( () => {
        const params = new URLSearchParams(window.location.search);
        const currentStep = params.get('step') - 1;
        setActiveStep(currentStep);

        if ( currentStep == 1 ) {
            // parse the oauth code
            const authCode = params.get('code');
            // Use this value when you call ObtainToken to get the access token and refresh token 
            // for the seller account. 
            // The value you provide to the ObtainToken call must match this value exactly.
        }
    }, []);

    return (
        <Box sx={{ width: '60%', margin: '15vh auto 0' }} className="onboarding">
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    { 
                        activeStep+1 === 1 && 
                        <div className="onboarding-connect">
                            <p>Get started by linking your Square store with our application.</p>
                            <Button variant="contained" onClick={handleConnect}>Connect</Button>
                        </div>
                    }
                    { 
                        activeStep+1 === 2 && 
                        <div className="onboarding-link">
                            <p>Share it to your customers now!</p>
                            <TextField 
                                InputProps={
                                    {readOnly: true}
                                } 
                                value={link}
                                className="onboarding-link-textfield"
                            />
                            <Button variant="contained" onClick={handleCopy}>Copy</Button>
                            <p>{feedbackOpen && 'Copied!'}</p>
                        </div>
                    }
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}