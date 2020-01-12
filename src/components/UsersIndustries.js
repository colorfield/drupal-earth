import React from 'react';
import Table from './Table';
import { getSortedArrayByValue } from '../lib/utils';

const UsersIndustries = (props) => {
    const sortedContributions = getSortedArrayByValue(props.usersData.industries).reverse();
    return (
        <Table 
            title='industries'
            description=''
            rows={sortedContributions}
            headers={['Industries', 'Core contributors']}
        />
    );
};

export default UsersIndustries;