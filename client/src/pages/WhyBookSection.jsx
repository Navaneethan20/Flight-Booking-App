import React from 'react';
import { Shield, Bell, Clock, Settings } from 'lucide-react';
import '../styles/WhyBookSection.css';

const WhyBookSection = () => {
  const features = [
    {
      title: "Instant & Full Refunds",
      description: "with Assured Guarantee",
      icon: Shield,
    },
    {
      title: "Save up to 40%",
      description: "with Intelligent Fare Alerts",
      icon: Bell,
    },
    {
      title: "Track Flight Status",
      description: "Gate & Baggage Updates",
      icon: Clock,
    },
    {
      title: "24x7 Support",
      description: "Customer Service",
      icon: Settings,
    }
  ];

  return (
    <section className="why-book-section">
      <div className="why-book-content">
        <h2>Why Book With iairgo?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="icon-wrapper">
                <feature.icon className="icon" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="copyright">
          <p>2024 Iairgo - © All rights reserved</p>
        </div>
      </div>
    </section>
  );
};

export default WhyBookSection;