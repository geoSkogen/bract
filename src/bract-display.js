import React from 'react'

import ClipboardPlaceholder from './clipboard-placeholder'

class BractDisplay extends React.Component {

  constructor(props) {
    super(props)

  }

  renderPlaceholder(json) {
    return(
      <ClipboardPlaceholder
       value={json}
       />
    )
  }

  render() {
    this.hidden_input = this.renderPlaceholder(this.props.json)
    return(
      <article id="form-display-box">

        <div className="flex-row flex-end">
          <i
          id="clipboard-icon"
          className="fa fa-clipboard"
          onClick = { (event) => {

            let field = document.querySelector('#clipboard-placeholder')
            field.select()
            field.setSelectionRange(0, field.value.length);

            document.execCommand('copy');

          }}
          ></i>
        </div>

        {this.props.json}
        {this.hidden_input}

      </article>
    )
  }
}

export default BractDisplay
