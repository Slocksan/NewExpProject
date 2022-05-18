import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
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
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default NavMenu;