import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Text,
  Center,
  Spinner,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdFolder, MdCameraAlt, MdAnalytics } from "react-icons/md";
import CaseList from "../components/DashboardUserPage/CaseList.jsx";
import EvidenceList from "../components/DashboardUserPage/EvidenceList";
import AnalysisList from "../components/DashboardUserPage/AnalysisList";
import {
  getCasesByResearcher,
  getEvidenceByUser,
  getAnalyses,
} from "../services/api.jsx";

const DashboardUserPage = () => {
  const [caseCount, setCaseCount] = useState(null);
  const [evidenceCount, setEvidenceCount] = useState(null);
  const [analysisCount, setAnalysisCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const [cases, evidences, analyses] = await Promise.all([
          getCasesByResearcher(),
          getEvidenceByUser(),
          getAnalyses(),
        ]);

        setCaseCount(cases.success ? cases.data.length : 0);
        setEvidenceCount(evidences.success ? evidences.data.length : 0);
        setAnalysisCount(analyses.success ? analyses.data.length : 0);
      } catch {
        setCaseCount(0);
        setEvidenceCount(0);
        setAnalysisCount(0);
      } finally {
        setLoading(false);
      }
    };

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser?.username || "Investigador");
    }

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <Center minH="100vh" bg="gray.900" color="white">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box minH="100vh" bg="gray.900" color="white" py={10} px={{ base: 4, md: 10 }}>
      <Box maxW="1200px" mx="auto">
        <Heading mb={6} textAlign="center" fontSize="3xl" fontWeight="bold">
          Bienvenido, {username}
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={6} mb={8}>
          <Box
            bg="purple.800"
            color="white"
            p={6}
            borderRadius="md"
            textAlign="center"
            boxShadow="md"
            _hover={{ bg: "purple.700", cursor: "default" }}
            transition="background-color 0.3s ease"
          >
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
              {caseCount}
            </Text>
            <Text fontSize="lg" letterSpacing="wide">
              Casos
            </Text>
          </Box>

          <Box
            bg="purple.800"
            color="white"
            p={6}
            borderRadius="md"
            textAlign="center"
            boxShadow="md"
            _hover={{ bg: "purple.700", cursor: "default" }}
            transition="background-color 0.3s ease"
          >
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
              {evidenceCount}
            </Text>
            <Text fontSize="lg" letterSpacing="wide">
              Evidencias
            </Text>
          </Box>

          <Box
            bg="purple.800"
            color="white"
            p={6}
            borderRadius="md"
            textAlign="center"
            boxShadow="md"
            _hover={{ bg: "purple.700", cursor: "default" }}
            transition="background-color 0.3s ease"
          >
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
              {analysisCount}
            </Text>
            <Text fontSize="lg" letterSpacing="wide">
              Análisis
            </Text>
          </Box>
        </SimpleGrid>

        <Tabs isFitted variant="enclosed" colorScheme="purple">
          <TabList mb="1em" borderRadius="md" bg="gray.800" p={1}>
            <Tab
              _selected={{ bg: "purple.700", color: "white" }}
              fontWeight="semibold"
            >
              <Flex align="center" gap={2} justifyContent="center">
                <Icon as={MdFolder} boxSize={5} />
                Casos
              </Flex>
            </Tab>
            <Tab
              _selected={{ bg: "purple.700", color: "white" }}
              fontWeight="semibold"
            >
              <Flex align="center" gap={2} justifyContent="center">
                <Icon as={MdCameraAlt} boxSize={5} />
                Evidencias
              </Flex>
            </Tab>
            <Tab
              _selected={{ bg: "purple.700", color: "white" }}
              fontWeight="semibold"
            >
              <Flex align="center" gap={2} justifyContent="center">
                <Icon as={MdAnalytics} boxSize={5} />
                Análisis
              </Flex>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CaseList />
            </TabPanel>
            <TabPanel>
              <EvidenceList />
            </TabPanel>
            <TabPanel>
              <AnalysisList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default DashboardUserPage;
