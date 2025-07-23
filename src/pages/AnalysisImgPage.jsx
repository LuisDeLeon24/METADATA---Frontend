import React from "react"
import { Box } from "@chakra-ui/react"
import DragAndDrop from "../components/Image-Analysis/DragAndDrop"
import Navbar from "../components/common/Navbar"
import Footer from "../components/LandingPage/Footer"

const AnalysisImgPage = () => {
    return (
        <Box>
            <Navbar/>
            <DragAndDrop/>
            <Footer/>
        </Box>

    )
}

export default AnalysisImgPage