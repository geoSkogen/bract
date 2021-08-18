import React from 'react'

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

  render() {

    this.preRenderConfig()

    return(
  <div id='product-review-snippet-wrapper'>
    <div itemScope itemType='https://schema.org/Product' id="product-review-snippet">

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

      <h3 className='product-snippet-name'>
        <span itemProp='name'>{ this.props.schema.product_name}</span>
      </h3>

      <h4 className='product-snippet-brand'>
        <span itemProp='brand'>{ this.props.schema.product_brand }</span>
      </h4>

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
        <br/>

      <span itemProp='description' className='cr-product-snippet-description'>
        { this.props.schema.product_description }
      </span>

      <div itemProp='review' itemScope itemType='https://schema.org/Review' >
        <br/>

        <center>
          <img className='stars' id='product-snippet-stars'
            alt={ this.stars_alt } src={ this.stars_src }
            width='200' style={ {marginBottom:'20px', width:'200px'} }
          />
        </center>

        <strong>
          <span itemProp='name' className='cr-product-snippet-review-title'>
            { this.props.schema.reviews[0].review_title }
          </span><br/>&nbsp;&mdash;&nbsp;
          <span itemProp='author' className='cr-product-snippet-review-author'>
            { this.props.schema.reviews[0].review_author }
          </span>,&nbsp;
          <meta itemProp='datePublished' content={ this.props.schema.reviews[0].review_date_mdy } />
          { this.props.schema.reviews[0].review_date_readable }
        </strong>

        <div
        itemProp='reviewRating'
        itemScope
        itemType='https://schema.org/Rating'
        className='product-snippet-rating-wrapper'
        >
          <meta itemProp='worstRating' content = '1' />
          <span itemProp='ratingValue'>
            { this.props.schema.reviews[0].review_rating }
          </span>
          /
          <span itemProp='bestRating'>5</span> stars
        </div>
        <br/>

        <span itemProp='reviewBody' className='cr-product-snippet-review-body'>
          { this.props.schema.reviews[0].review_body }
        </span>

      </div>

    </div>
  </div>)
  }
}

export default ReviewSnippet
