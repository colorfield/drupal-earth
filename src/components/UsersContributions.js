import React from 'react';
import Table from './Table';
import NivoPie from '../components/NivoPie';
import { getSortedArrayByValue } from '../lib/utils';

const UsersContributions = (props) => {
    const sortedContributions = getSortedArrayByValue(props.usersData.contributions).reverse();
    const contributions = [];
    sortedContributions.forEach(contribution => {
        contributions.push({
            id: contribution[0],
            label: contribution[0],
            value: contribution[1],
        });
    });
    return (
        <>
            <div className="nivo-container">
                <NivoPie data={contributions} />
            </div>
            <Table 
                title='contribution types'
                description=''
                rows={sortedContributions}
                headers={['Contribution type', 'Core contributors']}
            />
        </>
    );
};

export default UsersContributions;