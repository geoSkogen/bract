import React from 'react'

class BractField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valid : false,
      value : '',
      err : this.props.err
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({ value: event.target.value })

    this.props.validField(
      this.props.name,
      event.target.value,
      this.props.index
    )
  }

  renderInput() {
    return(
      <input
       name={this.props.name}
       placeholder={this.props.label}
       type={this.props.type}
       id={'input-for-' + this.props.name}
       className={'bract-field'}
       value = { this.state.value }
       onChange={
         this.handleInputChange
       }
       onBlur={
         this.handleInputChange
       }
      />
    )
  }

  renderTextArea() {
    return(
      <textarea
       name={this.props.name}
       placeholder={this.props.label}
       id={'input-for-' + this.props.name}
       cols='24'
       rows='6'
       className={'bract-field bract-textarea'}
       onChange={ (event) => {

         this.props.validField(
           this.props.name,
           event.target.value,
           this.props.index
         )
       }}

       onBlur={ (event) => {

         this.props.validField(
           this.props.name,
           event.target.value,
           this.props.index
         )
       }}
      >
      </textarea>
    )
  }

  render() {

    let this_field = {}
    if (this.props.type==='textarea') {
      this_field = this.renderTextArea()
    } else {
      this_field = this.renderInput()
    }
    return (
      <div className='flex-row flex-center'>
        <div className='field-cell'>

          { this_field }

          <div className='err-msg'>{this.props.err}</div>

        </div>
      </div>
    )
  }
}

export default BractField
