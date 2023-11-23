// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, AccessControl, Ownable {
    bytes32 public constant SPECIAL_ROLE = keccak256("NOT_ALLOWED");

    uint256 public ETH;

    constructor(address admin) ERC20("MyToken", "RM") Ownable(admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        ETH = (10**decimals()) / 10;
    }

    function NotAllowMinter(address account) external onlyOwner {
        _grantRole(SPECIAL_ROLE, account);
    }

    function mint(uint256 amount) external payable {
        require(!hasRole(SPECIAL_ROLE, _msgSender()),"Not allowed to mint");

        require(amount > 0, "Token value should be greater than 0");
        require(msg.value == amount * ETH, "Incorrect ETH amount");

          address to = _msgSender();
          uint256 totalSupply = amount * (10**decimals());

         _mint(to, totalSupply);

        uint256 reduceTokenWithDecimals=(( totalSupply* 10) / 100);
         
       

        _transfer(to, owner(), reduceTokenWithDecimals);
       
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");

        payable(owner()).transfer(balance);
    }
}
