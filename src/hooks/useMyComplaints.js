import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useMyComplaints = (params = {}) => {
  const axios = useAxios();
  
  return useQuery({
    queryKey: ['complaints', params],
    queryFn: async () => {
      const { data } = await axios.get('/complaint/all', { params });
      return data;
    },
  });
};

export default useMyComplaints;