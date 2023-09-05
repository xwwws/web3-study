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
module.exports = async function(callback) {
  const exchange = await Exchange.deployed();
  const BDT = await BDTToken.deployed();
  const accounts = await web3.eth.getAccounts()
  const acc0 = accounts[0]
  const acc1 = accounts[1]
  const feeAccount = '0xef292cee1fc47e2964be539060ad454d380e2a83'


  const logBalance = async (acc, index = 'acc0') => {
    console.group(`${ index }详情：`)
    console.log(acc)
    const walletBalance = [
      {
        name: 'wallet BDT',
        balance: fromWei(await BDT.balanceOf(acc))
      },
      {
        name: 'exchange BDT',
        balance: fromWei(await exchange.tokens(BDT.address, acc))
      },
      {
        name: 'exchange ETH',
        balance: fromWei(await exchange.tokens(ETHER_ADDRESS, acc))
      }
    ]
    console.table(walletBalance, ['name', 'balance'])
    console.groupEnd()
  }


  const logAllowance = async acc => {
    console.log('授权额度', fromWei(await BDT.allowance(acc0, exchange.address)))
  }


  async function etherFn(acc, accname) {
    console.group('-----etherFn-------')
    await exchange.depositEther({
      from: acc,
      value: toWei(1000)
    })


    // await exchange.withDrawEther(toWei(10), {
    //   from: acc,
    // })


    await logBalance(acc, accname)
    console.groupEnd()
  }

  // await etherFn(acc1, 'acc1')


  async function depositToken(acc,amount) {
    console.group('-----存入--token-----')
    // 授权给交易所额度
    await BDT.approve(exchange.address, toWei(10000), {
      from: acc0
    })
    await logAllowance(acc0)
    // 将BDT转移到交易所
    await exchange.depositToken(BDT.address, toWei(10000), {
      from: acc0
    })

    await logBalance(acc0)
    console.groupEnd()
  }

  await depositToken(acc0,1000)

  async function withDrawToken() {
    console.group('-----提取--token-----')
    // 将交易所中的BDT转移到钱包（BDT）
    await exchange.withDrawToken(BDT.address, toWei(10), {
      from: acc0
    })
    await logBalance(acc0)
    console.groupEnd()
  }


  async function startTrade() {
    console.group('--------------交易--------------');

    /**
     * 创建交易
     * acc1
     */
    await exchange.makeOrder(
      ETHER_ADDRESS,
      toWei(100),
      BDT.address,
      toWei(100),
      { from: acc0 }
    )

    console.groupEnd()
  }

  // await startTrade()
  const logTrade = async (index, type = 0) => {
    let tradeName = '';
    switch (type) {
      case 0:
        tradeName = 'orders';
        break;
      case 1:
        tradeName = 'orderCancel';
        break;
      case 2:
        tradeName = 'orderFill';
        break;
    }
    const res = await exchange[tradeName](index)
    console.log(res)
  }


  async function cancelTrade(id) {
    console.group('--------------cancelTrade--------------');
    await exchange.cancelOrder(id)
    const res = await exchange.orderCancel(id, { from: acc0 })
    console.log(res)
  }

  // await cancelTrade(1)

  async function endTrade(id) {
    await exchange.fillOrder(id, { from: acc1 })
  }

  // await endTrade(3)

  await logBalance(acc0, 'acc0')
  await logBalance(acc1, 'acc1')
  await logBalance(feeAccount, '收费账户')
  callback();
};
