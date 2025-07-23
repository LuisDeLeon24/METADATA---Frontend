import React from "react"
import { Box } from "@chakra-ui/react"
import PDFForensicAnalyzer from "../components/pdf-Analysis/DragAndDrop"
import Navbar from "../components/common/Navbar"
import Footer from "../components/LandingPage/Footer"

const AnalysisImgPage = () => {
    return (
        <Box>
            <Navbar/>
            <PDFForensicAnalyzer/>
            <Footer/>
        </Box>

    )
}

export default AnalysisImgPage