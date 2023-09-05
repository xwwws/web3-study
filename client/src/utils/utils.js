import Web3 from "web3";

export const toWei = number => Web3.utils.toWei(number.toString(),"ether")
export const fromWei = number => Web3.utils.fromWei(number.toString(),"ether")


export const hashLength = (hash, length = 8) => {
  if(typeof hash !== 'string') return hash
  if(length < 8) return hash
  if(hash.length <= length) return hash

  return `${hash.substring(0, Math.floor(length / 2))}...${hash.substring(hash.length - Math.ceil(length / 2))}`
}