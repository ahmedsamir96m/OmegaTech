import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'

import useStyles from './styles'

const Product = ({ product, handleAddToCart }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.image.url} title={product.name}></CardMedia>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography varient="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography varient="h5">
            {product.price.formatted_with_code}
          </Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{__html:product.description}} varient="body2" color="textSecondary">
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add To Cart" onClick={() => {handleAddToCart(product.id, 1)}}>
          <AddShoppingCart></AddShoppingCart>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Product
