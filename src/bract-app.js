import React from 'react'

import BractDisplay from './bract-display.js'
import BractForm from './bract-form.js'
import ReviewSnippet from './review-snippet.js'
import Header from './header.js'
import Footer from './footer.js'

class BractApp extends React.Component {

  constructor(props) {
    super(props)

    this.snippet_id = 'product-review-snippet-wrapper'
    this.placeholder_id = 'clipboard-placeholder'

    this.state = {
      logged_in : false,

      fields_arr : {}
    }

  }

  auditForm(field_entries,field_meta) {
    let keyval_pairs = {}
    for (let i = 0; i < field_entries.length; i++) {
      keyval_pairs[field_meta[i].name] = field_entries[i]
    }
    keyval_pairs.reviews = [
      this.sample_review
    ]
    this.setState({ fields_arr : keyval_pairs })
  }

  postForm() {

  }

  showForm() {
    console.log(JSON.stringify(this.state.fields_arr))
    const snippet = document.querySelector('#' + this.snippet_id)
    const field = document.querySelector('#' + this.placeholder_id)
    field.value = snippet.innerHTML
  }

  renderHeader() {
    return(
      <Header />
    )
  }

  renderFooter() {
    return(
      <Footer />
    )
  }

  renderForm() {
    return(
      <BractForm
        auditForm = { (vals_arr,keys_arr) => this.auditForm(vals_arr,keys_arr) }
        showForm = { () => this.showForm() }
        postForm = { () => this.postForm() }
      />
    )
  }

  renderDisplay(obj) {
    let display_obj = {}
    Object.keys(obj).forEach( (key) => {

      if (obj[key]===null) {
        display_obj[key] = ''
      } else {
        display_obj[key] = obj[key]
      }
    })
    return(
      <BractDisplay
      json = { JSON.stringify(display_obj) }
      clip_id = { this.snippet_id }
      />
    )
  }

  renderReviewSnippet(obj,arr) {
    return(
      <ReviewSnippet
       schema = { obj }
       />
    )
  }

  render() {

//    console.log(this.state.fields_arr)
    return(
      <>

        {this.renderHeader()}

        <div id="app-interior" className="flex-row flex-center">

          {this.renderForm()}

          {this.renderReviewSnippet( this.state.fields_arr, this.state.reviews)}

          {this.renderDisplay( this.state.fields_arr )}

        </div>

        {this.renderFooter()}

      </>
    )
  }
}

export default BractApp
