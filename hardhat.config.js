/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  etherscan: {
    apiKey:process.env.API_KEY
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
   
      accounts:[process.env.SEPOLIA_PRIVATE_KEY]
    },
    
  },
  sourcify: {
  
    enabled: true
  }
 
}
