import React from 'react'

class Submit extends React.Component {

  constructor(props) {
    super(props)
    this.text = "Go!"
  }

  render() {
    return(
      <div className='flex-row flex-center'>
        <div className='field-cell'>
          <div
          id='submit button'
          className='plain-button'
          onClick = { () => { this.props.validForm() } }
          >
            {this.text}
          </div>
        </div>
      </div>
    )
  }

}

export default Submit
