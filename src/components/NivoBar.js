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
            /*        
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#810f7c',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#88419d',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: '8.x'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: '7.x'
                    },
                    id: 'lines'
                }
            ]}
            */
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
            labelTextColor={{ from: 'color', modifiers: [ [ 'brighter', 2 ] ] }}
            // @todo provide option to enable
            /*
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            */
            animate={props.animate}
            layout={props.layout}
            motionStiffness={90}
            motionDamping={15}
        />
    )
}

export default NivoBar;