import React from 'react';
import ProjectsCore from '../components/ProjectsCore';
import ProjectsContributed from '../components/ProjectsContributed';

const Projects = () => (
  <section className="section">
    <div className="container is-fluid has-text-white">
      <h1 className="title has-text-white">Projects</h1>
      <div className="is-hidden-mobile">
        <ProjectsCore />
        <h2 className="title has-text-white">Contributed projects</h2>
        <p className="has-text-white">Data based on the most downloaded and used projects by Drupal version.<br/>Results are truncated to 100 modules, 30 themes, 20 distributions.</p>
        <ProjectsContributed label="Modules" file="module" height="150" />
        <ProjectsContributed label="Themes" file="theme" height="50" />
        <ProjectsContributed label="Distributions" file="distribution" height="50" />
      </div>
      <div className="is-hidden-tablet">
        <p>Not available yet on smaller screens.</p>
      </div>
    </div>
  </section>
);

export default Projects;
