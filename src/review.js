import React from 'react'

class Review extends React.Component {

  constructor(props) {
    super(props)
  }

  renderStars() {
    return(
      <center>
        <img className='stars' id='product-snippet-stars'
          alt={ this.props.stars_alt } src={ this.props.stars_src }
          width='200' style={ {marginBottom:'20px', width:'200px'} }
        />
      </center>
    )
  }

  renderCitation() {
    return(
    <strong>
      <span itemProp='name' className='cr-product-snippet-review-title'>
        { this.props.review.review_title }
      </span><br/>&nbsp;&mdash;&nbsp;
      <span itemProp='author' className='cr-product-snippet-review-author'>
        { this.props.review.review_author }
      </span>,&nbsp;
      <meta itemProp='datePublished' content={ this.props.review.review_date_mdy } />
      { this.props.review.review_date_readable }
    </strong>
    )
  }

  renderRating() {
    return(
      <div
      itemProp='reviewRating'
      itemScope
      itemType='https://schema.org/Rating'
      className='product-snippet-rating-wrapper'
      >
        <meta itemProp='worstRating' content = '1' />
        <span itemProp='ratingValue'>
          { this.props.review.review_rating }
        </span>
        /
        <span itemProp='bestRating'>5</span> stars
      </div>
    )
  }

  renderReview() {
    <span itemProp='reviewBody' className='cr-product-snippet-review-body'>
      { this.props.review.review_body }
    </span>
  }

  render() {
    return (

    <div itemProp='review' itemScope itemType='https://schema.org/Review' >
      <br/>

      { this.renderStars() }

      { this.renderCitation() }

      { this.renderRating() }

      { this.renderReview() }

    </div>
    )
  }
}

export default Review
