import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from '../components/common/Navbar';
import AnalysisList from '../components/DashboardUserPage/AnalysisList';
import Footer from '../components/LandingPage/Footer';

const DashboardUserPage = () => {
    return (
        <Box>
            <Navbar />
            <AnalysisList />
            <Footer />
        </Box>
    )
}

export default DashboardUserPage