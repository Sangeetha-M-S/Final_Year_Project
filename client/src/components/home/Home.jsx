import React from 'react';
import { MdGroups } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import { CgTrack } from 'react-icons/cg';
import { GrDocumentUpdate } from 'react-icons/gr';
// import bgImage from '../../images/bg_image.jpg'
// import { useNavigate } from 'react-router-dom';


const Home = () => {
        // const navigate=useNavigate();


        // const backgroundStyles = {
        //         backgroundImage: `url(${bgImage})`,
        //         backgroundSize: 'cover',
        //         // backgroundPosition: 'center', // Centers the background image within the container
        //         backgroundRepeat: 'Container',
        //       };
              
        return (

        <div className="flex justify-between items-start p-9 bg-gradient-to-r from-teal-600 to-teal-500 h-screen" >
                <div className="max-w-5xl mx-4 my-20 w-1/2">
                        <h1 className="text-7xl font-bold text-white mb-20">What is PharmaTrust ?</h1>
                        <p className="text-2xl leading-relaxed mt-4 text-white text-justify">
                        Welcome to PharmaTrust, a pioneering initiative poised to revolutionize the pharmaceutical industry through the transformative 
                        capabilities of blockchain technology. Our mission is centered on establishing a transparent and legalized pharmaceutical supply chain 
                        system, prioritizing patient safety, regulatory compliance, and overall industry integrity. With a focus on blockchain-based platform 
                        development, real-time updates, secure records, and transparent information sharing, PharmaTrust aims to reshape the pharmaceutical
                        landscape. By leveraging the power of blockchain, we ensure tamper-proof records, document vital information, and enhance 
                        transparency and accountability within the pharmaceutical supply chain. Our commitment to pharmaceutical integrity assurance 
                        involves implementing a blockchain-based system to validate drug authenticity, ultimately reducing the risk of counterfeit products 
                        and ensuring patient safety within a regulated and legalized framework. Join us in embracing a future where PharmaTrust's innovative 
                        solutions redefine the standards of security, transparency, and compliance in the pharmaceutical industry.
                        </p>
                </div>
                <div className="flex flex-col max-w-5xl my-20 ml-8 mb-8 place-content-center w-1/2">
                        <h1 className='text-7xl font-bold text-white mb-6'>Features</h1>
                        <div className="mb-6 p-5 shadow-md transition-all duration-300 hover:shadow-lg rounded-lg">
                                <h1 className="text-4xl mb-2 text-white"><MdGroups className="inline-block mr-2" />Add Stakeholders</h1>
                                <p className="text-xl text-white">Option to add manufacturers, raw materials suppliers, distributors, and retailers</p>
                        </div>
                        <div className="mb-6 p-5 shadow-md transition-all duration-300 hover:shadow-lg rounded-lg">
                                <h1 className="text-4xl mb-2 text-white"><GiMedicines className="inline-block mr-2" />Order Medicines</h1>
                                <p className="text-xl text-white">Option to order medicine applicable only for retailers</p>
                        </div>
                        <div className="mb-6 p-5 shadow-md transition-all duration-300 hover:shadow-lg rounded-lg">
                                <h1 className="text-4xl mb-2 text-white"><CgTrack className="inline-block mr-2" />Track Medicines</h1>
                                <p className="text-xl text-white">Option to update the status of medicine for manufacturers, raw material suppliers, distributors, and retailers</p>
                        </div>
                        <div className="mb-6 p-5 shadow-md transition-all duration-300 hover:shadow-lg rounded-lg">
                                <h1 className="text-4xl mb-2 text-white"><GrDocumentUpdate className="inline-block mr-2" />Update Medicines</h1>
                                <p className="text-xl text-white">Option to track any medicine</p>
                        </div>
                </div>

        </div>
  );
};

export default Home;




