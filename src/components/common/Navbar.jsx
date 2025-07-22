import React, { useState, useEffect, useContext } from 'react';
import {
  Box, Container, Flex, Button, Text, HStack,
  IconButton, useDisclosure, VStack, Collapse
} from '@chakra-ui/react';
import { BrainCog, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoToLogs = () => {
    navigate('/logs');
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      bg={isScrolled ? 'rgba(18, 22, 33, 0.95)' : 'transparent'}
      backdropFilter={isScrolled ? 'blur(12px)' : 'none'}
      borderBottom={isScrolled ? '1px solid' : 'none'}
      borderColor="dark.700"
      transition="all 0.3s ease"
      boxShadow={isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'}
    >
      <Container maxW="container.xl">
        <Flex py={4} align="center" justify="space-between">
          {/* Logo */}
          <Flex 
            align="center" 
            cursor="pointer"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
          >
            <Box 
              p={2} 
              bg="brand.500" 
              borderRadius="xl" 
              color="white" 
              mr={3}
              boxShadow="0 0 20px rgba(38, 131, 244, 0.3)"
            >
              <BrainCog size={24} />
            </Box>
            <Text 
              fontSize="xl" 
              fontWeight="bold" 
              bgGradient="linear(to-r, brand.400, accent.400)" 
              bgClip="text"
              letterSpacing="tight"
            >
              MetaData
            </Text>
          </Flex>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <NavButton>Features</NavButton>
            <NavButton>How It Works</NavButton>
            <NavButton>Pricing</NavButton>
            <NavButton onClick={handleGoToLogs}>About</NavButton>
            <Button
              variant="primary"
              size="lg"
              px={8}
              py={6}
              fontSize="md"
              fontWeight="bold"
              borderRadius="xl"
              bgGradient="linear(to-r, brand.500, accent.500)"
              _hover={{
                bgGradient: "linear(to-r, brand.600, accent.600)",
                transform: "translateY(-2px)",
                boxShadow: "xl"
              }}
              transition="all 0.3s ease"
            >
              Try Now
            </Button>
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            aria-label="Toggle menu"
            variant="ghost"
            color="white"
            icon={isOpen ? <X size={24} /> : <Menu size={24} />}
            onClick={onToggle}
            _hover={{ bg: 'whiteAlpha.200' }}
          />
        </Flex>

        {/* Mobile Menu */}
        <Collapse in={isOpen} animateOpacity>
          <VStack
            display={{ base: 'flex', md: 'none' }}
            pb={4}
            spacing={4}
            align="stretch"
          >
            <MobileNavButton>Features</MobileNavButton>
            <MobileNavButton>How It Works</MobileNavButton>
            <MobileNavButton>Pricing</MobileNavButton>
            <MobileNavButton onClick={handleGoToLogs}>About</MobileNavButton>
            <Button
              variant="primary"
              size="lg"
              bgGradient="linear(to-r, brand.500, accent.500)"
              _hover={{
                bgGradient: "linear(to-r, brand.600, accent.600)"
              }}
              fontWeight="bold"
            >
              Try Now
            </Button>
          </VStack>
        </Collapse>
      </Container>
    </Box>
  );
};

const NavButton = ({ children, onClick }) => (
  <Button
    onClick={onClick}
    variant="ghost"
    color="gray.300"
    position="relative"
    _hover={{
      color: 'white',
      _after: {
        transform: 'scaleX(1)',
        transformOrigin: 'left',
      }
    }}
    _after={{
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '2px',
      bgGradient: 'linear(to-r, brand.400, accent.400)',
      transform: 'scaleX(0)',
      transformOrigin: 'right',
      transition: 'transform 0.3s ease'
    }}
  >
    {children}
  </Button>
);

const MobileNavButton = ({ children, onClick }) => (
  <Button
    onClick={onClick}
    variant="ghost"
    color="gray.300"
    w="full"
    justifyContent="flex-start"
    fontSize="lg"
    py={6}
    _hover={{
      bg: 'whiteAlpha.100',
      color: 'white'
    }}
  >
    {children}
  </Button>
);

export default Navbar;