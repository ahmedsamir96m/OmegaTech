import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import useStyles from './styles'
import CardItem from './CartItem/CartItem'

const Cart = ({ cart }) => {
  console.log(cart)
  const classes = useStyles();

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">Your cart it empty!
        <Link to="/" className={classes.link}>Add Items</Link>
      </Typography>
    )
  }

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CardItem item={item} />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_code}
          </Typography>
          <div>
            <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
            <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
         </div>
        </div>
      </>
    )
  }

  if(!cart.line_items) return 'Loading ...'

  return (
    <Container>
      <div className={classes.toolbar}></div>
      <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
      {!cart.line_items.length ? <EmptyCart></EmptyCart> : <FilledCart></FilledCart>}
    </Container>
  )
}

export default Cart