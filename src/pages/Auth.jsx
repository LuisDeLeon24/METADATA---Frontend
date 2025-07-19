import { Box, useColorModeValue } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { AnimatePresence, motion } from 'framer-motion'

const MotionBox = motion(Box)

// Componente de partículas flotantes
const FloatingParticles = () => {
    const particles = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 4 + 1
        const x = Math.random() * 100
        const y = Math.random() * 100
        const duration = Math.random() * 20 + 10
        const delay = Math.random() * 5

        particles.push(
            <motion.div
                key={i}
                initial={{
                    x: `${x}vw`,
                    y: `${y}vh`,
                    opacity: 0
                }}
                animate={{
                    x: `${x + (Math.random() - 0.5) * 20}vw`,
                    y: `${y - 20}vh`,
                    opacity: [0, 0.8, 0]
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: delay,
                    ease: "linear"
                }}
                style={{
                    position: 'absolute',
                    width: `${size}px`,
                    height: `${size}px`,
                    background: 'linear-gradient(45deg, #a855f7, #7c3aed)',
                    borderRadius: '50%',
                    filter: 'blur(1px)',
                    pointerEvents: 'none'
                }}
            />
        )
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
            {particles}
        </Box>
    )
}

// Componente de ondas animadas
const AnimatedWaves = () => {
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
            {/* Onda 1 */}
            <motion.div
                animate={{
                    x: ["-100%", "100%"],
                    rotate: [0, 360]
                }}
                transition={{
                    x: { duration: 20, repeat: Infinity, ease: "linear" },
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" }
                }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: 0,
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1), transparent)',
                    borderRadius: '50%',
                    filter: 'blur(40px)'
                }}
            />

            {/* Onda 2 */}
            <motion.div
                animate={{
                    x: ["100%", "-100%"],
                    y: ["0%", "50%", "0%"],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    x: { duration: 25, repeat: Infinity, ease: "linear" },
                    y: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: 0,
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }}
            />

            {/* Onda 3 */}
            <motion.div
                animate={{
                    rotate: [0, -360],
                    scale: [0.8, 1.3, 0.8]
                }}
                transition={{
                    rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                    scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10%',
                    width: '150px',
                    height: '150px',
                    background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2), transparent)',
                    borderRadius: '50%',
                    filter: 'blur(30px)'
                }}
            />
        </Box>
    )
}

// Componente de malla geométrica mejorada
const GeometricMesh = () => {
    const meshRef = useRef(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const lines = []
    const gridSize = 100
    const cols = Math.ceil(window.innerWidth / gridSize) + 1
    const rows = Math.ceil(window.innerHeight / gridSize) + 1

    // Líneas verticales
    for (let i = 0; i <= cols; i++) {
        lines.push(
            <motion.line
                key={`v-${i}`}
                x1={i * gridSize}
                y1={0}
                x2={i * gridSize}
                y2="100%"
                stroke="rgba(168, 85, 247, 0.1)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                    pathLength: 1,
                    opacity: 0.3,
                    stroke: `rgba(168, 85, 247, ${0.1 + Math.abs(mousePos.x - (i * gridSize / window.innerWidth * 100)) / 1000})`
                }}
                transition={{ duration: 2, delay: i * 0.1 }}
            />
        )
    }

    // Líneas horizontales
    for (let i = 0; i <= rows; i++) {
        lines.push(
            <motion.line
                key={`h-${i}`}
                x1={0}
                y1={i * gridSize}
                x2="100%"
                y2={i * gridSize}
                stroke="rgba(124, 58, 237, 0.1)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                    pathLength: 1,
                    opacity: 0.3,
                    stroke: `rgba(124, 58, 237, ${0.1 + Math.abs(mousePos.y - (i * gridSize / window.innerHeight * 100)) / 1000})`
                }}
                transition={{ duration: 2, delay: i * 0.1 }}
            />
        )
    }

    return (
        <Box
            ref={meshRef}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            pointerEvents="none"
            overflow="hidden"
        >
            <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                {lines}
            </svg>
        </Box>
    )
}

// Componente principal Auth mejorado
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [isTransitioning, setIsTransitioning] = useState(false)

    const handleAuthPageToggle = () => {
        setIsTransitioning(true)
        setTimeout(() => {
            setIsLogin((prev) => !prev)
            setIsTransitioning(false)
        }, 200)
    }

    const containerVariants = {
        login: {
            background: "radial-gradient(ellipse at top, #1a1a2e, #16213e, #0f3460)",
            transition: { duration: 1, ease: "easeInOut" }
        },
        register: {
            background: "radial-gradient(ellipse at bottom, #16213e, #1a1a2e, #533483)",
            transition: { duration: 1, ease: "easeInOut" }
        }
    }

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
            rotateX: -15,
            transition: { duration: 0.4 }
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
            }
        },
        exit: {
            opacity: 0,
            y: -50,
            scale: 0.9,
            rotateX: 15,
            transition: { duration: 0.4 }
        }
    }

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1.5,
                staggerChildren: 0.3
            }
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
            variants={containerVariants}
            p={4}
            position="relative"
            overflow="hidden"
        >
            {/* Capa base con gradiente */}
            <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #533483 75%, #7209b7 100%)"
                opacity={0.9}
            />

            {/* Efectos de fondo animados */}
            <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
            >
                <GeometricMesh />
                <AnimatedWaves />
                <FloatingParticles />
            </motion.div>

            {/* Efectos de luz adicionales */}
            <Box
                position="absolute"
                top="20%"
                right="10%"
                width="400px"
                height="400px"
                borderRadius="50%"
                bg="radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent)"
                filter="blur(80px)"
                animation="pulse 4s ease-in-out infinite"
            />

            <Box
                position="absolute"
                bottom="10%"
                left="15%"
                width="300px"
                height="300px"
                borderRadius="50%"
                bg="radial-gradient(circle, rgba(124, 58, 237, 0.2), transparent)"
                filter="blur(60px)"
                animation="pulse 6s ease-in-out infinite reverse"
            />

            {/* Contenedor del formulario con glassmorphism */}
            <Box
                position="relative"
                zIndex={10}
                width="100%"
                maxW="450px"
                perspective="1000px"
            >
                <AnimatePresence mode="wait">
                    {isLogin ? (
                        <MotionBox
                            key="login"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={cardVariants}
                            width="100%"
                            position="relative"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <Login switchAuthHandler={handleAuthPageToggle} />
                        </MotionBox>
                    ) : (
                        <MotionBox
                            key="register"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={cardVariants}
                            width="100%"
                            position="relative"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <Register switchAuthHandler={handleAuthPageToggle} />
                        </MotionBox>
                    )}
                </AnimatePresence>
            </Box>

            {/* Overlay de transición */}
            {isTransitioning && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 15,
                        backdropFilter: 'blur(10px)'
                    }}
                />
            )}
        </MotionBox>
    )
}

export default Auth