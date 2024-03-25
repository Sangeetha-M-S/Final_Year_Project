import { useState,useEffect } from 'react';
import Web3 from "web3";
import PharmaTrustABI from "../artifacts/PharmaTrust.json"
import { useNavigate } from "react-router-dom"

const Register = () => {

        const navigate = useNavigate()
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
        

        const [name, setName] = useState('');
        const [industry, setIndustry] = useState('');
        const [wallet, setWallet] = useState('');
        const [license, setLicense] = useState('');
        const [RMS, setRMS] = useState();
        const [MAN, setMAN] = useState();
        const [DIS, setDIS] = useState();
        const [RET, setRET] = useState();

        const handleName = (e) => {
                setName(e.target.value);
                console.log(name);
        }

        const handleIndustry = (e) => {
                setIndustry(e.target.value);
                console.log(industry);
        }

        const handleWallet = (e) => {
                setWallet(e.target.value);
                console.log(wallet);
        }

        const handleLicense = (e) => {
                setLicense(e.target.value);
                console.log(license);
        }

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
                console.log(networkId);
                const networkData = PharmaTrustABI.networks[networkId];
                console.log(networkData);
                if (networkData) {
                    const supplychain = new web3.eth.Contract(PharmaTrustABI.abi, networkData.address);
                    setSupplyChain(supplychain);
                    var i;
                    const rmsCtr = await supplychain.methods.rmsCount().call();
                    const rms = {};
                    for (i = 0; i < rmsCtr; i++) {
                        rms[i] = await supplychain.methods.RMS(i + 1).call();
                    }
                    setRMS(rms);
                    const manCtr = await supplychain.methods.manCount().call();
                    const man = {};
                    for (i = 0; i < manCtr; i++) {
                        man[i] = await supplychain.methods.MAN(i + 1).call();
                    }
                    setMAN(man);
                    const disCtr = await supplychain.methods.distCount().call();
                    const dis = {};
                    for (i = 0; i < disCtr; i++) {
                        dis[i] = await supplychain.methods.DIST(i + 1).call();
                    }
                    setDIS(dis);
                    const retCtr = await supplychain.methods.phCount().call();
                    const ret = {};
                    for (i = 0; i < retCtr; i++) {
                        ret[i] = await supplychain.methods.RET(i + 1).call();
                    }
                    setRET(ret);
                    setloader(false);
                }
                else {
                    window.alert('The smart contract is not deployed to current network')
                }
            }

        const handleRegistration = async () => {
                try {
                    // Determine which option is selected
                    switch (industry) {
                        case "r": // Raw Material Supplier
                            await registerRawMaterialSupplier();
                            break;
                        case "m": // Manufacturer
                            await registerManufacturer();
                            break;
                        case "d": // Distributor
                            await registerDistributor();
                            break;
                        case "re": // Retailer
                            await registerRetailer();
                            break;
                        default:
                            // Invalid option selected
                            alert("Invalid industry option:", industry);
                            break;
                    }
                } catch (error) {
                    // Handle errors during registration
                    alert("Error during registration:", error);
                    // Optionally, provide feedback to the user (e.g., show an error message)
                }
            };
            
            const registerRawMaterialSupplier = async () => {
                // Call the smart contract method to register the raw material supplier
                const receipt = await SupplyChain.methods.addRMS(wallet, name, license).send({ from: currentaccount });
                // Handle successful registration
                console.log("Raw Material Supplier registered:", receipt);
                // Optionally, provide feedback to the user (e.g., show a success message)
                window.location.reload();
            };
            
            const registerManufacturer = async () => {
                // Call the smart contract method to register the manufacturer
                const receipt = await SupplyChain.methods.addManufacturer(wallet, name, license).send({ from: currentaccount });
                // Handle successful registration
                console.log("Manufacturer registered:", receipt);
                // Optionally, provide feedback to the user (e.g., show a success message)
                window.location.reload();
            };
            
            const registerDistributor = async () => {
                // Call the smart contract method to register the distributor
                const receipt = await SupplyChain.methods.addDistributor(wallet, name, license).send({ from: currentaccount });
                // Handle successful registration
                console.log("Distributor registered:", receipt);
                // Optionally, provide feedback to the user (e.g., show a success message)
                window.location.reload();
            };
            
            const registerRetailer = async () => {
                // Call the smart contract method to register the retailer
                const receipt = await SupplyChain.methods.addRetailer(wallet, name, license).send({ from: currentaccount });
                // Handle successful registration
                console.log("Retailer registered:", receipt);
                // Optionally, provide feedback to the user (e.g., show a success message)
                window.location.reload();
            };
            
        

        return (
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 h-full">
                        <h1 className="text-6xl text-center font-bold text-white p-5 mb-4">Register Stakeholders</h1>
                        <div className="flex">
                                <div className="w-1/2  text-white">
                                        <div className="p-16 drop-shadow-xl">
                                                <label className="p-8 text-4xl font-bold" htmlFor="name">Company Name</label>
                                                <input 
                                                        className="text-3xl border border-black-300 rounded-md p-2"
                                                        id="name"
                                                        type="text"
                                                        onChange={handleName}
                                                        placeholder="Name"
                                                        required
                                                />
                                        </div>
                                        <div className="p-16 drop-shadow-xl">
                                                <label className="p-8 text-4xl font-bold" htmlFor="wallet">Wallet address</label>
                                                <input 
                                                        className="text-3xl border border-black-300 rounded-md p-2"
                                                        id="wallet"
                                                        type="text"
                                                        onChange={handleWallet}
                                                        placeholder="Wallet address"
                                                        required
                                                />
                                        </div>
                                </div>
                        
                                <div className="w-1/2  text-white">
                                        <div className="p-16 drop-shadow-xl">
                                                <label className="p-8 text-4xl font-bold" htmlFor="industry">Stakeholder</label>
                                                <select 
                                                        className="text-3xl border border-black-300 rounded-md p-2"
                                                        onChange={handleIndustry}
                                                        required
                                                >
                                                        <option value="">Select an option</option>
                                                        <option value="r">Raw Material Supplier</option>
                                                        <option value="m">Manufacturer</option>
                                                        <option value="d">Distributer</option>
                                                        <option value="re">Retailer</option>
                                                </select>
                                        </div>
                                        <div className="p-16 drop-shadow-xl">
                                                <label className="p-8 text-4xl font-bold" htmlFor="license">License ID</label>
                                                <input 
                                                        className="text-3xl border border-black-300 rounded-md p-2"
                                                        id="license"
                                                        type="text"
                                                        onChange={handleLicense}
                                                        placeholder="License ID"
                                                        required
                                                />
                                        </div>
                                </div>
                        </div>
                        <button className='bg-teal-800 hover:bg-teal-700 text-white px-6 py-3 rounded-md mb-2 mt-2 hover:bg-green-300 hover:text-white transition-all duration-300 text-3xl font-bold' onClick={handleRegistration}>Register</button>
                        <div className="my-8" >
                                <h4 className="text-2xl font-bold mb-2 text-white">Raw Material Suppliers:</h4>
                                <table className="w-full table-auto border-collapse border border-gray-200">
                                <thead>
                                        <tr className="bg-gray-100">
                                        <th className="border border-gray-200 px-4 py-2">Name</th>
                                        <th className="border border-gray-200 px-4 py-2">License ID</th>
                                        <th className="border border-gray-200 px-4 py-2">Ethereum Address</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {RMS && Object.keys(RMS).map((key) => (
                                        <tr key={key} className="bg text-white">
                                                <td className="border border-gray-200 px-4 py-2">{RMS[key].name}</td>
                                                <td className="border border-gray-200 px-4 py-2">{RMS[key].place}</td>
                                                <td className="border border-gray-200 px-4 py-2">{RMS[key].addr}</td>
                                        </tr>
                                        ))}
                                </tbody>
                                </table>
                        </div>

                        {/* Manufacturers table */}
                        <div className="my-8">
                                <h4 className="text-2xl font-bold mb-2 text-white">Manufacturers:</h4>
                                <table className="w-full table-auto border-collapse border border-gray-200">
                                <thead>
                                        <tr className="bg-gray-100">
                                        <th className="border border-gray-200 px-4 py-2">Name</th>
                                        <th className="border border-gray-200 px-4 py-2">License ID</th>
                                        <th className="border border-gray-200 px-4 py-2">Ethereum Address</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {MAN && Object.keys(MAN).map((key) => (
                                        <tr key={key} className="bg text-white">
                                                <td className="border border-gray-200 px-4 py-2">{MAN[key].name}</td>
                                                <td className="border border-gray-200 px-4 py-2">{MAN[key].place}</td>
                                                <td className="border border-gray-200 px-4 py-2">{MAN[key].addr}</td>
                                        </tr>
                                        ))}
                                </tbody>
                                </table>
                        </div>
                        <div className="my-8">
                                <h4 className="text-2xl font-bold mb-2 text-white">Distributors:</h4>
                                <table className="w-full table-auto border-collapse border border-gray-200">
                                <thead>
                                        <tr className="bg-gray-100">
                                        <th className="border border-gray-200 px-4 py-2">Name</th>
                                        <th className="border border-gray-200 px-4 py-2">License ID</th>
                                        <th className="border border-gray-200 px-4 py-2">Ethereum Address</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {DIS && Object.keys(DIS).map((key) => (
                                        <tr key={key} className="bg text-white">
                                                <td className="border border-gray-200 px-4 py-2">{DIS[key].name}</td>
                                                <td className="border border-gray-200 px-4 py-2">{DIS[key].place}</td>
                                                <td className="border border-gray-200 px-4 py-2">{DIS[key].addr}</td>
                                        </tr>
                                        ))}
                                </tbody>
                                </table>
                        </div>

                        {/* Retailers table */}
                        <div className="my-8">
                                <h4 className="text-2xl font-semibold mb-2 text-white">Retailers:</h4>
                                <table className="w-full table-auto border-collapse border border-gray-200">
                                <thead>
                                        <tr className="bg-gray-100">
                                        <th className="border border-gray-200 px-4 py-2">Name</th>
                                        <th className="border border-gray-200 px-4 py-2">License ID</th>
                                        <th className="border border-gray-200 px-4 py-2">Ethereum Address</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {RET && Object.keys(RET).map((key) => (
                                        <tr key={key} className="bg text-white">
                                                <td className="border border-gray-200 px-4 py-2">{RET[key].name}</td>
                                                <td className="border border-gray-200 px-4 py-2">{RET[key].place}</td>
                                                <td className="border border-gray-200 px-4 py-2">{RET[key].addr}</td>
                                        </tr>
                                        ))}
                                </tbody>
                                </table>
                        </div>
                </div>
        );
}

export default Register;