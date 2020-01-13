import React from 'react';
import Table from './Table';
import NivoPie from '../components/NivoPie';
import { getSortedArrayByValue } from '../lib/utils';

const UsersLanguages = (props) => {
    const sortedPrimaryLanguages = getSortedArrayByValue(props.usersData.primary_languages).reverse();
    const sortedLanguages = getSortedArrayByValue(props.usersData.languages).reverse();
    const languages = [];
    const maxLanguages = 8;
    let languageIndex = 0;
    let otherLanguagesAmount = 0;
    sortedPrimaryLanguages.forEach(language => {
        if (languageIndex < maxLanguages) {
            languages.push({
                id: language[0],
                label: language[0],
                value: language[1],
            });
        }
        else {
            otherLanguagesAmount += language[1]; 
        }
        languageIndex++;
    });
    languages.push({
        id: 'Other',
        label: 'Other',
        value: otherLanguagesAmount,
    });

    return (
        <>
            <div className="nivo-container">
                <NivoPie data={languages} />
            </div>
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