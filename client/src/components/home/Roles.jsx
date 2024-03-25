import React, { useState } from 'react';
// import { MdGroups } from 'react-icons/md';
// import { GiMedicines } from 'react-icons/gi';
// import { CgTrack } from 'react-icons/cg';
// import { GrDocumentUpdate } from 'react-icons/gr';
// import bgImage from '../../images/bg_image.jpg'
import { useNavigate } from 'react-router-dom';
import checkpointsnew from '../../images/checkpointsnew.jpg'


const Home = () => {
        const navigate=useNavigate();

        const handleTracking = () => {
                navigate('/track');
         };
        const handleGovernmentClick = () => {
                      navigate('/register');
        };
        const handleRmsClick = () => {
                      navigate('/rms');
        };
        const handleManufacturersClick = () => {
                      navigate('/medicineManufacture');
        };
        const handleDistributorsClick = () => {
                      navigate('/distribute');
        };
        const handleRetailersClick = () => {
                      navigate('/retailers');
        };

        const [medicineID, setMedicineID] = useState('');

        const handleMedicineID =(e) =>{
                setMedicineID(e.target.value);
        }

        
              
        return (

        <div className="flex flex-wrap items-start p-20 bg-gradient-to-r from-teal-600 to-teal-500 h-screen">  
                        {/* Container for Consumer */}
                        <div className="max-w-5xl mx-4 my-20 w-1/2 place-items-center">
                                <h1 className="text-7xl font-bold text-white mb-16">Are you a Consumer ?</h1>
                                <div onClick={handleTracking} className="cursor-pointer bg-teal-600 rounded-lg shadow-md flex flex-col ml-44  w-3/5">
                                        <div className="overflow-hidden">
                                                <img src={checkpointsnew} alt="Track Medicines" className="rounded-lg shadow-lg"/>
                                        </div>
                                        <button className="text-3xl font-bold rounded-b-lg mb-2 h-32 p-9 text-white bg-teal-800 hover:bg-teal-700 text-center" onClick={handleTracking}>Track Medicines</button>
                                </div>                   </div>

                        {/* Container for Stakeholders */}
                        <div className="flex flex-col max-w-5xl my-20 ml-8 mb-8 place-content-center w-1/2">
                                <h1 className='text-7xl font-bold text-white mb-6'>Are you a Stakeholder?</h1>
                                <div className="grid  md:grid-cols-1 gap-6 justify-center w-2/3 mx-40">
                                        <button onClick={handleRmsClick} className="bg-teal-800 text-white mt-10 px-6 py-4 rounded-md hover:bg-teal-700 text-2xl md:text-5xl">Raw Material Supplier</button>
                                        <button onClick={handleGovernmentClick} className="bg-teal-800 text-white px-6 py-4 rounded-md hover:bg-teal-700 text-2xl md:text-5xl">Government</button>
                                        <button onClick={handleManufacturersClick} className="bg-teal-800 text-white px-6 py-4 rounded-md hover:bg-teal-700 text-2xl md:text-5xl">Manufacturer</button>
                                        <button onClick={handleDistributorsClick} className="bg-teal-800 text-white px-6 py-4 rounded-md hover:bg-teal-700 text-2xl md:text-5xl">Distributor</button>
                                        <button onClick={handleRetailersClick} className="bg-teal-800 text-white px-6 py-4 rounded-md hover:bg-teal-700 text-2xl md:text-5xl">Retailer</button>

                                </div>

                        </div>

        </div>
  );
};

export default Home;




