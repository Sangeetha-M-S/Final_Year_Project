import React from 'react'
import { useNavigate } from 'react-router-dom';
import rawMaterialSupply from '../../images/rawmaterials.jpg'
// import trackMedicine from '../../images/checkpoints.jpg'
import Shortage from '../../images/Shortage.jpeg'
import checkpointsnew from '../../images/checkpointsnew.jpg'
// import trackMedicine from '../../images/checkpoints.jpg'
// import rawMaterialSupply   from '../../images/supply.jpeg'



const Rms = () => {
        const navigate = useNavigate();

        const handleRmsClick = () => {
                // Navigate to the Register component when clicking on "Register Stakeholders"
                navigate('/supplyrms');
        };

        const handleDrmsClick = () => {
                // Navigate to the Register component when clicking on "Register Stakeholders"
                navigate('/denyrms');
        };

        const handleTrackerClick = () => {
                // Navigate to the Register component when clicking on "Register Stakeholders"
                navigate('/track');
        };
        

        return (
                
                <div className="text-white bg-gradient-to-r from-teal-600 to-teal-500 p-12 h-screen overflow-hidden">
                        <h1 className="text-5xl font-bold mb-20">Raw material Supplier Dashboard</h1>
                        {/* <div className="mb-6 text-2xl pt-8">What would you like to do?</div> */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-80">
                        <div onClick={handleRmsClick} className="cursor-pointer bg-teal-600  rounded-lg shadow-lg flex flex-col justify-center h-100 ">
                                        <div className="overflow-hidden">
                                                <img src={rawMaterialSupply} alt="Supply Raw Materials" className="rounded-lg shadow-lg"/>
                                        </div>
                                        <button className="text-3xl font-bold rounded-b-lg mb-2 h-32 p-9 text-white bg-teal-800 text-center"><a href='/supplyrms'>Supply Raw Materials</a></button>
                                </div>
                                <div onClick={handleDrmsClick} className="cursor-pointer bg-teal-600  rounded-lg shadow-md flex flex-col justify-center h-100 ">
                                        <div className="overflow-hidden">
                                                <img src={Shortage} alt="Shortage of Raw Materials" className="rounded-lg shadow-lg"/>
                                        </div>
                                        <button className="text-3xl font-bold rounded-b-lg mb-2 h-32 p-9 text-white bg-teal-800 text-center"><a href='/denyrms'>Insufficient Raw Materials</a></button>
                                </div>
                               
                        </div>
                </div>
                
        )
}

export default Rms
