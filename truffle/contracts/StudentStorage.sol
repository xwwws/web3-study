// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract StudentStorage {

  // storeage 状态变量 占用链上空间 消耗gas多
  uint age;
  string name;
  // 内存中使用  消耗gas少
  // memory 可以修改
  // calldata 不能修改

//  public 外部合约内部合约都可以调用
//  external 外部函数  内部无法调用
//  internal 只能从当前合约和派生合约中访问  外部无法访问 可接受内部类型的参数
//  private 私有函数 内部函数  派生合约中不可用
  function setStudent(string memory _name, uint _age) public {
    name = _name;
    age = _age;
  }

//  view 视图函数 只访问 不修改
//  pure 纯函数 不访问 不修改
  function getStudent() public view returns (string memory, uint) {
    return (name, age);
  }
}
