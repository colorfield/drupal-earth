import React from 'react';
import Table from './Table';
import { getSortedArrayByValue } from '../lib/utils';

const UsersContributions = (props) => {
    const sortedContributions = getSortedArrayByValue(props.usersData.contributions).reverse();
    return (
        <Table 
            title='contribution types'
            description=''
            rows={sortedContributions}
            headers={['Contribution type', 'Core contributors']}
        />
    );
};

export default UsersContributions;