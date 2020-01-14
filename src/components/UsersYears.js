import React from 'react';
import Table from './Table';
import { objectToArray } from '../lib/utils';
import NivoLine from './NivoLine';

const UsersYears = (props) => {
    // @todo improve with daily or monthly diagram.
    const years = objectToArray(props.usersData.years);
    const xyYears = [];
    for (var item in props.usersData.years) {
        xyYears.push({
            "x": item, 
            "y": props.usersData.years[item],
        });
    }
    // @todo font + line color 
    const data = [
        {
          "id": "core contributors",
          "color": "hsl(217, 71%, 53%)",
          "data": xyYears,
        },
      ];
    return (
        <>
            <div className="nivo-container is-hidden-mobile">
              <NivoLine data={data} />
            </div>
            <Table 
                title='years'
                description='New core contributors by year'
                rows={years}
                headers={['Year', 'Core contributors']}
            />
        </>
    );
};

export default UsersYears;