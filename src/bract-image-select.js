import React from 'react'

class BractImageSelect extends React.Component {

  constructor(props) {
    super(props)

    this.image_file_path = 'assets/product-images/'

    this.state = {
      valid : false,
      value : this.props.value,
      err : this.props.err
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {

    this.setState({ value: event.target.value })
    this.props.setFeaturedImage( event.target.value )
    this.props.validField(
      this.props.name,
      event.target.value,
      this.props.index
    )
  }

  renderImageOption(filename,index) {
    return(
      <option
      className='image-option'
      value={ this.image_file_path + filename + '.jpg'}
      key={index}
      >
      { index + ': ' + filename}
      </option>
    )
  }

  render() {
    let i = 0
    const options = []
     this.props.catalog_items.forEach( (item) => {
      options.push( this.renderImageOption( item.image, (i+1).toString() ))
      i++
    })
    return(
    <div className='flex-outer flex-center'>
      <div className='field-cell'>
        <p className='label'>Product Image | Logo</p>
        <select
        id='image-select'
        className='bract-field'
        name={this.props.name}
        label = {this.props.label}
        index = {this.props.index}
        err = {this.props.err}
        key = {this.props.name}
        value = {this.state.value}
        onChange = { (event) => {
          this.handleInputChange(event)
        }}
        onBlur = { (event) => {
          this.handleInputChange(event)
        }}
        >
        {options}
        </select>
      </div>
    </div>
    )
  }
}

export default BractImageSelect
