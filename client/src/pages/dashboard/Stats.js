import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import StatsContainer from '../../components/StatsContainer/StatsContainer';
import Loading from "../../components/Loading"
import ChartsContainer from "../../components/StatsContainer/ChartContainer"

const Stats = () => {
  const { showStats, isLoading, monthlyApplications,stats } = useAppContext();
  useEffect(() => {
    showStats();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}  
    </>
  );  //display charts onlyif we apply job
};

export default Stats;