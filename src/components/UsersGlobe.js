import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
//import * as THREE from 'three';
import * as d3 from 'd3';
import * as polished from 'polished';

const UsersGlobe = (props) => {
    const globeElement = useRef();
    
    useEffect(() => {
        // Three.js orbit controls
        // https://threejs.org/docs/#examples/en/controls/OrbitControls
        // Auto-rotate
        globeElement.current.controls().autoRotate = true;
        globeElement.current.controls().autoRotateSpeed = 0.01;
        // Disable default zoom controls as it may conflict with page scrolling.
        // https://stackoverflow.com/questions/26183926/three-js-orbitcontrols-js-can-i-change-the-input-configuration
        // @todo add custom controls.
        //globeElement.current.controls().enablePan = false;
        //globeElement.current.controls().mouseButtons = {
        //}
        globeElement.current.controls().enableZoom = false;

        // Set initial point of view.
        const lat = 0;
        const lng = 0;
        const altitude = 2.3;
        globeElement.current.pointOfView({lat, lng, altitude});
    }, []);

    const catColor = d3.scaleOrdinal(d3.schemeCategory10.map(col => polished.transparentize(0.2, col)));
    const getAlt = d => d.amountUsers * 1e-3;

    // @todo refactor with CountryLabel.
    const getTooltip = d => `
      <article class="message">
        <div class="message-header">
            <img src="${d.countryFlag}" width="20" /> 
            &nbsp;${d.countryName}
        </div>
        <div class="message-body">
            Core contributors: <strong>${d.amountUsers}</strong>
        </div>
      </article>
    `;

    return (
        <Globe
            ref={globeElement}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            showAtmosphere={true}
            backgroundColor="#000011"
            pointsData={props.usersByCountry}
            pointLat="lat"
            pointLng="lon"
            pointAltitude={getAlt}
            pointRadius={0.55}
            pointColor={d => catColor(d.countryName)}
            pointLabel={getTooltip}
            labelsData={props.usersByCountry}
            labelLat="lat"
            labelLng="lon"
            labelAltitude={d => getAlt(d) + 1e-6}
            labelDotRadius={0.12}
            labelText="amountUsers"
            labelSize={0.15}
            labelResolution={1}
            labelLabel={getTooltip}
        />
    );
  };

  export default UsersGlobe;