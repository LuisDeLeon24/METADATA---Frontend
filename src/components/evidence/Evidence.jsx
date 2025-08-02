import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Spinner,
    Badge,
    Image,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    VStack,
    HStack,
    Divider,
    Link,
    Icon,
    Card,
    Circle
} from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import { ExternalLinkIcon, ViewIcon } from "@chakra-ui/icons";
import { FiDatabase } from 'react-icons/fi';
import { useEvidence } from "../../shared/hooks/useEvidence";
import Navbar from "../common/Navbar";

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(5px) rotate(-1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const EvidencesPage = () => {
    const { evidences, getEvidences, isFetching } = useEvidence();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedEvidence, setSelectedEvidence] = useState(null);

    useEffect(() => {
        getEvidences();
    }, []);

    const handleViewDetails = (evidence) => {
        setSelectedEvidence(evidence);
        onOpen();
    };

    const getTypeColor = (type) => {
        const colors = {
            IMAGE: "purple",
            DECLARATION: "blue",
            INTERROGATORY: "green",
            DOCUMENT: "orange"
        };
        return colors[type] || "gray";
    };

    const getTypeLabel = (type) => {
        const labels = {
            IMAGE: "Imagen",
            DECLARATION: "Declaraci贸n",
            INTERROGATORY: "Interrogatorio",
            DOCUMENT: "Documento"
        };
        return labels[type] || type;
    };

    const isImageFile = (url) => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
        return imageExtensions.some(ext => url.toLowerCase().includes(ext));
    };

    // Funci贸n para obtener el texto del caso (puede ser ObjectId o string)
    const getCaseDisplay = (caseData) => {
        if (typeof caseData === 'string') {
            return caseData;
        } else if (caseData && typeof caseData === 'object') {
            return caseData.title || caseData.name || caseData._id || 'Caso sin t铆tulo';
        }
        return caseData || 'Caso no especificado';
    };

    // Funci贸n para obtener el texto del usuario (puede ser ObjectId o string)
    const getUserDisplay = (userData) => {
        if (typeof userData === 'string') {
            return userData;
        } else if (userData && typeof userData === 'object') {
            return userData.name || userData.username || userData.email || userData._id || 'Usuario sin nombre';
        }
        return 'Usuario no especificado';
    };

    return (
        <>
            <Navbar />
            <Box
                minH="100vh"
                py={8}
                bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f23 100%)"
                position="relative"
                overflow="hidden"
            >
                {/* Elementos de fondo animados */}
                <Box
                    position="absolute"
                    top="10%"
                    left="5%"
                    w="300px"
                    h="300px"
                    borderRadius="full"
                    bg="linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1))"
                    filter="blur(40px)"
                    animation={`${float} 6s ease-in-out infinite`}
                />
                <Box
                    position="absolute"
                    bottom="10%"
                    right="5%"
                    w="200px"
                    h="200px"
                    borderRadius="full"
                    bg="linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
                    filter="blur(30px)"
                    animation={`${float} 8s ease-in-out infinite reverse`}
                />

                <Container maxW="7xl" position="relative" zIndex={1}>
                    <VStack spacing={8} align="stretch">
                        {/* Header */}
                        <VStack spacing={6} textAlign="center">
                            <Circle
                                mt="100"
                                size="80px"
                                bg="linear-gradient(135deg, #8B5CF6, #A855F7, #3B82F6)"
                                animation={`${pulse} 2s infinite`}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Icon as={FiDatabase} w={10} h={10} color="white" />
                            </Circle>

                            <Heading
                                fontSize={{ base: '3xl', md: '4xl' }}
                                fontWeight="900"
                                background="linear-gradient(135deg, #8B5CF6 0%, #EC4899 25%, #3B82F6 50%, #8B5CF6 75%, #EC4899 100%)"
                                backgroundSize="400% 400%"
                                animation={`${shimmer} 3s ease-in-out infinite`}
                                bgClip="text"
                                color="transparent"
                            >
                                Lista de Evidencias
                            </Heading>

                            <Text
                                fontSize="lg"
                                color="whiteAlpha.800"
                                fontWeight="500"
                                maxW="2xl"
                            >
                                Gestión centralizada de evidencias digitales con análisis de IA avanzada
                            </Text>
                        </VStack>

                        {/* Contenido de evidencias */}
                        {isFetching ? (
                            <Card
                                bg="rgba(255, 255, 255, 0.05)"
                                backdropFilter="blur(20px)"
                                border="1px solid"
                                borderColor="rgba(139, 92, 246, 0.3)"
                                borderRadius="2xl"
                            >
                                <VStack spacing={4} py={10}>
                                    <Spinner
                                        size="xl"
                                        color="purple.400"
                                        thickness="4px"
                                    />
                                    <Text color="whiteAlpha.700" fontSize="lg">
                                        Cargando evidencias...
                                    </Text>
                                </VStack>
                            </Card>
                        ) : !evidences || evidences.length === 0 ? (
                            <Card
                                bg="rgba(255, 255, 255, 0.05)"
                                backdropFilter="blur(20px)"
                                border="1px solid"
                                borderColor="rgba(139, 92, 246, 0.3)"
                                borderRadius="2xl"
                            >
                                <VStack spacing={4} py={10}>
                                    <Text fontSize="lg" color="whiteAlpha.700">
                                        No hay evidencias registradas.
                                    </Text>
                                </VStack>
                            </Card>
                        ) : (
                            <Card
                                bg="rgba(255, 255, 255, 0.05)"
                                backdropFilter="blur(20px)"
                                border="1px solid"
                                borderColor="rgba(139, 92, 246, 0.3)"
                                borderRadius="2xl"
                                overflow="hidden"
                                position="relative"
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: 'linear-gradient(90deg, #8B5CF6, #EC4899, #3B82F6)',
                                    backgroundSize: '200% 200%',
                                    animation: `${shimmer} 2s linear infinite`,
                                }}
                            >
                                <TableContainer>
                                    <Table variant="simple">
                                        <Thead bg="rgba(139, 92, 246, 0.1)">
                                            <Tr>
                                                <Th color="purple.300" fontWeight="700">Tipo</Th>
                                                <Th color="purple.300" fontWeight="700">Descripci贸n</Th>
                                                <Th color="purple.300" fontWeight="700">Vista Previa</Th>
                                                <Th color="purple.300" fontWeight="700">Fecha</Th>
                                                <Th color="purple.300" fontWeight="700">Caso</Th>
                                                <Th color="purple.300" fontWeight="700">Acciones</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {evidences.map((evidence) => (
                                                <Tr
                                                    key={evidence._id}
                                                    _hover={{
                                                        bg: "rgba(139, 92, 246, 0.1)",
                                                        transform: "scale(1.01)"
                                                    }}
                                                    transition="all 0.2s"
                                                >
                                                    <Td>
                                                        <Badge
                                                            colorScheme={getTypeColor(evidence.type)}
                                                            variant="subtle"
                                                            px={3}
                                                            py={1}
                                                            borderRadius="full"
                                                        >
                                                            {getTypeLabel(evidence.type)}
                                                        </Badge>
                                                    </Td>
                                                    <Td maxW="200px">
                                                        <Text noOfLines={2} fontSize="sm" color="whiteAlpha.900">
                                                            {evidence.description}
                                                        </Text>
                                                    </Td>
                                                    <Td>
                                                        {evidence.type === 'IMAGE' && isImageFile(evidence.archive) ? (
                                                            <Image
                                                                src={evidence.archive}
                                                                alt="Evidence preview"
                                                                boxSize="60px"
                                                                objectFit="cover"
                                                                borderRadius="md"
                                                                border="2px solid"
                                                                borderColor="purple.400"
                                                                cursor="pointer"
                                                                onClick={() => handleViewDetails(evidence)}
                                                                _hover={{
                                                                    transform: "scale(1.1)",
                                                                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)"
                                                                }}
                                                                transition="all 0.3s"
                                                            />
                                                        ) : (
                                                            <Link
                                                                href={evidence.archive}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                color="purple.300"
                                                                _hover={{ color: "purple.200" }}
                                                            >
                                                                <HStack spacing={1}>
                                                                    <Text fontSize="sm">Ver archivo</Text>
                                                                    <Icon as={ExternalLinkIcon} boxSize={3} />
                                                                </HStack>
                                                            </Link>
                                                        )}
                                                    </Td>
                                                    <Td>
                                                        <Text fontSize="sm" color="whiteAlpha.800">
                                                            {new Date(evidence.collectionDate).toLocaleDateString('es-ES')}
                                                        </Text>
                                                    </Td>
                                                    <Td>
                                                        <Text fontSize="sm" fontWeight="600" color="purple.300">
                                                            {getCaseDisplay(evidence.case)}
                                                        </Text>
                                                    </Td>
                                                    <Td>
                                                        <Button
                                                            size="sm"
                                                            bg="linear-gradient(135deg, #8B5CF6, #A855F7)"
                                                            color="white"
                                                            leftIcon={<ViewIcon />}
                                                            onClick={() => handleViewDetails(evidence)}
                                                            _hover={{
                                                                transform: "translateY(-2px) scale(1.05)",
                                                                boxShadow: "0 10px 25px rgba(139, 92, 246, 0.4)"
                                                            }}
                                                            transition="all 0.3s"
                                                            border="1px solid"
                                                            borderColor="purple.400"
                                                        >
                                                            Ver detalles
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        )}
                    </VStack>

                    {/* Modal para ver detalles */}
                    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
                        <ModalContent
                            bg="rgba(26, 26, 46, 0.95)"
                            backdropFilter="blur(20px)"
                            border="1px solid"
                            borderColor="rgba(139, 92, 246, 0.3)"
                            boxShadow="0 25px 50px rgba(0, 0, 0, 0.5)"
                        >
                            <ModalHeader
                                bg="linear-gradient(135deg, #8B5CF6, #A855F7)"
                                color="white"
                                borderTopRadius="md"
                            >
                                <HStack spacing={3}>
                                    <Text fontWeight="700">Detalles de Evidencia</Text>
                                    {selectedEvidence && (
                                        <Badge
                                            colorScheme={getTypeColor(selectedEvidence.type)}
                                            variant="solid"
                                        >
                                            {getTypeLabel(selectedEvidence.type)}
                                        </Badge>
                                    )}
                                </HStack>
                            </ModalHeader>
                            <ModalCloseButton color="white" />

                            <ModalBody py={6}>
                                {selectedEvidence && (
                                    <VStack spacing={6} align="stretch">
                                        {/* Vista previa de imagen */}
                                        {selectedEvidence.type === 'IMAGE' && isImageFile(selectedEvidence.archive) && (
                                            <Box textAlign="center">
                                                <Image
                                                    src={selectedEvidence.archive}
                                                    alt="Evidence"
                                                    maxH="300px"
                                                    maxW="100%"
                                                    objectFit="contain"
                                                    borderRadius="lg"
                                                    border="2px solid"
                                                    borderColor="purple.400"
                                                    mx="auto"
                                                />
                                            </Box>
                                        )}

                                        <Divider borderColor="whiteAlpha.300" />

                                        {/* Informaci贸n detallada */}
                                        <VStack spacing={4} align="stretch">
                                            <Box>
                                                <Text fontWeight="bold" color="purple.300" mb={2} fontSize="lg">
                                                    Descripción:
                                                </Text>
                                                <Box bg="rgba(139, 92, 246, 0.1)" p={4} borderRadius="md" border="1px solid" borderColor="rgba(139, 92, 246, 0.3)">
                                                    <Text fontSize="sm" color="whiteAlpha.900" lineHeight="1.6">
                                                        {selectedEvidence.description}
                                                    </Text>
                                                </Box>
                                            </Box>

                                            <Box>
                                                <Text fontWeight="bold" color="purple.300" mb={2} fontSize="lg">
                                                    Análisis Preliminar:
                                                </Text>
                                                <Box bg="rgba(139, 92, 246, 0.1)" p={4} borderRadius="md" border="1px solid" borderColor="rgba(139, 92, 246, 0.3)">
                                                    <Text fontSize="sm" color="whiteAlpha.900" lineHeight="1.6">
                                                        {selectedEvidence.preliminaryAnalysis || 'No hay análisis disponible'}
                                                    </Text>
                                                </Box>
                                            </Box>

                                            <HStack spacing={4}>
                                                <Box flex={1}>
                                                    <Text fontWeight="bold" color="purple.300" mb={2}>
                                                        Fecha de Recolección:
                                                    </Text>
                                                    <Text fontSize="sm" color="whiteAlpha.800">
                                                        {new Date(selectedEvidence.collectionDate).toLocaleDateString('es-ES', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </Text>
                                                </Box>
                                            </HStack>

                                            <HStack spacing={4}>
                                                <Box flex={1}>
                                                    <Text fontWeight="bold" color="purple.300" mb={2}>
                                                        Caso:
                                                    </Text>
                                                    <Text fontSize="sm" fontWeight="600" color="whiteAlpha.900">
                                                        {getCaseDisplay(selectedEvidence.case)}
                                                    </Text>
                                                </Box>
                                                <Box flex={1}>
                                                    <Text fontWeight="bold" color="purple.300" mb={2}>
                                                        Subido por:
                                                    </Text>
                                                    <Text fontSize="sm" color="whiteAlpha.800">
                                                        {getUserDisplay(selectedEvidence.uploadedBy)}
                                                    </Text>
                                                </Box>
                                            </HStack>
                                        </VStack>
                                    </VStack>
                                )}
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    bg="linear-gradient(135deg, #8B5CF6, #A855F7)"
                                    color="white"
                                    onClick={onClose}
                                    _hover={{
                                        transform: "translateY(-1px)",
                                        boxShadow: "0 10px 25px rgba(139, 92, 246, 0.4)"
                                    }}
                                >
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Container>
            </Box>
        </>
    );
};

export default EvidencesPage