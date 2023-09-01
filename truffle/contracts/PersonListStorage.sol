// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract PersonListStorage {
  struct Person {
    uint id;
    uint age;
    string name;
    address account;
  }
  Person [] public PersonList;
  function setPerson(string memory _name, uint _age) public returns (uint) {
    PersonList.push(Person(PersonList.length + 1, _age,_name, msg.sender));
    return PersonList.length;
  }

  function getPersonList() public view returns (Person[] memory) {
    Person[] memory list = PersonList;
    return list;
  }
}
