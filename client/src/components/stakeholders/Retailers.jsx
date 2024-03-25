import React from 'react'
import { useNavigate } from 'react-router-dom';
import rawMaterialSupply from '../../images/rawmaterials.jpg'


const Retailers = () => {

        const navigate=useNavigate();

        const handleSellClick = () => {
                      navigate('/sell');
        };
        const handleRetailClick = () => {
                navigate('/retail');
        };
        const handleOrderClick = () => {
                navigate('/order');
        };
        const handleTrackerClick = () => {
                      navigate('/track');
        };

  return (
    <div className="text-white bg-gradient-to-r from-teal-600 to-teal-500 p-12 h-screen overflow-hidden">
      <h1 className="text-5xl font-bold mb-20">Retailer Dashboard</h1>
      {/* <div className="mb-6 text-2xl pt-8">What would you like to do?</div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div onClick={handleOrderClick} className="cursor-pointer bg-teal-600  rounded-lg shadow-lg flex flex-col justify-center h-100 ">
                                        <div className="overflow-hidden">
                                                <img src={rawMaterialSupply} alt="" className="rounded-lg shadow-lg"/>
                                        </div>
                                        <button className="text-3xl font-bold rounded-b-lg mb-2 h-32 p-9 text-white bg-teal-800 text-center"><a href='/order'>Order Medicines</a></button>
                                </div>
                                <div onClick={handleSellClick} className="cursor-pointer bg-teal-600  rounded-lg shadow-md flex flex-col justify-center h-100 ">
                                        <div className="overflow-hidden">
                                                <img src={rawMaterialSupply} alt="" className="rounded-lg shadow-lg"/>
                                        </div>
                                        <button className="text-3xl font-bold rounded-b-lg mb-2 h-32 p-9 text-white bg-teal-800 text-center"><a href='/sell'>Sell Medicines</a></button>
                                </div>
                                <div onClick={handleRetailClick} className="cursor-pointer bg-teal-600  rounded-lg shadow-md flex flex-col justify-center h-100 ">
                                        <div className="overflow-hidden">
                                                <img src={rawMaterialSupply} alt="" className="rounded-lg shadow-lg"/>
                                        </div>
                                        <button className="text-3xl font-bold rounded-b-lg mb-2 h-32 p-9 text-white bg-teal-800 text-center"><a href='/retail'>Retail Medicines</a></button>
                                </div>
                               
                        </div>
    </div>
  )
}

export default Retailers