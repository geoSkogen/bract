import React from 'react'

import BractField from './bract-field.js'
import BractImageSelect from './bract-image-select.js'
import Submit from './submit.js'

class BractForm extends React.Component {
  constructor(props) {
    super(props)

    this.catalog_data_path = './data/products/'

    this.catalog_items = require( this.catalog_data_path + 'schema.json' )

    this.validField = this.validField.bind(this)

    this.fields = [
      {name:'biz_name',label:'Business Name',type:'text'},
      {name:'feat_img_src',label:'Logo URL',type:'text'},
      {name:'product_name',label:'Product Name',type:'text'},
      {name:'product_brand',label:'Product Brand',type:'text'},
      {name:'product_agg_rating',label:'Product Average Rating',type:'text'},
      {name:'product_total_ratings',label:'Total Ratings',type:'text'},
      {name:'product_description',label:'Product Description',type:'textarea'}
    ]

    this.state = {
      field_vals : Array(this.fields.length).fill(undefined),
      field_errs : Array(this.fields.length).fill(null),
      valid_fields : Array(this.fields.length).fill(null),
      valid_form : false
    }

    let field_vals = this.state.field_vals
    let valid_fields = this.state.valid_fields
    field_vals[1]  = 'assets/product-images/placeholder.jpg'
    valid_fields[1] = true

    this.state.field_vals = field_vals
    this.state.valid_fields = valid_fields

    this.props.auditForm(
      this.state.field_vals,
      this.fields
    )
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
      case 'product_name' :
      case 'product_brand' :
      case 'product_agg_rating' :
      case 'product_total_ratings' :
      case 'product_description' :
       err = code_patt.test(field_value) ? 'input contains prohibited characters' : ''
        break
      case 'feat_img_src' :
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
    })

    this.props.auditForm(
      field_vals_arr,
      this.fields
    )
    //
  }

  validForm() {
    let valid_tally = 0

    for (let i = 0; i < this.fields.length; i++) {
      //
      valid_tally += this.state.valid_fields[i] ? 1 : 0
      console.log(this.state.valid_fields[i])
    }

    if (valid_tally===this.fields.length) {
      console.log('valid form')
      this.setState(
        { valid_form: true },
        this.handleSubmit() // callback function
      )
    } else {
      console.log('invalid form')
    }
  }

  handleSubmit() {
    //

      // AJAX POST JSON string of parent object's 'fields_arr' state property
      //this.props.postForm()
      this.props.showForm()

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

  renderImageSelect(catalog_items,name,label,int,err,val) {

    return(
    <BractImageSelect
      name={name}
      label = {label}
      index = {int}
      err = {err}
      key = {name}
      value = {val}
      catalog_items = {catalog_items}
      validField = { (name,val,int) => { this.validField(name,val,int) }}
      />
    )
  }

  renderField(name, label, type, int, err, val) {

    return (
      <BractField
       name = {name}
       label = {label}
       type = {type}
       index = {int}
       err = {err}
       key = {name }
       value = {val}
       validField = { (name,val,int) => { this.validField(name,val,int) }}
      />
    )
  }

  renderSubmit() {
    return(<Submit
      validForm = { () => { this.validForm() } }
    />)
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
          this.state.field_errs[i],
          this.state.field_vals[i]
        ))
      } else {
        //
        field_els.push(  this.renderField(
          field.name,
          field.label,
          field.type,
          i,
          this.state.field_errs[i],
          this.state.field_vals[i]
        ))
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
