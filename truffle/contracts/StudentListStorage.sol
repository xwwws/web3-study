// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma abicoder v2;
contract StudentListStorage {
  constructor(){
  }

  uint age;
  string name;

  struct Student {
    uint id;
    string name;
    uint age;
  }
  Student[] public StudentList;



  function addList(string memory _name, uint _age) public returns(uint){
    uint count = StudentList.length;
    StudentList.push(Student(count + 1,_name, _age));
    return StudentList.length;
  }

  function getStudents() public view returns (Student[] memory) {
    Student[] memory list  = StudentList;
    return list;
  }
}
