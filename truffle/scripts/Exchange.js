/*
  Try `truffle exec scripts/increment.js`, you should `truffle migrate` first.

  Learn more about Truffle external scripts: 
  https://trufflesuite.com/docs/truffle/getting-started/writing-external-scripts
*/

const Exchange = artifacts.require("Exchange");
const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'
const toWei = number => web3.utils.toWei(number.toString(), 'ether')
const fromWei = number => web3.utils.fromWei(number.toString(), 'ether')
module.exports = async function (callback) {
  const exchange = await Exchange.deployed();
  const accounts = await web3.eth.getAccounts()
  await exchange.depositEther({
    from:accounts[0],
    value:toWei(10)
  })
  const acc0Balance = await exchange.tokens(ETHER_ADDRESS,accounts[0])
  console.log(fromWei(acc0Balance))
  callback();
};
