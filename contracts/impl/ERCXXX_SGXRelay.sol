pragma solidity ^0.4.24;

/// @title ERCXXX ReferenceToken Contract
/// @author Dominik Harz, Panayiotis Panayiotou
/// @dev This token contract's goal is to give an example implementation
///  of ERCXXX with ERC20 compatibility.
///  This contract does not define any standard, but can be taken as a reference
///  implementation in case of any ambiguity into the standard
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../ERCXXX_Base_Interface.sol";
import "./ERCXXX_SGX.sol";



contract ERCXXX_SGXRelay is ERCXXX_SGXRelay_Interface, ERCXXX_SGX {
    using SafeMath for uint256;

    // #####################
    // CONTRACT VARIABLES
    // #####################

    address relayer;

    // #####################
    // CONSTRUCTOR
    // #####################
    constructor(string _name, string _symbol, uint256 _granularity) public {
        require(_granularity >= 1);

        name = _name;
        symbol = _symbol;
        granularity = _granularity;

        totalSupply = 0;
        // TODO: value
        contestationPeriod = 1;
        // TODO: value
        graceRedeemPeriod = 1;
        // Collateral required since we don't trust the issuer
        minimumCollateral = 1;
        // Minimum Ether to be commited by user for issuing of tokens
        minimumCollateralCommitment = 1;
        issuerTokenSupply = 0;
        issuerCommitedTokens = 0;
    }

    function authorizeRelayer(address toRegister, bytes data) public {
        /* TODO: who authroizes this? */
        // Do we need the data argument?
        // Does the relayer need to provide collateral?
        require(relayer == address(0));

        relayer = toRegister;
        emit AuthroizeRelayer(msg.sender, 1, data);
    }

    function revokeRelayer(address toUnlist, bytes data) public {
        require(msg.sender == relayer);

        realyer = address(0);
        emit RevokeRelayer(msg.sender, 1, data);
    }

    function issue(address receiver, uint256 amount, bytes data) public {
        /* This method can only be called by an Issuer */
        require(msg.sender == issuer);

        balances[receiver] += amount;
        emit Issue(msg.sender, receiver, amount, data);
    }

    function redeem(address redeemer, uint256 amount, bytes data) public {
        /* This method can only be called by an Issuer */
        require(msg.sender == issuer);

        /* The redeemer must have enough tokens to burn */
        require(balances[redeemer] >= amount);

        balances[redeemer] -= amount;
        emit Redeem(redeemer, msg.sender, amount, data);
    } 

}