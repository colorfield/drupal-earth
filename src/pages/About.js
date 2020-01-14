import React from 'react';

const About = () => (
  <section className="section section-text has-text-white">
    <div className="container is-fluid content">
      <h1 className="title has-text-white">The Drupal Earth project</h1>
      <p>This project started as a playground to become a bit more familiar with Python, aggregating data from the <a href="https://www.drupal.org/drupalorg/docs/apis/rest-and-other-apis">Drupal.org APIs</a> to answer two specific questions: where are the Drupal peeps out there and what is the greatest distance between 2 Drupal contributors?<br />
      <br />
      Then a few other questions quickly followed:</p>

      <ul>
        <li>how are they contributing?</li>
        <li>which languages are they talking?</li>
        <li>how many core contributors joined, by year?</li>
        <li>what are they working on?</li>
        <li>...</li>
      </ul>

      <p>It would also be nice to answer questions related to projects:</p>

      <ul>
        <li>what is the core version usage by&nbsp; year</li>
        <li>and get the same idea for contributed projects</li>
      </ul>

      <p>While some of these data are available as is on <a href="https://www.drupal.org/project/usage">Drupal.org</a>, this project aggregates them or just displays them in another way.</p>

      <h2 className="subtitle has-text-white">Roadmap</h2>

      <p>This is still a playground so the roadmap is subject to change but the first things that I'd like to work on are:</p>

      <ul>
        <li>Weekly incremental update and monthly full update</li>
        <li>Extend data from core contributors to all Drupal users</li>
        <li>Add 3D map controls</li>
        <li>Add filters (filter projects by version, users by contribution type, ...)</li>
        <li>Add other aggregations and improve results</li>
        <li>Improve the UI</li>
        <li>SSR / PWA / Gatsby</li>
      </ul>
    </div>
  </section>
);

export default About;
