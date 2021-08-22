import React from 'react'

import BractField from './bract-field.js'
import BractImageSelect from './bract-image-select.js'
import Submit from './submit.js'

class BractForm extends React.Component {
  constructor(props) {
    super(props)

    this.fields = [
      {name:'biz_name',label:'Business Name',type:'text'},
      {name:'feat_img_src',label:'Logo URL',type:'text'},
      {name:'product_name',label:'Product Name',type:'text'},
      {name:'product_brand',label:'Product Brand',type:'text'},
      {name:'product_agg_rating',label:'Product Average Rating',type:'text'},
      {name:'product_total_ratings',label:'Total Ratings',type:'text'},
      {name:'product_description',label:'Product Description',type:'textarea'}
    ]

    this.catalog_data_path = './data/products/'
    this.image_file_path = 'assets/'

    this.catalog_items = require( this.catalog_data_path + 'schema.json' )

    this.default_image_filename = this.image_file_path + 'placeholder.jpg'

    this.state = {
      valid_form : false,
      valid_fields : Array(this.fields.length).fill(null),
      field_vals : Array(this.fields.length).fill(null),
      field_errs : Array(this.fields.length).fill(null),
      selected_image : this.default_image_filename
    }

    let field_vals = this.state.field_vals.slice()
    let valid_fields = this.state.valid_fields.slice()
    field_vals[1] = this.default_image_filename
    valid_fields[1] = true
    this.state.field_vals = field_vals
    this.state.valid_fields = valid_fields

    this.props.auditForm(
      this.state.field_vals,
      this.fields
    )
  }

  setFeaturedImage(filepath) {

    this.setState({ selected_image: filepath })
  }

  renderImageOption(filename,index) {
    return(
      <option
      className='image-option'
      value={ this.catalog_data_path + filename + '.jpg'}
      key={index}
      >
      { index + ': ' + filename}
      </option>
    )
  }

  renderImageSelect(catalog_items,name,label,int,err) {

    return(
    <BractImageSelect
      name={name}
      label = {label}
      index = {int}
      err = {err}
      key = {name}
      catalog_items = {catalog_items}
      value= {this.state.selected_image}
      validField = { (name,val,int) => { this.validField(name,val,int) }}
      setFeaturedImage = { (filepath) => { this.setFeaturedImage(filepath) }}
      />
    )
  }

  renderField(name, label, type, int, err) {

    return (
      <BractField
       name = {name}
       label = {label}
       type = {type}
       index = {int}
       err = {err}
       key = {name }
       validField = { (name,val,int) => { this.validField(name,val,int) }}
      />
    )
  }

  renderSubmit() {
    return(<Submit
      validForm = { () => { this.validForm() } }
    />)
  }

  validField(field_name, field_value, field_index) {
    let valid_fields_arr = this.state.valid_fields.slice()
    let field_errs_arr = this.state.field_errs.slice()
    let field_vals_arr = this.state.field_vals.slice()
    let result = null
    let err = ''
    let name_patt = new RegExp(/[A-Za-z\s\'\-]+/)
    let code_patt = new RegExp(/[\{\}\=\[\]\(\)]+/)

    switch(field_name) {
      case 'none' :
        err = name_patt.test(field_value) && !name_patt.test(code_patt) ?
          '' : 'name contains invalid characters'
        break
      case 'biz_name' :
      case 'feat_img_src' :
      case 'product_name' :
      case 'product_brand' :
      case 'product_agg_rating' :
      case 'product_total_ratings' :
      case 'product_description' :
        err = code_patt.test(field_value) ? 'input contains prohibited characters' : ''
        break
      default :
        err = 'unexpected error occurred - you are fired'
    }
    result = (!err) ? true : false
    field_errs_arr[field_index] = err
    valid_fields_arr[field_index] = result
    field_vals_arr[field_index] = (!err) ? field_value : ''

    this.setState({
      valid_fields : valid_fields_arr,
      field_errs : field_errs_arr,
      field_vals : field_vals_arr
    },
      this.props.auditForm(
        this.state.field_vals,
        this.fields
      )
    )
    //
  }

  handleSubmit() {
    //
    if (this.state.valid_form) {
      console.log('valid form')
      // AJAX POST JSON string of parent object's 'fields_arr' state property
      //this.props.postForm()
      this.props.showForm()
    } else {
      console.log('invalid form')
    }
  }

  validForm() {
    let valid_tally = 0

    for (let i = 0; i < this.fields.length; i++) {
      //
      valid_tally += this.state.valid_fields[i] ? 1 : 0
    }

    if (valid_tally===this.fields.length) {

      this.setState(
        { valid_form : true },
        this.handleSubmit        // callback function
      )
    }
  }

  render() {
    let i = 0
    const field_els = []

    this.fields.forEach( (field) => {
      if (i===1) {
        //
        field_els.push( this.renderImageSelect(
          this.catalog_items,
          field.name,
          field.label,
          i,
          this.state.field_errs[i]
        ))
      } else {
        //
        field_els.push(  this.renderField(
          field.name,
          field.label,
          field.type,
          i,
          this.state.field_errs[i]
        ) )
      }

      i++
    })

    return(
      <form id='bract-form' className="flex-row flex-center">
        <div className="form-interior">

        { field_els }

        { this.renderSubmit() }

        </div>
      </form>
    )
  }
}

export default BractForm
