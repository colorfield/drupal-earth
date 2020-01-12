import React from 'react';

const CountryName = (props) => {
    return(
        <>
            <img src={props.flag} width="20" alt={props.name} />&nbsp; <span>{props.name}</span>
        </>
    );
};

export default CountryName;
