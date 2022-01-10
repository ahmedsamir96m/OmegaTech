import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'

import { commerce } from '../../../lib/commerce'

import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ["Shipping address", "Payment details"]

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})
  const classes = useStyles();

  useEffect(() => {
    // creating checkout token, when cst move forward to checkout his order
    const generateToken = async () => {
      try {
        // params are the cart id the we want to generate token for and option object
        const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
        console.log(token)
        setCheckoutToken(token)
  
      } catch (error) {
        
      }
    }
    generateToken();
  }, [cart])

  const nextStep = () => setActiveStep(() => (prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep(() => (prevActiveStep) => prevActiveStep + 1)

  const nextCheckout = (shippingData) => {
    setShippingData(shippingData)
    nextStep()
  }

  const Confirmation = () => {return <div>Confirmation</div>}
  const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} nextCheckout={nextCheckout}/>
    : <PaymentForm checkoutToken={checkoutToken} />

  return (
    <div>
      <div className={classes.toolbar}/>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* render form incase checkout token true*/ }
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />} 
        </Paper>
      </main>
    </div>
  )
}

export default Checkout
