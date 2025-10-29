import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import React, { useEffect,useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Profile from '../components/Profile';
import '../css/dashboard.css';
import TemperatureInsightsDashboard from '../components/TemperatureInsightsDashboard';
import PrecipitationDashboard from '../components/PrecipitationDashboard';
import AtmosphericConditions from '../components/AtmosphericConditions';
import SolarAirMetrics from '../components/SolarAirMetrics';
import DataQualitySensorHealth from '../components/SatelliteSensor';
import StationRegional from '../components/StationRegional';
import Aggregated from '../components/Aggregated';
import Correlation from '../components/Correlation';
import { FaUser, FaSignOutAlt, FaThermometerHalf, FaCloudRain, FaWind, FaSun, FaSatellite, FaMapMarkedAlt, FaChartPie, FaProjectDiagram, FaBars, FaTimes } from 'react-icons/fa';
import AlertList from '../components/AlertList';

function AnalystDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('temperature');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  const navigate = useNavigate();
  
   
     useEffect(() => {
       const token = localStorage.getItem('token');
       if (!token) {
         navigate('/');
         return;
       }
   
       try {
         const decoded = jwtDecode(token);
         setUser(decoded);
       } catch (err) {
         localStorage.removeItem('token');
         navigate('/');
       }
     }, [navigate]);
   
     const handleLogout = () => {
       localStorage.removeItem('token');
       navigate('/');
     };
   
     if (!user) return null;


  const tabComponents = {
    profile: <Profile />,
    temperature: <TemperatureInsightsDashboard/>,
    rainfall: <PrecipitationDashboard />,
    atmosphere: <AtmosphericConditions/>,
    solarair: <SolarAirMetrics/>,
    satellite: <DataQualitySensorHealth/>,
    map: <StationRegional/>,
    aggregate: <Aggregated/>,
    correlation: <Correlation/>,
    alerts: <AlertList/>,
  };

  return (
    <div className="dashboard">
       <button
        className="hamburger"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        {isDrawerOpen ? <FaTimes className='ham-icon' /> : <FaBars className='ham-icon'  />}
      </button>
      <div className={`sidebar ${isDrawerOpen ? 'open' : ''}`}>
        <div className="d-navbar-logo"  onClick={() => navigate('/home')}   style={{ cursor: 'pointer' }}>EarthScape</div>
        <nav onClick={() => setIsDrawerOpen(false)}>
          
          <button  className={`nav-link ${activeTab === 'temperature' ? 'active' : ''}`} onClick={() => setActiveTab('temperature')}><FaThermometerHalf className='nav-icon'/> Temperature Insights</button>
          <button className={`nav-link ${activeTab === 'rainfall' ? 'active' : ''}`} onClick={() => setActiveTab('rainfall')}><FaCloudRain className='nav-icon'/> Rainfall Stats</button>
          <button className={`nav-link ${activeTab === 'atmosphere' ? 'active' : ''}`} onClick={() => setActiveTab('atmosphere')}><FaWind className='nav-icon'/> Atmosphere Stats</button>
          <button className={`nav-link ${activeTab === 'solarair' ? 'active' : ''}`} onClick={() => setActiveTab('solarair')}><FaProjectDiagram className='nav-icon' /> Solar & Air</button>
          <button className={`nav-link ${activeTab === 'satellite' ? 'active' : ''}`} onClick={() => setActiveTab('satellite')}><FaSatellite className='nav-icon' /> Satellite Trends</button>
          <button className={`nav-link ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}><FaMapMarkedAlt className='nav-icon' /> Station Map</button>
          <button className={`nav-link ${activeTab === 'aggregate' ? 'active' : ''}`} onClick={() => setActiveTab('aggregate')}><FaChartPie className='nav-icon'/> Aggregated KPIs</button>
          <button className={`nav-link ${activeTab === 'correlation' ? 'active' : ''}`} onClick={() => setActiveTab('correlation')}><FaSun className='nav-icon'/> Correlation</button>
          <button className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}><FaUser className='nav-icon'/>Profile</button>
          <button className={`nav-link ${activeTab === 'alerts' ? 'active' : ''}`} onClick={() => setActiveTab('alerts')}><FaUser className='nav-icon'/>Alerts</button>
          <hr className="sidebar-divider" />
          <button className="nav-link" onClick={handleLogout}><FaSignOutAlt className='nav-icon'/>Logout</button>
        </nav>
      </div>
      <div className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {tabComponents[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AnalystDashboard;