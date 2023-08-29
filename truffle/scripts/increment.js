/*
  Try `truffle exec scripts/increment.js`, you should `truffle migrate` first.

  Learn more about Truffle external scripts: 
  https://trufflesuite.com/docs/truffle/getting-started/writing-external-scripts
*/

const StudentStorage = artifacts.require("StudentStorage");

module.exports = async function (callback) {
  const studentStorage = await StudentStorage.deployed();
  await studentStorage.setStudent('wangzhen',18)
  const res = await studentStorage.getStudent()
  console.log(res)
  callback();
};
