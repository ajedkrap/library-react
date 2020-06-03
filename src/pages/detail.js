import React, {Component} from 'react'

import Books from '../assets/dilan-2.png'

// class Edit extends Component {

// }

// class EditSuccess extends Component{

// }

class Details extends Component {
  constructor(props){
    super(props)
    this.state = {
      edit: false,
    }
  }

  componentDidMount(){
    const book = {Books} ? Books : ''
    const bookBg = document.getElementsByClassName("book-bg")[0];
    const setStyle = document.createAttribute("style");
    if (book !== '') {
      setStyle.value = `background-image: url('${book}')`;
    }
    else {
      setStyle.value = "background-color: linear-gradient(to bottom right,#7ae5f5, #c9f6ff)"
    }
    bookBg.attributes.setNamedItem(setStyle)
  }

  render(){
    return(
      <>
        <div className="content">
      <div className="floating-navbar">
        <div className="button-wrapper">
          <button className="back"> back </button>
        </div>
        <div className="admin">
          <ul className="item">
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        </div>
      </div>
      <div className="book-bg">
        
      </div>
      <div className="book-cover">
        <img src={ Books } alt="book cover"/>
      </div>
      <div className='content-wrapper'>
          <div className="book-wrapper">
            <div className="book-genre">
            <button>Novel</button>
            </div>
            <div className="book-details">
              <ul>
                <li className="book-title">Dilan 1990</li>
                <li className="book-status">Available</li>
              </ul>
            </div>
            <div className="book-release-date">
              30 Juni 2019
            </div>
            <div className="book-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam eget est rutrum ultrices. Donec laoreet enim a massa dapibus, cursus egestas dui pulvinar. Proin sit amet accumsan lectus. Nullam auctor auctor consequat. Donec semper magna erat, sed fringilla lacus pretium eget. Cras porttitor, nibh sit amet interdum bibendum, nibh velit accumsan tellus, vel vehicula tellus leo vitae ipsum. Praesent sit amet libero sed orci ullamcorper efficitur. Pellentesque in euismod purus, sit amet ultrices tortor. Vestibulum ante dui, tempor at dui id, tincidunt euismod diam. Integer pellentesque massa nibh, ac eleifend odio malesuada sed. Phasellus orci sem, cursus nec orci ut, accumsan facilisis lacus. Nullam at elementum nibh, ac gravida felis. In sagittis rhoncus nisi tempus dignissim. Sed fringilla consequat ante vitae lobortis. Cras posuere ligula vel enim suscipit malesuada. Vivamus non nulla ut ante imperdiet euismod quis nec massa.
            </div>
        </div>
        <div className="borrow">
          <div className="button-wrapper">
            <button>Borrow</button>
          </div>
        </div>
      </div>
    </div>
      </>
    )
  }
}

export default Details