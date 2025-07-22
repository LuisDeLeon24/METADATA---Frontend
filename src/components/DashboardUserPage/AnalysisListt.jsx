import { useEffect, useContext, useState } from "react";
import { Box, Text, Stack, Spinner } from "@chakra-ui/react";
import { getAllAnalyses } from "../../services/api.jsx";
import { UserContext } from "../../context/UserContext";

const AnalysisList = () => {
  const { user } = useContext(UserContext);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const data = await getAllAnalyses(user.token);
        const filtered = data.filter(
          (a) => a.evidenciaID?.case?.researcher === user._id
        );
        setAnalyses(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyses();
  }, [user]);

  if (loading) return <Spinner />;

  return (
    <Stack spacing={4}>
      {analyses.map((a) => (
        <Box key={a._id} p={4} borderWidth="1px" borderRadius="md">
          <Text fontWeight="bold">Resultado</Text>
          <Text>{a.resultado}</Text>
          <Text>Metadatos: {a.metadatos}</Text>
        </Box>
      ))}
    </Stack>
  );
};

export default AnalysisList;