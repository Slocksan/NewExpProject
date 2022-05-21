import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Button } from 'reactstrap';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.unLogin = this.unLogin.bind(this);
    this.state = {
      collapsed: true,
      isLogged: true,
      sitePath: process.env.REACT_APP_MY_API_URL
    };

    this.getCurrentUser();
  }

  toggleNavbar () {
    this.setState({
      ...this.state,
      collapsed: !this.state.collapsed
    });
  }

  async getCurrentUser () {
    const responce = await axios.get(this.state.sitePath + "/get-current-username", {
      headers: {
          'Authorization': `Bearer ${Cookies.get('Token')}` 
      }
    }).catch(err => {
      this.setState({...this.state, isLogged:false});
      Cookies.set('Username', '');
      Cookies.set('Token', '');
    });

    if(this.state.isLogged) {
      Cookies.set('Username',responce.data.username);
    }
  }

  async unLogin () {
    Cookies.set('Username', '');
    Cookies.set('Token', '');

    this.setState({...this.state, isLogged: false});
    window.location.reload();
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm">
          <Container className='navbar-main-container'>
            <NavbarBrand className='float-left d-block' href="/expeditions"><div class="logo"></div></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2 float-right" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink href="/expeditions" className="header-nav-link">Экспедиции</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/employees" className="header-nav-link">Сотрудники</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/reports" className="header-nav-link">Отчеты</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/directories" className="header-nav-link">Доп справочники</NavLink>
                </NavItem>
                {
                  this.state.isLogged && Cookies.get('Username') ? <div>
                    <span>{Cookies.get('Username')} </span>
                    <Button onClick={this.unLogin}>Выйти</Button>
                  </div> :
                  <NavItem>
                    <NavLink href="/login" className="header-nav-link">Логин</NavLink>
                  </NavItem>
                }
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default NavMenu;