import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import ProjectsCore from '../components/ProjectsCore';
import ProjectsContributed from '../components/ProjectsContributed';

const ProjectsPages = withRouter(props => <Projects {...props}/>);

const Projects = (props) => {
  const path = props.location.pathname;
  let page = () => {
    let result = null;
    switch(path) {
      case '/projects/core':
      default:  
        result = <ProjectsCore />
        break;
      case '/projects/contributed/module':
        result = <ProjectsContributed key="module" label="Modules" file="module" height="150" />
        break;
      case '/projects/contributed/theme':
        result = <ProjectsContributed key="theme" label="Themes" file="theme" height="50" />
        break;
      case '/projects/contributed/distribution':
      result = <ProjectsContributed key="distribution" label="Distributions" file="distribution" height="50" />
        break;
    }
    return result;
  }
  
  return (
    <section className="section hero">
      <div className="container is-fluid has-text-white">
        <h1 className="title has-text-white">Projects</h1>
        <div className="is-hidden-mobile">
          <div className="tabs is-toggle is-toggle-rounded is-centered">
            <ul>
              <li className={path === '/projects/core' ? "is-active" : ""}><NavLink to="/projects/core" activeClassName="is-active" className="has-text-white">Core project</NavLink></li>
              <li className={path === '/projects/contributed/module' ? "is-active" : ""}><NavLink to="/projects/contributed/module" activeClassName="is-active" className="has-text-white">Modules</NavLink></li>
              <li className={path === '/projects/contributed/theme' ? "is-active" : ""}><NavLink to="/projects/contributed/theme" activeClassName="is-active" className="has-text-white">Themes</NavLink></li>
              <li className={path === '/projects/contributed/distribution' ? "is-active" : ""}><NavLink to="/projects/contributed/distribution" activeClassName="is-active" className="has-text-white">Distributions</NavLink></li>
            </ul>
          </div>
          { page() }
        </div>
        <div className="is-hidden-tablet has-text-grey">
          <p>Not available yet on smaller screens.</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPages;
