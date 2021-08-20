import React from 'react'

class ClipboardPlaceholder extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <textarea
       id='clipboard-placeholder'
       className='invis bract-input bract-placeholder'
       rows='24'
       cols='42'
       
       onChange = { (event) => {
         console.log(event.target.id)
       }}
       >
       </textarea>
    )
  }

}

export default ClipboardPlaceholder
