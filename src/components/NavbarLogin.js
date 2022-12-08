import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPenToSquare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

function NavbarLogin() {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark navbar-dark text-dark">
        <div class="container-fluid">
          <a class="navbar-brand text-info" href="#">
            My Video Game Collection
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  My Collection
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  My Wishlist
                </a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Username" aria-label="Search" />
              <input class="form-control me-2" type="search" placeholder="Password" aria-label="Search" />
              <button class="btn btn-outline-success" type="button">
                Login
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavbarLogin;
