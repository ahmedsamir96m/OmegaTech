import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from "react-hook-form"

import { commerce } from '../../lib/commerce'
import FormInput from './CustomTextField'

const AddressForm = ({ checkoutToken }) => {
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')
  const methods = useForm();
  /* destructure the countries objects into aray of arries with key and values so it be able to map through */
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, lable: name}))

  const fetchShippingCountries = async(checkoutTokenID) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenID);
    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0]);
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [])

  return (
    <div>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name"></FormInput>
            <FormInput required name="lastName" label="Last name"></FormInput>
            <FormInput required name="address1" label="Address"></FormInput>
            <FormInput required name="email" label="Email"></FormInput>
            <FormInput required name="city" label="City"></FormInput>
            <FormInput required name="zip" label="ZIP / Postal code"></FormInput>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => {setShippingCountry(e.target.value)}}>
              {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.lable}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={''} fullWidth onChange={""}>
                <MenuItem key={0} value={""}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={''} fullWidth onChange={""}>
                <MenuItem key={0} value={""}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </div>
  )
}

export default AddressForm
