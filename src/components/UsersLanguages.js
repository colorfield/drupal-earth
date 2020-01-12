import React from 'react';
import Table from './Table';
import { getSortedArrayByValue } from '../lib/utils';

const UsersLanguages = (props) => {
    const sortedPrimaryLanguages = getSortedArrayByValue(props.usersData.primary_languages).reverse();
    const sortedLanguages = getSortedArrayByValue(props.usersData.languages).reverse();
    return (
        <>
            <Table 
                title='primary languages'
                description='Unique language by user.'
                rows={sortedPrimaryLanguages}
                headers={['Language', 'Core contributors']}
            />
            <Table 
                title='languages'
                description='Combines several languages by users.'
                rows={sortedLanguages}
                headers={['Language', 'Core contributors']}
            />
        </>
    );

};

export default UsersLanguages;