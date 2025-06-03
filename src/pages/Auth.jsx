import { Box, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { AnimatePresence, motion } from 'framer-motion'
 
const MotionBox = motion.create(Box)
 
const GeometricBackground = ({ isDark }) => {
    const triangles = []
    const triangleSize = 60
    const rowHeight = triangleSize * Math.sqrt(3) / 2
    
    // Calcular cuántos triángulos necesitamos para cubrir la pantalla
    const cols = Math.ceil(window.innerWidth / triangleSize) + 2
    const rows = Math.ceil(window.innerHeight / rowHeight) + 2
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const isEvenRow = row % 2 === 0
            const x = col * triangleSize + (isEvenRow ? 0 : triangleSize / 2)
            const y = row * rowHeight
            
            // Crear dos triángulos por celda para formar hexágonos
            const shades = isDark 
                ? ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)']
                : ['rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0.08)']
            
            const randomShade = shades[Math.floor(Math.random() * shades.length)]
            const randomShade2 = shades[Math.floor(Math.random() * shades.length)]
            
            // Triángulo apuntando hacia arriba
            triangles.push(
                <div
                    key={`${row}-${col}-up`}
                    style={{
                        position: 'absolute',
                        left: `${x}px`,
                        top: `${y}px`,
                        width: 0,
                        height: 0,
                        borderLeft: `${triangleSize/2}px solid transparent`,
                        borderRight: `${triangleSize/2}px solid transparent`,
                        borderBottom: `${triangleSize * Math.sqrt(3)/2}px solid ${randomShade}`,
                        transition: 'border-bottom-color 0.3s ease'
                    }}
                />
            )
            
            // Triángulo apuntando hacia abajo
            triangles.push(
                <div
                    key={`${row}-${col}-down`}
                    style={{
                        position: 'absolute',
                        left: `${x}px`,
                        top: `${y}px`,
                        width: 0,
                        height: 0,
                        borderLeft: `${triangleSize/2}px solid transparent`,
                        borderRight: `${triangleSize/2}px solid transparent`,
                        borderTop: `${triangleSize * Math.sqrt(3)/2}px solid ${randomShade2}`,
                        transform: 'translateY(100%)',
                        transition: 'border-top-color 0.3s ease'
                    }}
                />
            )
        }
    }
    
    return (
        <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            overflow="hidden"
            pointerEvents="none"
        >
            {triangles}
        </Box>
    )
}
 
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
    const isDark = useColorModeValue(false, true)
 
    const handleAuthPageToggle = () => {
        setIsLogin((prev) => !prev)
    }
 
    const variants = {
        hidden: { opacity: 0, y: 30, transition: { duration: 0.4 } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }
    }
 
    const backgroundVariants = {
        login: {
            background: isDark 
                ? "linear-gradient(135deg, rgb(26, 32, 44), rgb(45, 55, 72))"
                : "linear-gradient(135deg, rgb(56, 73, 184), rgb(0, 0, 0))",
            transition: { duration: 0.6 }
        },
        register: {
            background: isDark 
                ? "linear-gradient(135deg, rgb(45, 55, 72), rgb(26, 32, 44))"
                : "linear-gradient(135deg, rgb(0, 0, 0), rgb(56, 73, 184))",
            transition: { duration: 0.6 }
        }
    }
 
    return (
        <MotionBox
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            initial={false}
            animate={isLogin ? "login" : "register"}
            variants={backgroundVariants}
            p={4}
            position="relative"
        >
            <GeometricBackground isDark={isDark} />
            
            <AnimatePresence mode="wait">
                {isLogin ? (
                    <MotionBox
                        key="login"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        width="100%"
                        maxW="400px"
                        position="relative"
                        zIndex={1}
                    >
                        <Login switchAuthHandler={handleAuthPageToggle} />
                    </MotionBox>
                ) : (
                    <MotionBox
                        key="register"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        width="100%"
                        maxW="400px"
                        position="relative"
                        zIndex={1}
                    >
                        <Register switchAuthHandler={handleAuthPageToggle} />
                    </MotionBox>
                )}
            </AnimatePresence>
        </MotionBox>
    )
}
 
export default Auth
 