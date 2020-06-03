import React, { Component } from 'react'

import Profile from '../assets/profile.png'
import Control from '../assets/control.png'
import Logo from '../assets/bookshelf.png'

class ListBook extends Component {
  render() {
    return (
      <>
        <div class="sidebar">
          <div class="control">
            <img src={Control} alt="control" />
          </div>
          <div class="profile">
            <div class="profile-picture" >
              <img src={Profile} alt="Profile Picture" />
            </div>
            <div class="profile-name">Niki Zefannya</div>
          </div>
          <ul class="menu">
            <li class="menu-item">Explore</li>
            <li class="menu-item">History</li>
            <li class="menu-item">Add Book</li>
          </ul>
        </div>
        <div class="main-content">
          <div class="navbar">
            <ul class="navbar-item">
              <li>All Categories</li>
              <li>All Time</li>
            </ul>
            <div class="search-wrapper">
              <input class="input-search" placeholder="Search Book" />
            </div>
            <div class="brand">
              <img class="icon" src={Logo} alt="Logo" />
              <div class="text">Library</div>
            </div>
          </div>
          <div class="container">
            <h3>List Book</h3>
            <div class="list-book">
              <div class="card">
                <div class='card-image'>

                </div>
                <div class="card-text">
                  <div class="title">
                    Lorem Ipsum
              </div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates eveniet nihil dicta veniam accusamus quasi, quae, incidunt dignissimos dolorum consectetur fuga illum, dolorem suscipit inventore alias aut corrupti odit a.
              </div>
                </div>
              </div>
              <div class="card">
                <div class='card-image'>

                </div>
                <div class="card-text">
                  <div class="title">
                    Lorem Ipsum
              </div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates eveniet nihil dicta veniam accusamus quasi, quae, incidunt dignissimos dolorum consectetur fuga illum, dolorem suscipit inventore alias aut corrupti odit a.
              </div>
                </div>
              </div>
              <div class="card">
                <div class='card-image'>

                </div>
                <div class="card-text">
                  <div class="title">
                    Lorem Ipsum
              </div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates eveniet nihil dicta veniam accusamus quasi, quae, incidunt dignissimos dolorum consectetur fuga illum, dolorem suscipit inventore alias aut corrupti odit a.
              </div>
                </div>
              </div>
            </div>
            <div class="list-book">
              <div class="card">
                <div class='card-image'>

                </div>
                <div class="card-text">
                  <div class="title">
                    Lorem Ipsum
              </div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates eveniet nihil dicta veniam accusamus quasi, quae, incidunt dignissimos dolorum consectetur fuga illum, dolorem suscipit inventore alias aut corrupti odit a.
              </div>
                </div>
              </div>
              <div class="card">
                <div class='card-image'>

                </div>
                <div class="card-text">
                  <div class="title">
                    Lorem Ipsum
              </div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates eveniet nihil dicta veniam accusamus quasi, quae, incidunt dignissimos dolorum consectetur fuga illum, dolorem suscipit inventore alias aut corrupti odit a.
              </div>
                </div>
              </div>
              <div class="card">
                <div class='card-image'>

                </div>
                <div class="card-text">
                  <div class="title">
                    Lorem Ipsum
              </div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates eveniet nihil dicta veniam accusamus quasi, quae, incidunt dignissimos dolorum consectetur fuga illum, dolorem suscipit inventore alias aut corrupti odit a.
              </div>
                </div>
              </div>
            </div>
            <div class="list-book">
              <div class="card">
                <div class='card-image'>

                </div>
                <div class="card-text">
                  <div class="title">
                    Lorem Ipsum
              </div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates eveniet nihil dicta veniam accusamus quasi, quae, incidunt dignissimos dolorum consectetur fuga illum, dolorem suscipit inventore alias aut corrupti odit a.
              </div>
                </div>
              </div>
              <div class="card">
                <div class='card-image'>

                </div>
                <div class="card-text">
                  <div class="title">
                    Lorem Ipsum
              </div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates eveniet nihil dicta veniam accusamus quasi, quae, incidunt dignissimos dolorum consectetur fuga illum, dolorem suscipit inventore alias aut corrupti odit a.
              </div>
                </div>
              </div>
              <div class="card">
                <div class='card-image'>

                </div>
                <div class="card-text">
                  <div class="title">
                    Lorem Ipsum
              </div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates eveniet nihil dicta veniam accusamus quasi, quae, incidunt dignissimos dolorum consectetur fuga illum, dolorem suscipit inventore alias aut corrupti odit a.
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    )
  }
}

export default ListBook