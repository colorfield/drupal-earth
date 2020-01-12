import React from 'react';
import NivoPie from '../components/NivoPie';
import Bar from '../components/Bar';
import CountryLabel from '../components/CountryLabel';
import Table from '../components/Table';
import { getSortedArrayByItemKey } from '../lib/utils';

const UsersGeography = (props) => {
    const sortedCountries = getSortedArrayByItemKey(props.usersByCountry, 'amountUsers').reverse();
    // Rows matching Table headers.
    const countriesRows = sortedCountries.map(country => {
        const ratio = ((country[1].amountUsers * 100) / country[1].countryPopulation) * 10000 + 'px';
        return [
            <CountryLabel flag={country[1].countryFlag} name={country[1].countryName} />,
            new Intl.NumberFormat('en-UK', { maximumSignificantDigits: 10 }).format(country[1].amountUsers),
            new Intl.NumberFormat('en-UK', { maximumSignificantDigits: 10 }).format(country[1].countryPopulation),
            <Bar percent={ratio} />,
            //new Intl.NumberFormat('en-UK', { maximumSignificantDigits: 10 }).format(),
        ]
    });
    // Prepare data for the regions pie.
    // Get all the regions from the countries.
    const regions = [];
    const colors = [
        "hsl(284, 70%, 50%)",
        "hsl(40, 70%, 50%)",
        "hsl(142, 70%, 50%)",
        "hsl(155, 70%, 50%)",
        "hsl(1, 70%, 50%)",
    ];
    let regionIndex = 0;
    props.usersByCountry.forEach(country => {
        if (regions.some(region => region.id === country.countryRegion)) {
        const region = regions.find(region => region.id === country.countryRegion);
        let regionUsers = region.value;
        regionUsers += country.amountUsers;
        region.value = regionUsers;
        }
        else {
        regions.push({
            id: country.countryRegion,
            label: country.countryRegion,
            value: country.amountUsers,
            color: colors[regionIndex],
        });
        regionIndex++;
        }
    });
    const regionFills = [
        {
            match: {
                id: 'Europe'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'Americas'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'Asia'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'Oceania'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'Africa'
            },
            id: 'lines'
        }
    ];

    // @todo add visual ratio (bar)

    return (
        <>
            <h2 className="subtitle has-text-white">Core contributors by continent</h2>
            <div className="nivo-container">
                <NivoPie data={regions} fills={regionFills} />
            </div>
            <Table 
                title='countries'
                rows={countriesRows}
                headers={['Country', 'Core contributors', 'Population', 'Ratio, based on population']}
            />
        </>
    );

};

export default UsersGeography;