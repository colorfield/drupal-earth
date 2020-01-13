import React from 'react';
import { ResponsiveLine } from '@nivo/line'

const NivoLine = (props) => (
    <ResponsiveLine
        data={props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        curve="cardinal"
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
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'paired' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
    />
)

export default NivoLine;
