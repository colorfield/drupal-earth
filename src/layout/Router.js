import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import UsersPages from '../pages/UsersPages';
import Projects from '../pages/Projects';
import About from '../pages/About';
import Sources from '../pages/Sources';
import Stack from '../pages/Stack';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/users" component={UsersPages} />
    <Route path="/users/languages" component={UsersPages} />
    <Route path="/users/years" component={UsersPages} />
    <Route path="/users/industries" component={UsersPages} />
    <Route path="/users/contributions" component={UsersPages} />
    <Route path="/projects" component={Projects} />
    <Route path="/about" component={About} />
    <Route path="/about-sources" component={Sources} />
    <Route path="/about-stack" component={Stack} />
  </Switch>
);

export default Router;
