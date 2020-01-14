import React, { useState, useEffect }  from 'react';
import NivoBar from './NivoBar';

const ProjectsContributed = (props) => {

    const [projectData, setProjectData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
      fetch(`../data/projects_${props.file}.json`)
        .then(res => res.json())
        .then(setProjectData)
        .then(setLoaded(true))
        .catch(err => {
            setError(err.message);
      });
    }, [props]);

    if (loaded) {
      const heightClass = `nivo-container-height-${props.height}`;
      return (<>
        {error ? 
            <div className="error">{error.message}</div> :
            <>
              <h3 className="subtitle has-text-white">{props.label} usage</h3>
              <div className={heightClass}>
                <NivoBar data={projectData} index="title" animate={false} layout="horizontal" leftMargin={300} />
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

export default ProjectsContributed;