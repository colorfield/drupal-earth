import React, { useState, useEffect } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import UsersGeography from '../components/UsersGeography';
import UsersLanguages from '../components/UsersLanguages';
import UsersContributions from '../components/UsersContributions';
import UsersIndustries from '../components/UsersIndustries';
import UsersYears from '../components/UsersYears';

const UsersPages = withRouter(props => <Users {...props}/>);

const Users = (props) => {

  // Refactor with Home
  const [usersData, setUsersData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
      fetch('../data/countries.json')
          .then(res => res.json())
          .then(setCountries)
          .catch(err => {
              setError(err.message);
              setLoaded(true)
          });
              
      fetch('../data/core_users.json')
          .then(res => res.json())
          .then(setUsersData)
          // @todo improve this flag set 
          // on the second load.
          .then(setLoaded(true))
          .catch(err => {
              setError(err.message);
              setLoaded(true)
          });
  }, []);

  const joinUsersByCountry = (usersData, countries) => {
    const result = [];
    if (usersData.hasOwnProperty('countries')) {
        for (const countryKey in usersData.countries) {
            const amountUsers = usersData.countries[countryKey];
            if (countries.hasOwnProperty(countryKey)) {
                const country = countries[countryKey];
                const joinedData = {
                    countryName: country.name,
                    countryPopulation: country.population,
                    countryArea: country.area,
                    countryRegion: country.region,
                    countryFlag: country.flag,
                    lat: country.latitude,
                    lon: country.longitude,
                    amountUsers: amountUsers
                };
                result.push(joinedData);   
            }
        }
    }
    return result;
  }
  
  // end refactor

  // Users and organizations
  // get amount of users and organizations with endpoints
  // heatmap by year/month account creation.
  // see readme
  
  if (loaded) {
        // @todo improve with not only router based and remove tab is active test.
        // prepare for SSR.
        const path = props.location.pathname;
        let page = () => {
          let result = null;
          switch(path) {
            case '/users':
            default:  
              const usersByCountry = joinUsersByCountry(usersData, countries);
              result = <UsersGeography usersByCountry={usersByCountry} />
              break;
            case '/users/languages':
              result = <UsersLanguages usersData={usersData} />
              break;
            case '/users/industries':
              result = <UsersIndustries usersData={usersData} />
              break;
            case '/users/years':
              result = <UsersYears usersData={usersData} />
              break;  
            case '/users/contributions':
              result = <UsersContributions usersData={usersData} />
              break;  
          }
          return result;
        }
  
        return (<>
          {error ? 
              <div className="error">{error.message}</div> :
              <section className="section hero">
                <div className="is-fluid">
                  <h1 className="title has-text-white">Drupal core contributors</h1>
                  <div className="tabs is-toggle is-toggle-rounded is-centered">
                    <ul>
                      <li className={path === '/users' ? "is-active" : ""}><NavLink to="/users" activeClassName="is-active" className="has-text-white">Geography</NavLink></li>
                      <li className={path === '/users/languages' ? "is-active" : ""}><NavLink to="/users/languages" activeClassName="is-active" className="has-text-white">Languages</NavLink></li>
                      <li className={path === '/users/years' ? "is-active" : ""}><NavLink to="/users/years" activeClassName="is-active" className="has-text-white">Years</NavLink></li>
                      <li className={path === '/users/industries' ? "is-active" : ""}><NavLink to="/users/industries" activeClassName="is-active" className="has-text-white">Industries</NavLink></li>
                      <li className={path === '/users/contributions' ? "is-active" : ""}><NavLink to="/users/contributions" activeClassName="is-active" className="has-text-white">Contributions</NavLink></li>
                    </ul>
                  </div>
                  { page() }
                </div>
              </section>
          }
        </>);
  }
  else {
    return (
        <div className="loader">
            ...
        </div>
    );
  }
}

export default UsersPages;
