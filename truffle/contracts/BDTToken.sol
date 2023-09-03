// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract BDTToken {
    string public name = "BDToken";
    string public symbol = "BDT";

    uint public decimals = 18; // 1BDT = 10 decimals wei

    uint public totalSupply;

    // 用户余额
    mapping(address => uint) public balanceOf;

    // 用户授权给交易所余额
    mapping(address => mapping(address => uint)) public allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor() {
        totalSupply = 1000000 * (10 ** decimals);
        // 将所有代币给创始人
        balanceOf[msg.sender] = totalSupply;
    }

    // 转账
    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // 确保接收方是真实地址

        require(_to != address(0));
        _transfer(msg.sender, _to, _value);
        return true;
    }


    // 用户授权给交易所
    function approve(
        address _spender,
        uint256 _value
    ) public returns (bool success) {
        // msg.sender  当前网页登录账号
        // _spender 交易所合约地址
        require(_spender != address(0));
        require(balanceOf[msg.sender] > _value);
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // 交易所操作
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // msg.sender 交易所
        require(_to != address(0));
        require(_from != address(0));
        require(balanceOf[_from] >=  _value);
        require(allowance[_from][msg.sender] >=  _value);
        // 该用户给交易所授权的额度减少_value
        allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value;
        _transfer(_from, _to, _value);
        return true;
    }


    function _transfer(address _from, address _to, uint256 _value) internal {
        // 确保转账方有足够的token
        require(balanceOf[_from] >= _value);
        balanceOf[_from] = balanceOf[_from] - _value;
        balanceOf[_to] = balanceOf[_to] + _value;
        emit Transfer(_from, _to, _value);
    }
}
