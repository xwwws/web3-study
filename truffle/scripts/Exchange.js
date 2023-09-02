/*
  Try `truffle exec scripts/increment.js`, you should `truffle migrate` first.

  Learn more about Truffle external scripts: 
  https://trufflesuite.com/docs/truffle/getting-started/writing-external-scripts
*/

const Exchange = artifacts.require("Exchange");
const BDTToken = artifacts.require("BDTToken");
const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'
const toWei = number => web3.utils.toWei(number.toString(), 'ether')
const fromWei = number => web3.utils.fromWei(number.toString(), 'ether')
module.exports = async function (callback) {
  const exchange = await Exchange.deployed();
  const BDT = await BDTToken.deployed();
  const accounts = await web3.eth.getAccounts()
  const acc0 = accounts[0]



// console.group('ETHER')

//   console.log('acc0 交易所中 user ETH,  余额：', fromWei(await exchange.tokens(ETHER_ADDRESS,acc0)))
//   await exchange.depositEther({
//     from:acc0,
//     value:toWei(10)
//   })
//   console.log('acc0 给交易所中存入 ETH 完成')

//   console.log('acc0 交易所中 user ETH,  余额：', fromWei(await exchange.tokens(ETHER_ADDRESS,acc0)))


//   await exchange.withDrawEther(toWei(10),{
//     from: acc0,
//   })
//   console.log('acc0 从交易所中提取 ETH 完成')


//   console.log('acc0 交易所中 user ETH,  余额：', fromWei(await exchange.tokens(ETHER_ADDRESS,acc0)))

// console.groupEnd('ETHER')

  console.group('token')
  await BDT.approve(exchange.address,toWei(100000),{
    from: acc0
  })
  console.log('授权额度', fromWei(await BDT.allowance(exchange.address, acc0)))

  await exchange.depositToken(BDT.address, toWei(100000),{
    from: acc0
  })
  const exchangeBDTBalance = await exchange.tokens(BDT.address, acc0,{from: acc0})
  console.log('交易所中BDT余额:', fromWei(exchangeBDTBalance))
  
  console.log('授权额度', fromWei(await BDT.allowance(exchange.address, acc0)))



  console.groupEnd('token')


















  callback();
};
