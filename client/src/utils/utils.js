import Web3 from "web3";

export const toWei = number => Web3.utils.toWei(number.toString(),"ether")
export const fromWei = number => Web3.utils.fromWei(number.toString(),"ether")