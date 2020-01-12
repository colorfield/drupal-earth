import React, { useState, useEffect } from 'react';
import UsersGlobe from '../components/UsersGlobe';
import AnimatedNumber from 'react-animated-number';
import logoBlue from '../logo-blue.svg';

const Home = () => {

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
          .then(setLoaded(true))
          .catch(err => {
              setError(err.message);
              setLoaded(true)
          });
  }, []);

  const joinData = (usersData, countries) => {
    const result = [];
    if (usersData.hasOwnProperty('countries')) {
        for (const countryKey in usersData.countries) {
            const amountUsers = usersData.countries[countryKey];
            if (countries.hasOwnProperty(countryKey)) {
                const country = countries[countryKey];
                const joinedData = {
                    countryName: country.name,
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

  const getTotalUsers = (usersData) => {
    let result = usersData.totalUsers;
    // replaced with aggregated data as not every user has set a country
    /*
    for (const countryKey in usersData.countries) {
      result += usersData.countries[countryKey];
    }
    */
    return result;  
  }
          
  if (loaded) {
    const usersByCountry = joinData(usersData, countries);
    const totalUsers = getTotalUsers(usersData);
    return (<>
      {error ? 
          <div className="error">{error.message}</div> :
          <section className="section-home">
            <div className="container is-fluid">
              <h1 className="title has-text-white site-title">
                <span>Drupal</span> 
                <img src={logoBlue} className="App-logo" alt="" /> 
                <span>Earth</span>
              </h1>
              <div className="key-numbers has-text-info">
                <AnimatedNumber 
                  component="text" 
                  value={totalUsers} 
                  duration={1000}
                  stepPrecision={0}
                  style={{
                    fontSize: 32,
                    marginLeft: 5,
                    transition: '0.8s ease-out',
                    transitionProperty:
                        'color, opacity'
                  }}
                />
                <span className="is-size-4">core contributors living in</span>
                <AnimatedNumber 
                  component="text" 
                  value={usersByCountry.length} 
                  duration={1000}
                  stepPrecision={0}
                  style={{
                    fontSize: 32,
                    marginLeft: 5,
                    transition: '0.8s ease-out',
                    transitionProperty:
                        'color, opacity'
                  }}
                />
                <span className="is-size-4">countries</span>
              </div>
              <div className="key-numbers has-text-light">
              Earth circumference (equatorial): 40,075 km. <br />Greatest distance between 2 contributors: 19,996 km - between Argentina and China.
              </div>
            </div>
            <div className="globe">
              <UsersGlobe usersByCountry={usersByCountry} />
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

export default Home;
