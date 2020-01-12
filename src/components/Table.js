import React from 'react';

const Table = (props) => {
    const tableId = '_' + Math.random().toString(36).substr(2, 9);
    let headerIndex = 0;
    let rowIndex = 0;
    return(
        <>
            <h2 className="subtitle has-text-white">
                {props.rows.length} {props.title}
            </h2>
            <h3 className="has-text-white">
                {props.description}
            </h3>
            <div className="table-container">
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                <tr>{
                        props.headers.map(header => {
                            headerIndex++;
                            return <th key={`table-${tableId}-header-${headerIndex}`}>{header}</th>
                        })
                    }</tr>
                </thead>
                <tbody>
                    { 
                       props.rows.map(row => {
                           let rowItemIndex = 0;
                           rowIndex++;
                           return <tr key={`table-${tableId}-row-${rowIndex}`}> {
                            row.map(rowItem => {
                              rowItemIndex++;
                              return <td 
                                      key={`table-${tableId}-row-${rowIndex}-item-${rowItemIndex}`}
                                      className="is-capitalized"
                                     >
                                      {rowItem}
                                     </td>
                            })
                           }
                           </tr>
                       })
                    }
                </tbody>
            </table>
            </div>
        </>
    );
};

export default Table;