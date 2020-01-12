import React from 'react';

const Bar = (props) => {
    return(
        <>
            <div className="bar" style={{width : props.percent}}>&nbsp;</div>
        </>
    );
};

export default Bar;