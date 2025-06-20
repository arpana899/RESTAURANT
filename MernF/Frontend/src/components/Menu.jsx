import React, { useEffect } from 'react';
import data from '../restApi.json';

const Menu = () => {
  // Verify data loading
  if (!data?.dishes) {
    return (
      <section className='menu' id='menu'>
        <div className="container">
          <div className="heading_section">
            <h1 className="heading">POPULAR DISHES</h1>
            <p>Loading menu items...</p>
          </div>
        </div>
      </section>
    );
  }

  // Smooth scroll handling for navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#menu') {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
          setTimeout(() => {
            menuSection.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <section className='menu' id='menu'>
      <div className="container">
        <div className="heading_section">
          <h1 className="heading">POPULAR DISHES</h1>
          <p>Explore our customer favorites crafted with passion and fresh ingredients.</p>
        </div>
        
        <div className="dishes_container">
          {data.dishes.map((dish) => (
            <div className="card" key={dish.id}>
              <div className="image-container">
                <img 
                  src={dish.image.startsWith('/') ? dish.image : `/${dish.image}`}
                  alt={dish.title}
                  onError={(e) => {
                    e.target.src = '/placeholder-food.jpg';
                  }}
                />
              </div>
              <h3>{dish.title}</h3>
              <button className="category-btn">{dish.category}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;