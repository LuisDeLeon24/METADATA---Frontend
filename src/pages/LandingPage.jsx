// src/pages/LandingPage.jsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import Hero from '../components/LandingPage/Hero';
import Features from '../components/LandingPage/Features';
import HowItWorks from '../components/LandingPage/HowItWorks';
import CTASection from '../components/LandingPage/CTASection';
import Footer from '../components/LandingPage/Footer';
import NavBar from '../components/common/NavBar';

const LandingPage = () => {
    return (
        <Box>
            <NavBar/>
            <Hero />
            <HowItWorks />
            <Features />
            <CTASection />
            <Footer />
        </Box>
    );
};

export default LandingPage;
