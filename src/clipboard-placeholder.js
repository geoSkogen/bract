import React from 'react'

class ClipboardPlaceholder extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <input
       type='text'
       id='clipboard-placeholder'
       className='invis'
       value={ this.props.value }
       onChange = { (event) => {
         console.log(event.target.id)
       }}
       />
    )
  }

}

export default ClipboardPlaceholder
