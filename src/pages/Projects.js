import React, { useState, useEffect } from 'react';
import NivoBar from '../components/NivoBar';

const Projects = (props) => {

  const [coreData, setCoreData] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [themeData, setThemeData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
      // @todo set load error handling.
      fetch('../data/core_project.json')
          .then(res => res.json())
          .then(setCoreData)
          .then(setLoaded(true))
          .catch(err => {
              setError(err.message);
          });
      
      // @todo dynamically set hook    
      /*    
      const projectTypes = ['module', 'theme', 'distribution'];
      projectTypes.forEach(type => {
      })
      */
     fetch('../data/projects_module.json')
          .then(res => res.json())
          .then(setModuleData)
          .then(setLoaded(true))
          .catch(err => {
              setError(err.message);
          });
      
      fetch(`../data/projects_theme.json`)
          .then(res => res.json())
          .then(setThemeData)
          .then(setLoaded(true))
          .catch(err => {
              setError(err.message);
          });    
      fetch(`../data/projects_distribution.json`)
          .then(res => res.json())
          .then(setDistributionData)
          .then(setLoaded(true))
          .catch(err => {
              setError(err.message);
              setLoaded(true)
          });
  }, []);

  // @todo use tabs 
  if (loaded) {
    return (<>
      {error ? 
          <div className="error">{error.message}</div> :
          <section className="section">
            <div className="container is-fluid has-text-white">
              <h1 className="title has-text-white">Projects</h1>
              <div className="is-hidden-mobile">
                <h2 className="title has-text-white">Drupal core</h2>
                <h3 className="subtitle has-text-white">Usage by version</h3>
                <div className="nivo-container">
                  <NivoBar data={coreData} index="year" animate={true} layout="vertical" formatDisabled={true} />
                </div>
                <h2 className="title has-text-white">Contributed projects</h2>
                <p className="has-text-white">Data based on the most downloaded and used projects by Drupal version.<br/>Results are truncated to 100 modules, 30 themes, 20 distributions.</p>
                <h3 className="subtitle has-text-white">Modules usage</h3>
                <div className="nivo-container-height-150">
                  <NivoBar data={moduleData} index="title" animate={false} layout="horizontal" leftMargin={300} />
                </div>
                <h3 className="subtitle has-text-white">Themes usage</h3>
                <div className="nivo-container-height-50">
                  <NivoBar data={themeData} index="title" animate={false} layout="horizontal" leftMargin={300} />
                </div>  
                <h3 className="subtitle has-text-white">Distributions usage</h3>
                <div className="nivo-container-height-50">
                  <NivoBar data={distributionData} index="title" animate={false} layout="horizontal" leftMargin={300} />
                </div>
              </div>
              <div className="is-hidden-tablet">
                <p>Not available yet on smaller screens.</p>
              </div>
            </div>
          </section>    
      }
    </>);
  }
  else {
    return (
      <div className="loader">
          ...
      </div>
    );
  }
}

export default Projects;
