import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Content from './Content';
import Router from './Router';
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.func,
  };

  render() {
    const Site = styled.div`
      display: flex;
      flex-direction: column;
      align-items: stretch;
      min-height: 100vh;
    `;

    return (
      <Site>
        <Helmet
          title="Drupal Earth"
          meta={[
            {
              name: 'description',
              content: 'Data visualization based on the Drupal.org API',
            },
            {
              name: 'keywords',
              content: 'Drupal, statistics, data visualization, Drupal.org API',
            },
          ]}
          script={[
            { src: 'https://use.fontawesome.com/releases/v5.0.4/js/all.js' },
          ]}
          link={[
            {
              rel: 'stylesheet',
              href:
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
            },
          ]}
        />
        <div className="App">
          <Header />
          <div className="Content">
            <Content>
              <Router />
            </Content>
          </div>
          <Footer />
        </div>
      </Site>
    );
  }
}

export default Layout;
