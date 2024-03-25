import React, { useState,useEffect } from 'react'
import Web3 from "web3";
import PharmaTrustABI from "../artifacts/PharmaTrust.json"

const Order = () => {

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

        const [currentaccount, setCurrentaccount] = useState("");
        const [loader, setloader] = useState(true);
        const [SupplyChain, setSupplyChain] = useState();
        const [MED, setMED] = useState();
        const [MedStage, setMedStage] = useState();

        const [medname, setMedname] = useState(" ");
        const [doe, setDoe] = useState(" ");
        const [description, setDescription] = useState(" ");

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
                    const supplychain = new web3.eth.Contract(PharmaTrustABI.abi, networkData.address);
                    setSupplyChain(supplychain);
                    var i;
                    const medCtr = await supplychain.methods.medicineCount().call();
                    const med = [];
                    const medStage = [];
                    for (i = 0; i < medCtr; i++) {
                        med[i] = await supplychain.methods.medAvailable(i + 1).call();
                        medStage[i] = await supplychain.methods.showStage(i + 1).call();
                    }
                    setMED(med);
                    setMedStage(medStage);
                    setloader(false);
                }
                else {
                    window.alert('The smart contract is not deployed to current network')
                }
            }

        

        const handleMedname = (e) => {
                console.log(e.target.value);
                setMedname(e.target.value);
                // console.log(medicineID);
        };

        const handleDoe = (e) => {
                const newDate = e.target.value;
                console.log("New Date:", newDate);
                setDoe(newDate);
        }; 

        const handleDescription = (e) => {
                setDescription(e.target.value);
                console.log(description);
        };

        const handlerSubmitMED = async (event) => {
                event.preventDefault();
                try {
                    var reciept = await SupplyChain.methods.addMedicine(medname,doe,description).send({ from: currentaccount });
                    if (reciept) {
                        loadBlockchaindata();
                    }
                }
                catch (err) {
                    alert("An error occured!!!")
                }
                window.location.reload();
        }     


        return (
        <div className='bg-gradient-to-r from-teal-600 to-teal-500 h-screen'>
                        <h1 className='text-6xl text-center font-bold  p-5 mb-4 text-white'>Order Medicine</h1>
                        <div className="flex ">
                        <div className="w-1/2">
                        <div className="p-16 drop-shadow-xl">
                                <label className="p-8 text-4xl font-bold text-white" htmlFor="name">Medicine Name</label>
                                <input 
                                className="text-3xl border border-black-300 rounded-md p-2"
                                id="name"
                                type="text"
                                onChange={handleMedname}
                                placeholder="Name"
                                required
                                />
                        </div>
                        <div className="p-16 drop-shadow-xl">
                                <label className="p-8 font-bold text-4xl text-white" htmlFor="description">Description</label>
                                <input 
                                className="text-3xl border border-black-300 rounded-md p-2"
                                id="description"
                                type="text"
                                onChange={handleDescription}
                                placeholder="Description"
                                required
                                />
                        </div>
                        </div>
                        
                        <div className="w-1/2">
                        <div className="p-16 drop-shadow-xl">
                                <label className="p-8 text-4xl font-bold text-white" htmlFor="doe">Date of Expiry</label>
                                <input 
                                className="text-3xl border border-black-300 rounded-md p-2"
                                id="doe"
                                type="date"
                                onChange={handleDoe}
                                placeholder="Date of Expiry"
                                required
                                />
                        </div>
                        </div>
                </div>    
                <button className='bg-teal-800 hover:bg-teal-700 text-white px-6 py-3 rounded-md mt-2 mb-2 text-3xl' onClick={handlerSubmitMED}>Order</button>  
                <h5 className="text-3xl mt-8 text-white">Ordered Medicines:</h5>
                <table className="w-full mt-4 border border-gray-200">
                        <thead>
                        <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2 text-2xl">Medicine ID</th>
                                <th className="border border-gray-200 px-4 py-2 text-2xl">Name</th>
                                <th className="border border-gray-200 px-4 py-2 text-2xl">Date of Expiry</th>
                                <th className="border border-gray-200 px-4 py-2 text-2xl">Description</th>
                                <th className="border border-gray-200 px-4 py-2 text-2xl">Current Stage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {MED && MED.map((med, index) => (
                                <tr key={index} className="bg text-white">
                                <td className="border border-gray-200 px-4 py-2 text-2xl">{med.id}</td>
                                <td className="border border-gray-200 px-4 py-2 text-2xl">{med.name}</td>
                                <td className="border border-gray-200 px-4 py-2 text-2xl">{med.expDate}</td>
                                <td className="border border-gray-200 px-4 py-2 text-2xl">{med.description}</td>
                                <td className="border border-gray-200 px-4 py-2 text-2xl">{MedStage[index]}</td>
                                </tr>
                        ))}
                        </tbody>
                </table>
        </div>
  )
}

export default Order
