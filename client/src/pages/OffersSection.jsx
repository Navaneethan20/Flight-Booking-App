import React from 'react';
import '../styles/OfferSection.css';
import o1Image from '../assets/offers/o1.jpg';
import o2Image from '../assets/offers/o2.jpeg';
import o3Image from '../assets/offers/03.jpg';
import o4Image from '../assets/offers/o4.jpg';
const OffersSection = () => {
  const offers = [
    {
      image: o1Image,
      tag: "LIMITED TIME",
      title: "Discover Europe",
      description: "Get exclusive discounts on European destinations."
    },
    {
      image: o2Image,
      tag: "STUDENT SPECIAL",
      title: "Study Aboard",
      description: "Special fare for international students."
    },
    {
      image: o3Image,
      tag: "WEEKEND GATEWAY",
      title: "Domestic Bliss",
      description: "Upto 20% off on domestic flights."
    },
    {
      image: o4Image,
      tag: "BUSINESS CLASS",
      title: "Luxury in the Sky",
      description: "Upgrade to business class at special rates."
    }
  ];

  return (
    <section className="offers-section">
      <div className="offers-container">
        <div className="offers-header">
          <div className="header-left">
            <h1>What's new?</h1>
            <div className="highlight-bar"></div>
          </div>
          <p className="header-description">
            Find exclusive offers and the best deals available for you.
          </p>
        </div>
        
        <div className="offers-grid">
          {offers.map((offer, index) => (
            <div className="offer-card" key={index}>
              <div className="offer-content">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  onError={(e) => {
                    console.error(`Failed to load image: ${offer.image}`);
                    e.target.src = '/assets/placeholder.jpg'; // Optional: provide a fallback image
                  }}
                />
                <h3 className="offer-tag">{offer.tag}</h3>
                <h2 className="offer-title">{offer.title}</h2>
                <p className="offer-description">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;