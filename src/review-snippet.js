import React from 'react'

import Review from './review.js'

class ReviewSnippet extends React.Component {

  constructor(props) {
    super(props)

  }

  preRenderConfig() {
    this.stars_path = 'assets/<%rating%>-gold-stars.png'
    this.stars_src = this.stars_path.replace('<%rating%>',this.props.schema.reviews[0].review_rating)

    this.stars_alt = this.props.schema.reviews[0].review_rating + ' star review by ' +
      this.props.schema.reviews[0].review_author
    this.stars_alt += ' | ' + this.props.schema.biz_name + ' - ' + this.props.schema.product_name
    this.feat_img_alt = this.props.schema.product_brand + ' ' +
      this.props.schema.product_name + ' | ' + this.props.schema.biz_name
  }

  renderProductName() {
    return(
      <h3 className='product-snippet-name'>
        <span itemProp='name'>{ this.props.schema.product_name}</span>
      </h3>
    )
  }

  renderProductBrand() {
    return(
      <h4 className='product-snippet-brand'>
        <span itemProp='brand'>{ this.props.schema.product_brand }</span>
      </h4>
    )
  }

  renderFeaturedImage() {
    return(
      <img
       itemProp='image'
       className='product-snippet-img'
       id='product-snippet-feat-img'
       src={this.props.schema.feat_img_src}
       alt={this.feat_img_alt}
       style={
         {width:'200px', display:'block', margin:'0 auto', marginBottom:'20px'}
       }
      />
    )
  }

  renderRating() {
    return(
      <div
       itemProp='aggregateRating'
       itemScope
       itemType='https://schema.org/AggregateRating'
       className='product-snippet-agg-rating-wrapper'
       >
        <span itemProp='ratingValue'>{ this.props.schema.product_agg_rating }</span>
        &nbsp;out of <span itemProp='bestRating'>5</span>
        &nbsp;based on <span itemProp='ratingCount'>{ this.props.schema.product_total_ratings }</span>
        &nbsp;verified reviews
      </div>
    )
  }

  renderProductDescription() {
    return(
      <span itemProp='description' className='cr-product-snippet-description'>
        { this.props.schema.product_description }
      </span>
    )
  }

  render() {

    this.preRenderConfig()

    return(
  <div id='product-review-snippet-wrapper'>
    <div itemScope itemType='https://schema.org/Product' id="product-review-snippet">

      { this.renderFeaturedImage() }
      { this.renderProductName() }
      { this.renderProductBrand() }

      { this.renderRating() }

      { this.renderProductDescription() }

      <Review
        review = { this.props.schema.reviews[0] }
        stars_src = { this.stars_src }
        stars_alt = { this.stars_alt }
      />

    </div>
  </div>)
  }
}

export default ReviewSnippet
