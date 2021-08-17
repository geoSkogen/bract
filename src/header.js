import React from 'react'

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.h1 = 'Car Ship'
    this.h2 = 'HouseCar'
  }

  render() {
    return(
      <header id="bract-header">
        <h1>
          {this.h1}
        </h1>
        <h2>
          {this.h2}
        </h2>
      </header>
    )
  }
}

export default Header
