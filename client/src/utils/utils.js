import Web3 from "web3";
export const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'
export const toWei = (number, unit = 'ether') => Web3.utils.toWei(number.toString(),unit)
export const fromWei = number => Web3.utils.fromWei(number.toString(),"ether")


export const hashLength = (hash, length = 8) => {
  if(typeof hash !== 'string') return hash
  if(length < 8) return hash
  if(hash.length <= length) return hash

  return `${hash.substring(0, Math.floor(length / 2))}...${hash.substring(hash.length - Math.ceil(length / 2))}`
}