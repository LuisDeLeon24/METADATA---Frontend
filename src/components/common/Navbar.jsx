import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Container,
  Flex,
  Button,
  Text,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
  Collapse,
  Badge
} from '@chakra-ui/react';
import { BrainCog, Menu, X, Sparkles, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '../../context/UserContext';
import { logout } from '../../shared/hooks';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionButton = motion(Button);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const { user, refreshUser } = useContext(UserContext)

  // console.log(user);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    refreshUser();
  }

  return (
    <MotionBox
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      bg={isScrolled
        ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.85))'
        : 'linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))'
      }
      backdropFilter={isScrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(120%)'}
      borderBottom={isScrolled ? '1px solid' : '1px solid transparent'}
      borderColor="rgba(147, 51, 234, 0.2)"
      boxShadow={isScrolled
        ? '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.1)'
        : '0 4px 16px rgba(16, 16, 23, 0.4)'
      }
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.05), transparent)',
        pointerEvents: 'none'
      }}
    >
      <Container maxW="container.xl">
        <Flex py={4} align="center" justify="space-between">
          {/* Logo Mejorado */}
          <MotionFlex
            align="center"
            cursor="pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <MotionBox
              p={3}
              bg="linear-gradient(135deg, #9333ea, #7c3aed, #6366f1)"
              borderRadius="2xl"
              color="white"
              mr={3}
              position="relative"
              whileHover={{
                boxShadow: "0 0 30px rgba(147, 51, 234, 0.6), 0 0 60px rgba(147, 51, 234, 0.3)",
                rotate: [0, -5, 5, 0]
              }}
              transition={{ duration: 0.6 }}
              _before={{
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                background: 'linear-gradient(45deg, #9333ea, #7c3aed, #6366f1, #9333ea)',
                borderRadius: '2xl',
                zIndex: -1,
                opacity: 0.7,
                filter: 'blur(8px)'
              }}
            >
              <BrainCog size={28} />
            </MotionBox>
            <VStack spacing={0} align="start">
              <Link to="/">
                <Text
                  fontSize="2xl"
                  fontWeight="900"
                  bgGradient="linear(to-r, #ffffff, #e5e5e5, #9333ea)"
                  bgClip="text"
                  letterSpacing="tight"
                  lineHeight="1"
                  cursor="pointer"
                >
                  MetaData
                </Text>
              </Link>
              <Text
                fontSize="xs"
                color="purple.300"
                fontWeight="500"
                letterSpacing="wide"
              >
                AI POWERED
              </Text>
            </VStack>
          </MotionFlex>

          {/* Desktop Navigation Mejorado */}
          <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>

            <Link to={'/cases'}>
              <NavButton>Casos</NavButton>
            </Link>
            <Link to={'/user/Dashboard'}>
              <NavButton>Ver evidencias</NavButton>
            </Link>

            {!user?.role ? (
              <Link to='/Login'>
                <MotionButton
                  size="lg"
                  px={8}
                  py={6}
                  fontSize="md"
                  fontWeight="bold"
                  borderRadius="2xl"
                  bg="linear-gradient(135deg, #9333ea, #7c3aed)"
                  color="white"
                  border="2px solid transparent"
                  backgroundClip="padding-box"
                  position="relative"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 40px rgba(147, 51, 234, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  _hover={{
                    bg: "linear-gradient(135deg, #7c3aed, #6366f1)",
                    _before: {
                      opacity: 1
                    }
                  }}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    right: '-2px',
                    bottom: '-2px',
                    background: 'linear-gradient(45deg, #9333ea, #7c3aed, #6366f1, #9333ea)',
                    borderRadius: '2xl',
                    zIndex: -1,
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <HStack spacing={2}>
                    <Text>Login</Text>
                    <Box
                      as={motion.div}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={16} />
                    </Box>
                  </HStack>
                </MotionButton>
              </Link>
            ) : (
              <MotionButton
                size="lg"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="bold"
                borderRadius="2xl"
                bg="linear-gradient(135deg, #9333ea, #7c3aed)"
                color="white"
                border="2px solid transparent"
                backgroundClip="padding-box"
                position="relative"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 40px rgba(147, 51, 234, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                _hover={{
                  bg: "linear-gradient(135deg, #7c3aed, #6366f1)",
                  _before: {
                    opacity: 1
                  }
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  bottom: '-2px',
                  background: 'linear-gradient(45deg, #9333ea, #7c3aed, #6366f1, #9333ea)',
                  borderRadius: '2xl',
                  zIndex: -1,
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                onClick={() => handleLogout()}
              >
                <HStack spacing={2}>
                  <Text>Logout</Text>
                  <Box
                    as={motion.div}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles size={16} />
                  </Box>
                </HStack>
              </MotionButton>
            )}

            <Badge
              bg="rgba(147, 51, 234, 0.2)"
              color="purple.200"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="bold"
              border="1px solid"
              borderColor="purple.500/30"
            >
              NEW
            </Badge>
          </HStack>

          {/* Mobile Menu Button Mejorado */}
          <MotionBox
            display={{ base: 'flex', md: 'none' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton
              aria-label="Toggle menu"
              variant="ghost"
              color="white"
              icon={isOpen ? <X size={24} /> : <Menu size={24} />}
              onClick={onToggle}
              bg="rgba(147, 51, 234, 0.2)"
              _hover={{
                bg: 'rgba(147, 51, 234, 0.3)',
                boxShadow: "0 4px 16px rgba(147, 51, 234, 0.3)"
              }}
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(147, 51, 234, 0.3)"
            />
          </MotionBox>
        </Flex>

        {/* Mobile Menu Mejorado */}
        <AnimatePresence>
          {isOpen && (
            <MotionBox
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              overflow="hidden"
            >
              <VStack
                display={{ base: 'flex', md: 'none' }}
                pb={6}
                pt={4}
                spacing={3}
                align="stretch"
                bg="linear-gradient(135deg, rgba(16, 16, 23, 0.95), rgba(44, 23, 82, 0.9))"
                borderRadius="2xl"
                mt={2}
                border="1px solid"
                borderColor="rgba(147, 51, 234, 0.2)"
                backdropFilter="blur(20px)"
              >
                <MobileNavButton icon={<Sparkles size={18} />}>Features</MobileNavButton>
                <MobileNavButton icon={<Zap size={18} />}>How It Works</MobileNavButton>
                <MobileNavButton icon={<Shield size={18} />}>Pricing</MobileNavButton>
                <MobileNavButton>About</MobileNavButton>

                <MotionButton
                  bg="linear-gradient(135deg, #9333ea, #7c3aed)"
                  color="white"
                  size="lg"
                  borderRadius="xl"
                  fontWeight="bold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  _hover={{
                    bg: "linear-gradient(135deg, #7c3aed, #6366f1)"
                  }}
                >
                  Try Now
                </MotionButton>
              </VStack>
            </MotionBox>
          )}
        </AnimatePresence>
      </Container>
    </MotionBox>
  );
};

const NavButton = ({ children, icon }) => (
  <MotionButton
    variant="ghost"
    color="rgba(255, 255, 255, 0.8)"
    position="relative"
    px={4}
    py={2}
    borderRadius="xl"
    fontWeight="600"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    _hover={{
      color: 'white',
      bg: 'rgba(147, 51, 234, 0.2)',
      boxShadow: "0 4px 16px rgba(147, 51, 234, 0.2)",
      _after: {
        transform: 'scaleX(1)',
        opacity: 1
      }
    }}
    _after={{
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      width: '80%',
      height: '2px',
      bgGradient: 'linear(to-r, #9333ea, #7c3aed)',
      transform: 'translateX(-50%) scaleX(0)',
      opacity: 0,
      transition: 'all 0.3s ease',
      borderRadius: 'full'
    }}
  >
    <HStack spacing={2}>
      {icon && <Box color="purple.300">{icon}</Box>}
      <Text>{children}</Text>
    </HStack>
  </MotionButton>
);

const MobileNavButton = ({ children, icon }) => (
  <MotionButton
    variant="ghost"
    color="rgba(255, 255, 255, 0.8)"
    w="full"
    justifyContent="flex-start"
    fontSize="lg"
    py={4}
    px={6}
    borderRadius="xl"
    whileHover={{ x: 8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    _hover={{
      bg: 'rgba(147, 51, 234, 0.3)',
      color: 'white',
      boxShadow: "inset 4px 0 0 #9333ea"
    }}
  >
    <HStack spacing={3}>
      {icon && <Box color="purple.300">{icon}</Box>}
      <Text>{children}</Text>
    </HStack>
  </MotionButton>
);

export default Navbar;