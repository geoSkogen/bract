import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';


class BractField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valid : false,
      err : ''
    }
  }

  render() {
    return (
      <div className='flex-row flex-center'>
        <div className='field-cell'>

          <input
           name={this.props.name}
           placeholder={this.props.label}
           type={this.props.type}
           id={'input-for-' + this.props.name}
           className={'bract-field'}
           onChange={ (event) => {
            // console.log('validity check')
             this.props.validField(
               this.props.name,
               event.target.value,
               this.props.index
             )
           }}
          />

        </div>
      </div>
    )
  }
}

class BractForm extends React.Component {
  constructor(props) {
    super(props)

    this.fields = [
      {name:'f_name',label:'First Name',type:'text'},
      {name:'l_name',label:'Last Name',type:'text'},
      {name:'color',label:'What is your favorite color?',type:'text'},
      {name:'quest',label:'What is your quest?',type:'text'},
      {name:'dollars',label:'How many dollars can you lend me \'til Tuesday?',type:'text'}
    ]

    this.state = {
      valid_form : false,
      valid_fields : Array(this.fields.length).fill(null),
      field_vals : Array(this.fields.length).fill(null),
      field_errs : Array(this.fields.length).fill(null)
    }
  }

  renderField(name, label, type, int) {
    return (
      <BractField
       name = {name}
       label = {label}
       type = {type}
       index = {int}
       validField = { (val) => { this.validField(name,val,int) }}
      />
    )
  }

  validField(field_name, field_value, field_index) {
    let valid_fields_arr = this.state.valid_fields
    let field_errs_arr = this.state.field_errs
    let result = null
    let err = ''
    let name_patt = new RegExp(/[A-Za-z\s\'\-]*/)
    let code_patt = new RegExp(/[\{\}\=\[\]]*/)
    switch(field_name) {
      case 'f_name' :
      case 'l_name' :
        err = field_value.match(name_patt) ? '' : 'name contains invalid characters'
        break;
      case 'color' :
      case 'quest' :
        err = field_value.match(code_patt) ? 'input contains prohibited charactes' : ''
        break
      default :
        err = 'unexpected error occurred - you are fired'
    }
    result = (!err) ? true : false
    field_errs_arr[field_index] = err
    valid_fields_arr[field_index] = result
    console.log(valid_fields_arr)
    this.setState(
      { valid_fields : valid_fields_arr, field_errs : field_errs_arr }
    )
  }

  validForm() {
    let valid_tally = 0
    for (let i = 0; i < this.fields.length; i++) {
      //
      valid_tally += this.state.valid_fields[i] ? 1 : 0
    }
    if (valid_tally===this.fields.length) {
      this.setState( { valid_form : true })
    }
  }

  render() {
    return(
      <form id='bract-form'>
      {this.renderField(this.fields[0].name,this.fields[0].label,this.fields[0].type,0)}
      {this.renderField(this.fields[1].name,this.fields[1].label,this.fields[1].type,1)}
      {this.renderField(this.fields[2].name,this.fields[2].label,this.fields[2].type,2)}
      {this.renderField(this.fields[3].name,this.fields[3].label,this.fields[3].type,3)}
      {this.renderField(this.fields[4].name,this.fields[4].label,this.fields[4].type,4)}

      </form>
    )
  }
}

ReactDOM.render(
  <BractForm/>,
  document.querySelector('#root')
)
