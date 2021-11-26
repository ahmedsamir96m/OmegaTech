import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'

import useStyles from './styles'
import logo from '../../assets/logo/omega-logo.jpg'

const Navbar = ({ cartTotalItems }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography>
            <img src={logo} alt="Omega Tech" height="25px" className={classes.image} />
            OMEGA
          </Typography>
          <div className={classes.grow}></div>{/* for spacing purposes */}
          <div className={classes.button}>
            <IconButton aria-label="Show Cart Items" color="inherit">
              <Badge badgeContent={cartTotalItems} color="secondary">
                <ShoppingCart>
                </ShoppingCart>
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
