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
        //globeElement.current.controls().enablePan = false;

        // Disable default zoom controls as it may conflict with page scrolling.
        // https://stackoverflow.com/questions/26183926/three-js-orbitcontrols-js-can-i-change-the-input-configuration
        // @todo add custom controls.
        //globeElement.current.controls().mouseButtons = {
            //ZOOM: THREE.MOUSE.RIGHT
            //ZOOM: THREE.MOUSE.MIDDLE
            //LEFT: THREE.MOUSE.ROTATE,
            //MIDDLE: THREE.MOUSE.DOLLY,
            //RIGHT: THREE.MOUSE.PAN
        //}
        globeElement.current.controls().enableZoom = false;
    }, []);

    const catColor = d3.scaleOrdinal(d3.schemeCategory10.map(col => polished.transparentize(0.2, col)));

    const getAlt = d => d.amountUsers * 5e-4;

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
            pointRadius={0.5}
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