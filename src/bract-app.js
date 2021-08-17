import React from 'react'

import BractDisplay from './bract-display.js'
import BractForm from './bract-form.js'
import Header from './header.js'

class BractApp extends React.Component {

  constructor(props) {
    super(props)
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
    this.setState({ fields_arr : keyval_pairs })
    //console.log(keyval_pairs)
  }

  postForm() {

  }

  showForm() {
    console.log(JSON.stringify(this.state.fields_arr))
  }

  renderHeader() {
    return(
      <Header />
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
      />
    )
  }

  render() {
    return(
      <div>
        {this.renderHeader()}
        <div id="app-interior" className="flex-row flex-center">
          {this.renderForm()}
          {this.renderDisplay( this.state.fields_arr )}
        </div>
      </div>
    )
  }
}

export default BractApp
