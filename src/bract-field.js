import React from 'react'

class BractField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valid : false,
      err : this.props.err
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
          />

          <div className='err-msg'>{this.props.err}</div>

        </div>
      </div>
    )
  }
}

export default BractField
