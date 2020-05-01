import React from 'react';
import { ResponsiveBar } from '@nivo/bar'

// @todo refactor format helper
// to be used for the axis title, tooltip and bar text (not done yet)

const NivoBar = (props) =>  {
    let leftMargin = 60;
    if (props.hasOwnProperty('leftMargin')) {
        leftMargin = props.leftMargin;
    }
    let formatDisabled = false;
    if (props.hasOwnProperty('formatDisabled')) {
        formatDisabled = props.formatDisabled;
    }
    return (
        <ResponsiveBar
            data={props.data}
            keys={[ '5.x', '6.x', '7.x', '8.x', '9.x' ]}
            indexBy={props.index}
            margin={{ top: 50, right: 130, bottom: 50, left: leftMargin }}
            padding={0.3}
            colors={{ scheme: 'spectral' }}
            // @todo generalize Nivo theme.
            theme={{
                axis: {
                    fontSize: "14px",
                    tickColor: "#eee",
                    ticks: {
                        line: {
                            stroke: "#555555"
                        },
                        text: {
                            fill:"#ffffff"
                        }
                    },
                    legend: {
                        text: {
                            fill: "#aaaaaa"
                        }
                    }
                },
            }}
            borderColor={{ from: 'color', modifiers: [ [ 'brighter', 1.6 ] ] }}
            // @todo add prop to enable
            axisTop={{tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32,
                format: value => {
                    if (isNaN(value) || formatDisabled) {
                        return value;
                    }
                    else {
                        return Number(value).toLocaleString('en-UK', {
                            minimumFractionDigits: 0,
                        })
                    }
                    
                }, 
            }}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32,
                format: value => {
                    if (isNaN(value) || formatDisabled) {
                        return value;
                    }
                    else {
                        return Number(value).toLocaleString('en-UK', {
                            minimumFractionDigits: 0,
                        })
                    }
                    
                },
            }}
            // @todo add prop to enable
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '', // Usage
                legendPosition: 'middle',
                legendOffset: 0,
                format: value => {
                    if (isNaN(value) || formatDisabled) {
                        return value;
                    }
                    else {
                        return Number(value).toLocaleString('en-UK', {
                            minimumFractionDigits: 0,
                        })
                    }
                }, 
            }}
            tooltip={({ id, value, color }) => {
                let displayedValue = value;
                if (!isNaN(value)) {
                    displayedValue = Number(value).toLocaleString('en-UK', {
                        minimumFractionDigits: 0,
                    });
                }    
                return (
                <strong style={{ color }}>
                    {id}: {displayedValue}
                </strong>
            )}}
            labelSkipWidth={36}
            labelSkipHeight={12}
            labelTextColor='#0e1111'
            animate={props.animate}
            layout={props.layout}
            motionStiffness={90}
            motionDamping={15}
        />
    )
}

export default NivoBar;