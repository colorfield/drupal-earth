import React, { Component }  from 'react';
import { withRouter, Link } from 'react-router-dom';
import logoBlack from '../logo-black.svg';

const Header = withRouter(props => <Nav {...props}/>);

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }));
  };

  render() {
    const path = this.props.location.pathname;
    // Using Link instead of NavLink to set custom active state.
    return (
      <nav
        className="navbar is-fixed-top is-light"
        role="navigation"
        aria-label="main navigation"
        style={{
          borderBottom: "solid 1px #dddddd",
          textAlign: "left",
        }}
      >
        <div className="navbar-brand">
          <Link className="navbar-item" to="/" onClick={this.toggleNav}>
            <img 
              src={logoBlack} alt=""
            />
          </Link>  
          <div className="navbar-item" href="/">
            <span className="has-text-weight-semibold">Drupal Earth</span>&nbsp;
            <span className="">0.1.0</span>
          </div>
          <button className="button navbar-burger is-light" onClick={this.toggleNav}>
            <span />
            <span />
            <span />
          </button>
        </div>
        <div
          className={
            this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'
          }
        >
          <div className="navbar-start">
            <Link className={path === '/' ? "is-active navbar-item" : "navbar-item"} to="/" onClick={this.toggleNav}>
              <span className="icon has-text-info" style={{ marginRight: 5 }}>
                <i className="fa fa-lg fa-map" />
              </span>
              Map
            </Link>
            <Link className={path.startsWith('users') ? "is-active navbar-item" : "navbar-item"} to="/users" onClick={this.toggleNav}>
              <span className="icon has-text-info" style={{ marginRight: 5 }}>
                <i className="fa fa-lg fa-user" />
              </span>
              Users
            </Link>
            <Link className={path === '/projects/core' ? "is-active navbar-item" : "navbar-item"} to="/projects/core" onClick={this.toggleNav}>
              <span
                className="icon has-text-info"
                style={{ marginRight: 5 }}
              >
                <i className="fas fa-code" />
              </span>
              Projects
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className={path.startsWith('/about') ? "is-active navbar-link" : "navbar-link"} to="/about" onClick={this.toggleNav}>About</Link>
              <div className="navbar-dropdown">
                <Link className={path === '/about' ? "is-active navbar-item" : "navbar-item"} to="/about" onClick={this.toggleNav}>The Drupal Earth project</Link>
                <hr className="navbar-divider" />
                <Link className={path === '/about-sources' ? "is-active navbar-item" : "navbar-item"} to="/about-sources" onClick={this.toggleNav}>Sources</Link>
                <Link className={path === '/about-credits' ? "is-active navbar-item" : "navbar-item"} to="/about-stack" onClick={this.toggleNav}>Stack</Link>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <a
              className="navbar-item"
              href="https://github.com/colorfield/drupal-earth"
            >
              <span className="icon">
                <i className="fab fa-lg fa-github" />
              </span>
            </a>
            <a className="navbar-item" href="https://twitter.com/drupalship">
              <span className="icon has-text-info" style={{ color: '#0084FF' }}>
                <i className="fab fa-lg fa-twitter" />
              </span>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
