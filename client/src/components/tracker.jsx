import React, { useState,useEffect } from 'react';
import Web3 from "web3";
import PharmaTrustABI from "./artifacts/PharmaTrust.json"
import { useNavigate } from 'react-router-dom';

const Tracker = () => {
        const [medicineID, setMedicineID] = useState();
        const [currentaccount, setCurrentaccount] = useState("");
        const [loader, setloader] = useState(true);
        const [Data, setData] = useState();
        const [MED, setMED] = useState();
        const [MedStage, setMedStage] = useState();
        const [ID, setID] = useState();
        const [RMS, setRMS] = useState();
        const [MAN, setMAN] = useState();
        const [DIS, setDIS] = useState();
        const [RET, setRET] = useState();
        const [TrackTillSold, showTrackTillSold] = useState(false);
        const [TrackTillRetail, showTrackTillRetail] = useState(false);
        const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
        const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
        const [TrackTillRMS, showTrackTillRMS] = useState(false);
        const [TrackTillOrdered, showTrackTillOrdered] = useState(false);

        const handleMedicineID= (e) => {
                const newMedicineID = e.target.value;
                setMedicineID(newMedicineID);
                console.log(newMedicineID); // Log the updated value directly
        };

        const handleRefresh = () => {
                window.location.reload(); // Refresh the page
        };
        const navigate=useNavigate();

        useEffect(() => {
                loadWeb3();
                loadBlockchaindata();

                // Listen for account changes in MetaMask
                window.ethereum.on('accountsChanged', handleAccountsChanged);

                // Cleanup function to remove the event listener
                return () => {
                        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                        };
                }, [])

                const handleAccountsChanged = (accounts) => {
                        // Reload the page when the connected account changes
                        window.location.reload();
                };

        const loadWeb3 = async () => {
                if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                } else {
                window.alert(
                        "Non-Ethereum browser detected. You should consider trying MetaMask!"
                );
                }
        };

        const loadBlockchaindata = async () => {
                setloader(true);
                const web3 = window.web3;
                const accounts = await web3.eth.getAccounts();
                const account = accounts[0];
                setCurrentaccount(account);
                const networkId = await web3.eth.net.getId();
                const networkData = PharmaTrustABI.networks[networkId];
                if (networkData) {
                    const contract = new web3.eth.Contract(PharmaTrustABI.abi, networkData.address);
                    setData(contract);
                    var i;
                    const medCtr = await contract.methods.medicineCount().call();
                    const med = {};
                    const medStage = {};
                    for (i = 0; i < medCtr; i++) {
                        const medicine = await contract.methods.medAvailable(i + 1).call();
                        const stage = await contract.methods.showStage(i + 1).call();

                        // Use the index of the medAvailable array as the key for the med object
                        med[i + 1] = medicine;
                        medStage[i + 1] = stage;
                    }
                    setMED(med);
                    setMedStage(medStage);
                //     console.log(medStage);
                    const rmsCtr = await contract.methods.rmsCount().call();
                    const rms = {};
                    for (i = 0; i < rmsCtr; i++) {
                        rms[i + 1] = await contract.methods.RMS(i + 1).call();
                    }
                    setRMS(rms);
                    const manCtr = await contract.methods.manCount().call();
                    const man = {};
                    for (i = 0; i < manCtr; i++) {
                        man[i + 1] = await contract.methods.MAN(i + 1).call();
                    }
                    setMAN(man);
                    const disCtr = await contract.methods.distCount().call();
                    const dis = {};
                    for (i = 0; i < disCtr; i++) {
                        dis[i + 1] = await contract.methods.DIST(i + 1).call();
                    }
                    setDIS(dis);
                    const retCtr = await contract.methods.phCount().call();
                    const ret = {};
                    for (i = 0; i < retCtr; i++) {
                        ret[i + 1] = await contract.methods.RET(i + 1).call();
                    }
                    setRET(ret);
                    setloader(false);
                }
                else {
                    window.alert('The smart contract is not deployed to current network')
                }
        }
        // if (loader) {
        //         return (
        //             <div>
        //                 <h1 className="wait">Loading...</h1>
        //             </div>
        //         )
        // }
       
        
        const handlerSubmit = async (event) => {
                event.preventDefault();
                var ctr = await Data.methods.medicineCount().call();
                console.log(medicineID);
                if (!((medicineID > 0) && (medicineID <= ctr))){
                   
                        alert("Invalid Medicine ID!!!");
                }
                else {
                    // eslint-disable-next-line
                    // console.log(medicineID)
                    // console.log(MED[medicineID]);
                    if (MED[medicineID].stage == 6)
                        showTrackTillSold(true);
                //     eslint-disable-next-line
                    else if (MED[medicineID].stage == 5)
                        showTrackTillRetail(true);
                    // eslint-disable-next-line
                    else if (MED[medicineID].stage == 4)
                        showTrackTillDistribution(true);
                    // eslint-disable-next-line
                    else if (MED[medicineID].stage == 3)
                        showTrackTillManufacture(true);
                    // eslint-disable-next-line
                    else if (MED[medicineID].stage == 2)
                        showTrackTillRMS(true);
                    else
                        showTrackTillOrdered(true);
                }
                // console.log(MED[medicineID]);
                // console.log(MED[medicineID].stage);
                // console.log(TrackTillManufacture);
            }   
            
            const renderStageTable = () => {
                if (TrackTillSold && MED && MED[medicineID] && RET && MAN && DIS && RMS) {
                        return (
                                <div className="container-xl">
                                    {/* <div className="grid place-items-start text-2xl">
                                        <h2><b><u>Medicine Details :</u></b></h2>
                                        <span><b>Medicine ID: </b>{MED[medicineID].id}</span>
                                        <span><b>Name:</b> {MED[medicineID].name}</span>
                                        <span><b>Description: </b>{MED[medicineID].description}</span>
                                        <span><b>Expiry Date: </b>{MED[medicineID].expDate}</span>
                                        <span><b>Current stage: </b>{MedStage[medicineID]}</span>
                                    </div> */}
                                    <br/>
                                    
                                    <div className="grid gap-x-8 gap-y-4 grid-cols-5 text-2xl">
                    
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><b><u>Raw Materials Supplied by:</u></b></h2>
                                            <p><b>Supplier ID: </b>{RMS[MED[medicineID].RMSid].id}</p>
                                            <p><b>Name:</b> {RMS[MED[medicineID].RMSid].name}</p>
                                            <p><b>Place: </b>{RMS[MED[medicineID].RMSid].place}</p>
                                        </div>
                                        {/* <span>&#10132;</span> */}
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><b><u>Manufactured by:</u></b></h2>
                                            <p><b>Manufacturer ID: </b>{MAN[MED[medicineID].MANid].id}</p>
                                            <p><b>Name:</b> {MAN[MED[medicineID].MANid].name}</p>
                                            <p><b>Place: </b>{MAN[MED[medicineID].MANid].place}</p>
                                        </div>
                                        {/* <span>&#10132;</span> */}
                                        <div className="flex-row border-solid border-4 border-white p-4">
                                            <h2><u><b>Distributed By:</b></u></h2>
                                            <p><b>Distributor ID: </b>{DIS[MED[medicineID].DISTid].id}</p>
                                            <p><b>Name:</b> {DIS[MED[medicineID].DISTid].name}</p>
                                            <p><b>Place: </b>{DIS[MED[medicineID].DISTid].place}</p>
                                        </div>
                                        {/* <span>&#10132;</span> */}
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><b><u>Retailed by:</u></b></h2>
                                            <p><b>Retailer ID: </b>{RET[MED[medicineID].RETid].id}</p>
                                            <p><b>Name:</b> {RET[MED[medicineID].RETid].name}</p>
                                            <p><b>Place: </b>{RET[MED[medicineID].RETid].place}</p>
                                        </div>
                                        {/* <span>&#10132;</span> */}
                                        <div className='text-xxl border-solid border-4 border-white p-4 place-content-center'>
                                            <b>Sold</b>
                                        </div>
                                    </div>
                                    {/* <button onClick={() => {
                                        showTrackTillSold(false);
                                    }} className="btn btn-outline-primary btn-sm">Track Another Item</button> */}
                                    {/* <span onClick={() => {
                                        navigate('/')
                                    }} className="btn btn-outline-danger btn-sm"> HOME</span> */}
                                </div >
                            )
                } 
                if (TrackTillRetail && MED && MED[medicineID] && RET && MAN && DIS && RMS) {
                        return (
                                <div className="container-xl">
                                    {/* <div className="grid place-items-start text-2xl">
                                        <h3 className='mt-3'><b><u>Medicine Details :</u></b></h3>
                                        <span><b>Medicine ID: </b>{MED[medicineID].id}</span>
                                        
                                        <span><b>Name:</b> {MED[medicineID].name}</span>
                                        
                                        <span><b>Description: </b>{MED[medicineID].description}</span>
                                        
                                        <span><b>Expiry Date: </b>{MED[medicineID].expDate}</span>
                                        
                                        <span><b>Current stage: </b>{MedStage[medicineID]}</span>
                                    </div> */}
                                    <br/>
                                    
                                    <div className="grid gap-x-8 gap-y-4 grid-cols-5 text-2xl">
                    
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><u>Raw Materials Supplied by:</u></h2>
                                            <p><b>Supplier ID: </b>{RMS[MED[medicineID].RMSid].id}</p>
                                            <p><b>Name:</b> {RMS[MED[medicineID].RMSid].name}</p>
                                            <p><b>Place: </b>{RMS[MED[medicineID].RMSid].place}</p>
                                        </div>
                                        {/* <span>&#10132;</span> */}
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><u>Manufactured by:</u></h2>
                                            <p><b>Manufacturer ID: </b>{MAN[MED[medicineID].MANid].id}</p>
                                            <p><b>Name:</b> {MAN[MED[medicineID].MANid].name}</p>
                                            <p><b>Place: </b>{MAN[MED[medicineID].MANid].place}</p>
                                        </div>
                                        {/* <span>&#10132;</span> */}
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><u>Distributed by:</u></h2>
                                            <p><b>Distributor ID: </b>{DIS[MED[medicineID].DISTid].id}</p>
                                            <p><b>Name:</b> {DIS[MED[medicineID].DISTid].name}</p>
                                            <p><b>Place: </b>{DIS[MED[medicineID].DISTid].place}</p>
                                        </div>
                                        {/* <span>&#10132;</span> */}
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><u>Retailed by:</u></h2>
                                            <p><b>Retailer ID: </b>{RET[MED[medicineID].RETid].id}</p>
                                            <p><b>Name:</b> {RET[MED[medicineID].RETid].name}</p>
                                            <p><b>Place: </b>{RET[MED[medicineID].RETid].place}</p>
                                        </div>
                                    </div>
                                    {/* <button onClick={() => {
                                        showTrackTillRetail(false);
                                    }} className="btn btn-outline-primary btn-sm">Track Another Item</button> */}
                                    {/* <span onClick={() => {
                                        navigate('/')
                                    }} className="btn btn-outline-danger btn-sm"> HOME</span> */}
                                </div>
                            )
                }
                if (TrackTillDistribution && MED && MED[medicineID] && MAN && DIS && RMS) {
                        return (
                                <div className="container-xl">
                                    {/* <div className="grid place-items-start text-2xl">
                                        <h3 className='mt-3'><b><u>Medicine Details :</u></b></h3>
                                        <span><b>Medicine ID: </b>{MED[medicineID].id}</span>
                                        
                                        <span><b>Name:</b> {MED[medicineID].name}</span>
                                        
                                        <span><b>Description: </b>{MED[medicineID].description}</span>
                                        
                                        <span><b>Expiry Date: </b>{MED[medicineID].expDate}</span>
                                        
                                        <span><b>Current stage: </b>{MedStage[medicineID]}</span>
                                    </div> */}
                                    <br/>
                                    
                                    <div className="grid gap-x-8 gap-y-4 grid-cols-5 text-2xl">
                    
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><u>Raw Materials Supplied by:</u></h2>
                                            <p><b>Supplier ID: </b>{RMS[MED[medicineID].RMSid].id}</p>
                                            <p><b>Name:</b> {RMS[MED[medicineID].RMSid].name}</p>
                                            <p><b>Place: </b>{RMS[MED[medicineID].RMSid].place}</p>
                                        </div>
                                        {/* <span>&#10132;</span> */}
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><u>Manufactured by:</u></h2>
                                            <p><b>Manufacturer ID: </b>{MAN[MED[medicineID].MANid].id}</p>
                                            <p><b>Name:</b> {MAN[MED[medicineID].MANid].name}</p>
                                            <p><b>Place: </b>{MAN[MED[medicineID].MANid].place}</p>
                                        </div>
                                        {/* <span>&#10132;</span> */}
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><u>Distributed by:</u></h2>
                                            <p><b>Distributor ID: </b>{DIS[MED[medicineID].DISTid].id}</p>
                                            <p><b>Name:</b> {DIS[MED[medicineID].DISTid].name}</p>
                                            <p><b>Place: </b>{DIS[MED[medicineID].DISTid].place}</p>
                                        </div>
                                    </div>
                                    {/* <button onClick={() => {
                                        showTrackTillDistribution(false);
                                    }} className="btn btn-outline-primary btn-sm">Track Another Item</button> */}
                                    {/* <span onClick={() => {
                                        navigate('/')
                                    }} className="btn btn-outline-danger btn-sm"> HOME</span> */}
                                </div >
                            )
                } 
                if (TrackTillManufacture && MED && MED[medicineID] && MAN && RMS) {
                        return (
                                <div className="container-xl">
                                    {/* <div className="grid place-items-start text-2xl">
                                        <h3 className='mt-3'><b><u>Medicine Details :</u></b></h3>
                                        <span><b>Medicine ID: </b>{MED[medicineID].id}</span>
                                        
                                        <span><b>Name:</b> {MED[medicineID].name}</span>
                                        
                                        <span><b>Description: </b>{MED[medicineID].description}</span>
                                        
                                        <span><b>Expiry Date: </b>{MED[medicineID].expDate}</span>
                                        
                                        <span><b>Current stage: </b>{MedStage[medicineID]}</span>
                                    </div> */}
                                    <br/>
                                    
                                    <div className="grid gap-x-8 gap-y-4 grid-cols-5 text-2xl">
                    
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><u>Raw Materials Supplied by:</u></h2>
                                            <p><b>Supplier ID: </b>{RMS[MED[medicineID].RMSid].id}</p>
                                            <p><b>Name:</b> {RMS[MED[medicineID].RMSid].name}</p>
                                            <p><b>Place: </b>{RMS[MED[medicineID].RMSid].place}</p>
                                        </div>
                                        {/* <span>&#10132;</span> */}
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><u>Manufactured by:</u></h2>
                                            <p><b>Manufacturer ID: </b>{MAN[MED[medicineID].MANid].id}</p>
                                            <p><b>Name:</b> {MAN[MED[medicineID].MANid].name}</p>
                                            <p><b>Place: </b>{MAN[MED[medicineID].MANid].place}</p>
                                        </div>
                                    </div>
                                    {/* <button onClick={() => {
                                        showTrackTillManufacture(false);
                                    }} className="btn btn-outline-primary btn-sm">Track Another Item</button> */}
                                    {/* <span onClick={() => {
                                        navigate('/')
                                    }} className="btn btn-outline-danger btn-sm"> HOME</span> */}
                                </div >
                            )
                } 
                if (TrackTillRMS && MED && MED[medicineID] && RMS) {
                        return (
                                <div className="container-xl">
                                    {/* <div className="grid place-items-start text-2xl">
                                        <h3 className='mt-3'><b><u>Medicine Details :</u></b></h3>
                                        <span><b>Medicine ID: </b>{MED[medicineID].id}</span>
        
                                        <span><b>Name:</b> {MED[medicineID].name}</span>
        
                                        <span><b>Description: </b>{MED[medicineID].description}</span>
        
                                        <span><b>Expiry Date: </b>{MED[medicineID].expDate}</span>
        
                                        <span><b>Current stage: </b>{MedStage[medicineID]}</span>
                                    </div> */}
                                    <br/>
                                    <div className="grid gap-x-8 gap-y-4 grid-cols-5 text-2xl">
                    
                                        <div className="border-solid border-4 border-white p-4">
                                            <h2><u>Raw Materials Supplied by:</u></h2>
                                            <p><b>Supplier ID: </b>{RMS[MED[medicineID].RMSid].id}</p>
                                            <p><b>Name:</b> {RMS[MED[medicineID].RMSid].name}</p>
                                            <p><b>Place: </b>{RMS[MED[medicineID].RMSid].place}</p>
                                        </div>
                                    </div>
                                    {/* <button onClick={() => {
                                        showTrackTillRMS(false);
                                    }} className="btn btn-outline-primary btn-sm">Track Another Item</button> */}
                                    {/* <span onClick={() => {
                                        navigate('/')
                                    }} className="btn btn-outline-danger btn-sm"> HOME</span> */}
                                </div >
                            )
                } 
                if (TrackTillOrdered && MED && MED[medicineID]) {
                        return (
                                <div className="container-xl">
                                    {/* <div className="grid place-items-start text-2xl">
                                        <h3 className='mt-3'><b><u>Medicine Details :</u></b></h3>
                                        <span><b>Medicine ID: </b>{MED[medicineID].id}</span>
                                        
                                        <span><b>Name:</b> {MED[medicineID].name}</span>
                                        
                                        <span><b>Description: </b>{MED[medicineID].description}</span>
                                        
                                        <span><b>Expiry Date: </b>{MED[medicineID].expDate}</span>
                                        
                                        <span><b>Current stage: </b>{MedStage[medicineID]}</span>
                                    </div> */}
                                    <br/>
                                    {/* <div className="grid gap-x-8 gap-y-4 grid-cols-5">
                                        <h2>Medicine is not yet Processed by Raw material supplier</h2>
                                    </div> */}
                                    {/* <button onClick={() => {
                                        showTrackTillDistribution(false);
                                    }} className="btn btn-outline-primary btn-sm">Track Another Item</button> */}
                             
                                </div >
                            )
                } 
                //  else {
                //     return null;
                // }
            }

        return (
                <div className="p-8 text-white bg-gradient-to-r from-teal-600 to-teal-500 p-12 h-screen overflow-hidden">
                        <h1 className="text-6xl font-bold mb-8 text-white">Track Medicine</h1>
                        
                        <div className="p-4">
                        <span className='inline-flex items-baseline'><label className="block mb-4 text-4xl mr-6" htmlFor="license">Enter Medicine ID</label>
                                <input
                                className="bg-white border rounded-md py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline text-3xl"
                                id="license"
                                type="text"
                                onChange={handleMedicineID}
                                placeholder="Medicine ID"
                                required
                                /></span>
                        </div>
                        <button className='bg-teal-800 hover:bg-teal-700 text-white px-6 py-3 rounded-md mt-4 font-bold  text-3xl' onClick={handlerSubmit}>Track</button>
                        <table className="w-full mt-4 border border-gray-200">
                                <thead>
                                <tr className="bg-gray-100 text-black">
                                        <th className="border border-gray-200 px-4 py-2 text-2xl">Medicine ID</th>
                                        <th className="border border-gray-200 px-4 py-2 text-2xl">Name</th>
                                        <th className="border border-gray-200 px-4 py-2 text-2xl">Date of Expiry</th>
                                        <th className="border border-gray-200 px-4 py-2 text-2xl">Description</th>
                                        <th className="border border-gray-200 px-4 py-2 text-2xl">Current Stage</th>
                                </tr>
                                </thead>
                                <tbody>
                                {MED && Object.values(MED).map((med, index) => (
                                        <tr key={index} className="bg">
                                        <td className="border border-gray-200 px-4 py-2 text-2xl">{med.id}</td>
                                        <td className="border border-gray-200 px-4 py-2 text-2xl">{med.name}</td>
                                        <td className="border border-gray-200 px-4 py-2 text-2xl">{med.expDate}</td>
                                        <td className="border border-gray-200 px-4 py-2 text-2xl">{med.description}</td>
                                        <td className="border border-gray-200 px-4 py-2 text-2xl">{MedStage[index+1]}</td>
                                        </tr>
                                ))}
                                </tbody>
                        </table>

                      
                        
                        {renderStageTable()}
                        <br></br>
                        <button className="bg-teal-800 hover:bg-teal-700 text-white px-6 py-3 rounded-md ml-4 hover:bg-green-800 text-3xl font-bold mt-4 border-solid" onClick={handleRefresh}>Refresh</button>
                </div>
                );
        };

export default Tracker;
