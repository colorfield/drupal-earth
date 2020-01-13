import React from 'react';

const Stack = () => (
  <section className="section section-text has-text-white">
    <div className="container is-fluid content">
      <h1 className="title has-text-white">Stack and dependencies</h1>
      <p>The following stack has been used on the frontend:</p>
      <ul>
        <li>React and Bulma for the UI</li>
        <li>Three.js + React Globe and D3.js for the 3D</li>
        <li>Nivo.rocks as an abstraction layer for D3.js charts and the React integration.</li>
      </ul>
    </div>
  </section>
);

export default Stack;
