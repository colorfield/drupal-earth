import React, { useState, useEffect }  from 'react';
import NivoBar from './NivoBar';

const ProjectsCore = (props) => {

    const [coreData, setCoreData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
      fetch('../data/core_project.json')
          .then(res => res.json())
          .then(setCoreData)
          .then(setLoaded(true))
          .catch(err => {
              setError(err.message);
          });
    }, []);

    if (loaded) {
      return (<>
        {error ? 
            <div className="error">{error.message}</div> :
            <>
              <h2 className="title has-text-white">Drupal core</h2>
              <h3 className="subtitle has-text-white">Usage by version</h3>
              <p>Average installations per year.</p>
              <div className="nivo-container">
                <NivoBar data={coreData} index="year" animate={true} layout="vertical" formatDisabled={true} />
              </div>  
            </>
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
};

export default ProjectsCore;