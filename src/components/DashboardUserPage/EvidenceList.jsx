import { useEffect, useState, useContext } from "react";
import { Box, Text, Stack, Spinner, Flex } from "@chakra-ui/react";
import { getEvidenceByUser } from "../../services/api";
import { UserContext } from "../../context/UserContext";

const EvidenceList = () => {
  const { user } = useContext(UserContext);
  const [evidences, setEvidences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    const fetchEvidences = async () => {
      try {
        const response = await getEvidenceByUser(user._id);
        console.log("Respuesta getEvidenceByUser:", response);

        if (response.success) {
          setEvidences(response.data);
        } else {
          setEvidences([]);
        }
      } catch (error) {
        setEvidences([]);
      } finally {
        setLoading(false);
        setAnimateKey(prev => prev + 1);
      }
    };

    if (user?._id) fetchEvidences();
  }, [user]);

  if (loading)
    return (
      <Flex justify="center" align="center" minH="200px" bg="gray.900" color="white">
        <Spinner size="xl" />
        <Text ml={4}>Cargando evidencias...</Text>
      </Flex>
    );

  if (evidences.length === 0)
    return (
      <Box p={4} bg="gray.900" color="gray.400" borderRadius="md" textAlign="center">
        No hay evidencias disponibles
      </Box>
    );

  return (
    <Stack spacing={6}>
      {evidences.map((e, index) => (
        <Box
          key={`${e._id}-${animateKey}`}
          bg="purple.800"
          color="white"
          p={6}
          borderRadius="md"
          boxShadow="md"
          className="fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
          _hover={{
            bg: "purple.700",
            boxShadow: "lg",
            transform: "scale(1.02)",
            transition: "all 0.15s ease-in-out",
            cursor: "pointer",
          }}
        >
          <Text fontWeight="extrabold" fontSize="xl" mb={2}>
            {e.title}
          </Text>
          <Text fontSize="md">{e.description}</Text>
        </Box>
      ))}

      <style>
        {`
          .fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.3s ease-out forwards;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Stack>
  );
};

export default EvidenceList;