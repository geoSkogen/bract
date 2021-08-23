import React from 'react'

import Review from './review.js'


class ReviewSnippet extends React.Component {

  constructor(props) {
    super(props)

    this.reviews = require('./data/reviews/schema.json')
    this.default_review = (this.reviews.length) ?
      this.reviews[0] : { review_author:'user', review_rating:5 }
    this.state = {
      selected_review : this.default_review
    }

  }

  preRenderConfig() {
    this.stars_path = 'assets/<%rating%>-gold-stars.png'
    this.stars_src = this.stars_path.replace('<%rating%>',this.state.selected_review.review_rating)

    this.stars_alt = this.state.selected_review.review_rating + ' star review by ' +
      this.state.selected_review.review_author
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
         {width:'200px', height: '200px', display:'block', margin:'0 auto', marginBottom:'20px'}
       }
      />
    )
  }

  renderRating(agg_rating, total_ratings) {
    return(
      <div
       itemProp='aggregateRating'
       itemScope
       itemType='https://schema.org/AggregateRating'
       className='product-snippet-agg-rating-wrapper'
       >
        <span itemProp='ratingValue'>{ agg_rating }</span>
        &nbsp;out of <span itemProp='bestRating'>5</span>
        &nbsp;based on <span itemProp='ratingCount'>{ total_ratings }</span>
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

  renderReviewOption(title,rating,index) {
    return(
      <option
      value={ index }
      className='review-option'
      key={index}
      >
       { rating + ' stars: ' + title }
      </option>
    )
  }

  renderReviewSelect(reviews) {

    var i = 0
    const options = []

    if (reviews.length) {
      //
      reviews.forEach( (review) => {
        options.push(
          this.renderReviewOption(
            review.review_title, review.review_rating.toString(), i.toString()
          )
        )
        i++
      })
      //
    } else {
      options.push(
        this.renderReviewOption(
          'a review','user', '5', '0'
        )
      )
    }

    return(
      <div className='flex-row flex-center'>
        <select
         id='review-select'
         name='review'
         onChange={ (event) => {
           this.setState( {
             selected_review : this.reviews[ Number(event.target.value) ]
           })
         }}
        >
         { options }
        </select>
      </div>
    )
  }

  render() {

    this.preRenderConfig()
    const agg_rating = this.props.schema.product_agg_rating
    const total_ratings = this.props.schema.product_total_ratings
    return(
  <div id='product-review-snippet-wrapper'>
    <div itemScope itemType='https://schema.org/Product' id="product-review-snippet">

      { this.renderFeaturedImage() }
      { this.renderProductName() }
      { this.renderProductBrand() }

      { this.renderRating(agg_rating, total_ratings) }

      { this.renderProductDescription() }

      <Review
        review = { this.state.selected_review }
        stars_src = { this.stars_src }
        stars_alt = { this.stars_alt }
      />

    </div>
    { this.renderReviewSelect(this.reviews) }
  </div>)
  }
}

export default ReviewSnippet
