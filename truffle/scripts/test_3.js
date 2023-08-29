/*
  Try `truffle exec scripts/increment.js`, you should `truffle migrate` first.

  Learn more about Truffle external scripts: 
  https://trufflesuite.com/docs/truffle/getting-started/writing-external-scripts
*/

const StudentListStorage = artifacts.require("StudentListStorage");

module.exports = async function (callback) {
  const studentListStorage = await StudentListStorage.deployed();
  await studentListStorage.addList('小明',12)
  await studentListStorage.addList('小红',12)
  await studentListStorage.addList('小张',12)
  const res = await studentListStorage.getStudents()
  console.log(res)
  callback();
};
