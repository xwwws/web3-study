// SPDX-License-Identifier: GPL-3.0
// 源码遵循协议， MIT...
pragma solidity >=0.4.22 <0.9.0;
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./BDTToken.sol";
contract Exchange {
    using SafeMath for uint256;
    // 收费账号地址
    address public feeAccount;
    // 费率
    uint public feePercent;

    address constant ETHER = address(0);

    mapping(address=> mapping(address=>uint256)) public tokens;

    event Deposit(address token, address user, uint amount, uint balance);

    constructor(address _feeAccount,uint256 _feePercent){

        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    //存以太币
    function depositEther() payable public{
        //msg.sender
        //msg.value
        tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].add(msg.value);
        emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
    }
    //存其他货币
    function depositToken(address _token,uint256 _amount) public{
        require(_token!=ETHER);
        //调用某个方法强行从你账户往当前交易所账户转钱
        require(BDTToken(_token).transferFrom(msg.sender,address(this),_amount));
        tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount);

        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }
}