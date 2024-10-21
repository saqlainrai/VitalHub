// src/pages/HomePage.js

import FeaturesSection from "../components/landing/FeatureSection";
import PromoSection from "../components/landing/PromoSection";
import React from 'react';
import Dashboard from '../components/Dashboard';

const Home = () => {
    return (
        <div>
            {/* <Dashboard /> */}
            <PromoSection/>
            <FeaturesSection/>
        </div>
    );
};

export default Home;
