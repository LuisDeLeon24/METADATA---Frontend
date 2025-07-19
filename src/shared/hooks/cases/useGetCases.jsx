import { useEffect, useState } from "react";
import { getCases } from '../../../services/api';

export const useGetCases = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await getCases();
                const casesData = Array.isArray(response.data) ? response.data : [];

                const sortedCases = casesData
                    .sort((a, b) => new Date(b.initDate) - new Date(a.initDate))
                    .slice(0, 3);

                setCases(sortedCases);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCases();
    }, []);

    return { cases, loading, error };
};
