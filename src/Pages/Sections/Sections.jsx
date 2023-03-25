import './Sections.css';

import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { CityContext } from '../../Context/CityContext';
import { types } from '../../data/data.js';
import { API } from '../../Services/API';

const Sections = () => {
  const [activities, setActivities] = useState('');
  const { city } = useContext(CityContext);
  const [loaded, setLoaded] = useState(false);
  const { name } = useParams();
  const getSection = () => {
    API.get(`/sections/${city}/${name}`).then((res) => {
      setActivities(res.data.results);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getSection();
  }, [name, city]);

  const filter = types.filter((filt) => filt.name === name);

  return (
    <main className="mainSection">
      <div
        className="divHero"
        style={{ backgroundImage: `url(${filter[0].img2})`, backgroundSize: `cover` }}
      >
        <h1 className="hero">{name}</h1>
      </div>
      {loaded ? (
        activities.map((activity) => (
          <div className="av-section-container" key={activity._id}>
            <div className="box">
              <div className="headerCard">
                <h3 className="activity">{activity.type}</h3>
                <Link
                  to={`/${activity.type}/${activity._id}`}
                  value={activity._id}
                  className="masInfo"
                >
                  + info
                </Link>
              </div>

              <img className="imgSection" src={activity.image} alt={activity.name} />
              <div className="subBox">
                <strong>{activity.name}</strong>
                <span>{activity.location}</span>
                <div className="footerCard">
                  <span className="sectionCity">{activity.city}</span>
                  <p className="stars">{activity.mediaStars} ⭐</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2> Loader... </h2>
      )}
    </main>
  );
};

export default Sections;
