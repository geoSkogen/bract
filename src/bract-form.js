import React from 'react'

import BractField from './bract-field.js'
import Submit from './submit.js'

class BractForm extends React.Component {
  constructor(props) {
    super(props)

    this.fields = [
      {name:'f_name',label:'First Name',type:'text'},
      {name:'l_name',label:'Last Name',type:'text'},
      {name:'color',label:'What is your favorite color?',type:'text'},
      {name:'quest',label:'What is your quest?',type:'text'},
      {name:'sum',label:'What are two, plus two?',type:'text'}
    ]

    this.state = {
      valid_form : false,
      valid_fields : Array(this.fields.length).fill(null),
      field_vals : Array(this.fields.length).fill(null),
      field_errs : Array(this.fields.length).fill(null)
    }
  }

  renderField(name, label, type, int, err) {
    return (
      <BractField
       name = {name}
       label = {label}
       type = {type}
       index = {int}
       err = {err}
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
      case 'f_name' :
      case 'l_name' :
        err = name_patt.test(field_value) && !name_patt.test(code_patt) ?
          '' : 'name contains invalid characters'
        break
      case 'color' :
      case 'quest' :
      case 'sum' :
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
    })
    //
    this.props.auditForm(
      this.state.field_vals,
      this.fields
    )
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
    return(
      <form id='bract-form' className="flex-row flex-center">
        <div className="form-interior">
    {this.renderField(this.fields[0].name,this.fields[0].label,this.fields[0].type,0,this.state.field_errs[0])}
    {this.renderField(this.fields[1].name,this.fields[1].label,this.fields[1].type,1,this.state.field_errs[1])}
    {this.renderField(this.fields[2].name,this.fields[2].label,this.fields[2].type,2,this.state.field_errs[2])}
    {this.renderField(this.fields[3].name,this.fields[3].label,this.fields[3].type,3,this.state.field_errs[3])}
    {this.renderField(this.fields[4].name,this.fields[4].label,this.fields[4].type,4,this.state.field_errs[4])}
    {this.renderSubmit()}
        </div>
      </form>
    )
  }
}

export default BractForm
