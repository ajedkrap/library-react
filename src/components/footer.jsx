import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className='py-4 w-100 mantap' />
        <div className='py-4 w-100 mantap' />
        <div>

          <div style={{ zIndex: 15, backgroundColor: '#08CCF8' }} className="fixed-bottom w-100 web-footer p-4 text-white d-flex justify-content-center">
            <div className='h5 m-0'>buatan deja</div>
          </div>
        </div>

      </>
    )
  }
}


export default Footer;
