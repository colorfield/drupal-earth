import React from 'react';

// @todo add update date from json output
const Sources = () => (
  <section className="section section-text">
    <div className="container is-fluid content has-text-light">
      <h1 className="title has-text-white">Sources</h1>
      <p className="has-text-light">Data are fetched from various sources then aggregated.</p>
      <h2 className="subtitle has-text-white">Users</h2>
      <ul>
        <li><a href="http://drupalcores.com/">Drupal cores</a> site provides the user list</li>
        <li><a href="https://www.drupal.org/drupalorg/docs/apis/rest-and-other-apis">Drupal.org API</a></li>
      </ul>
      <h2 className="subtitle has-text-white">Projects</h2>
      <ul>
        <li>The <a href="https://www.drupal.org/project/usage/drupal">Usage statistics for Drupal core</a> page is used as the main source</li>
        <li>The <a href="https://www.drupal.org/project/usage">Project usage overview</a> page already provides the usage ordering projects.
        Another approach has been taken with the most downloaded projects by their type (module, theme, distribution - e.g. for <a href="https://www.drupal.org/api-d7/node.json?type=project_module&field_project_type=full&status=1&sort=field_download_count&direction=DESC">modules</a>).
        Then the aggregation is sorted with the total usage by version and limited to a subset.</li>
      </ul>
      <h2 className="subtitle has-text-white">Geography</h2>
      <ul>
        <li>Geographic data: <a href="https://restcountries.eu/">REST countries</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Extreme_points_of_Earth">Extreme points of Earth [Wikipedia]</a></li> 
      </ul>
    </div>
  </section>
);

export default Sources;
