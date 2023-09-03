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



  console.group('------------------------ETHER---------------------------')

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

console.groupEnd('ETHER')

  console.group('------------------------token---------------------------')
  const logBalance = async (acc) => {
    const walletBalance = [
      {
        name:'wallet BDT',
        balance: fromWei(await BDT.balanceOf(acc))
      },
      {
        name:'exchange BDT',
         balance: fromWei(await exchange.tokens(BDT.address, acc))
      }
    ]
    console.table(walletBalance,['name','balance'])
  }
  const logAlowance = async acc => {
    console.log('授权额度', fromWei(await BDT.allowance(acc0,exchange.address )))
  }
  console.group('-----存入--token-----')

  // 授权给交易所额度
  await BDT.approve(exchange.address,toWei(100),{
    from: acc0
  })
  await logAlowance(acc0)

  // 将BDT转移到交易所
  await exchange.depositToken(BDT.address, toWei(100),{
    from: acc0
  })

  await logBalance(acc0)
  console.groupEnd()


  console.group('-----提取--token-----')
  // 将交易所中的BDT转移到钱包（BDT）
  await exchange.withDrawToken(BDT.address, toWei(10),{
    from: acc0
  })
  await logBalance(acc0)

  console.groupEnd()


















  callback();
};
