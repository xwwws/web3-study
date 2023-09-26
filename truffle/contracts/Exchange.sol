// SPDX-License-Identifier: GPL-3.0
// 源码遵循协议， MIT...
pragma solidity >=0.8.0 <0.9.0;

import "./BDTToken.sol";

contract Exchange {
    address public feeAccount;

    uint256 public feePercent;


    address constant ETHER = address(0);

    mapping(address => mapping(address => uint256)) public tokens;

    event Deposit(address token, address user, uint amount, uint balance);
    event WithDraw(address token, address user, uint amount, uint balance);

    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    // 查询余额
    function balanceOf(
        address _token,
        address _account
    ) public view returns (uint256) {
        return tokens[_token][_account];
    }

    //存以太币
    function depositEther() public payable {
        tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender] + msg.value;
        emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
    }

    //存其他货币
    function depositToken(address _token, uint256 _amount) public {
        require(_token != address(0));
        require(
            BDTToken(_token).transferFrom(msg.sender, address(this), _amount)
        );
        tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;

        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    function withDrawEther(uint256 _amount) public {
        require(tokens[ETHER][msg.sender] >= _amount);
        tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender] - _amount;
        // payable  当前合约地址转到msg.sender
        payable(msg.sender).transfer(_amount);
        emit WithDraw(ETHER, msg.sender, _amount, tokens[ETHER][msg.sender]);
    }

    // 提取token
    function withDrawToken(address _token, uint256 _amount) public {
        require(_token != address(0));
        require(tokens[_token][msg.sender] > _amount);
        require(BDTToken(_token).transfer(msg.sender, _amount));
        tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;
        emit WithDraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    /**
		订单相关
	 */
    struct _Order {
        uint256 id;
        address user;
        address tokenGet;
        uint256 amountGet;
        address tokenPay;
        uint256 amountPay;
        uint256 timestamp;
    }

    mapping(uint256 => _Order) public orders;
    mapping(uint256 => bool) public orderCancel;
    mapping(uint256 => bool) public orderFill;
    uint256 public orderCount;

    event Order(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenPay,
        uint256 amountPay,
        uint256 timestamp
    );
    event Cancel(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenPay,
        uint256 amountPay,
        uint256 timestamp
    );
    event Trade(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenPay,
        uint256 amountPay,
        uint256 timestamp,
        uint fee
    );

    // makeOrder
    function makeOrder(
        address _tokenGet,
        uint256 _amountGet,
        address _tokenPay,
        uint256 _amountPay
    ) public {
        require(tokens[_tokenPay][msg.sender] > _amountPay);
        orderCount = orderCount + 1;
        orders[orderCount] = _Order(
            orderCount,
            msg.sender,
            _tokenGet,
            _amountGet,
            _tokenPay,
            _amountPay,
            block.timestamp
        );
        // 付费

        emit Order(
            orderCount,
            msg.sender,
            _tokenGet,
            _amountGet,
            _tokenPay,
            _amountPay,
            block.timestamp
        );
    }

    // cancelOrder
    function cancelOrder(uint256 _orderId) public {
        _Order memory curOrder = orders[_orderId];
        require(curOrder.id == _orderId);
        orderCancel[_orderId] = true;
        emit Cancel(
            curOrder.id,
            msg.sender,
            curOrder.tokenGet,
            curOrder.amountGet,
            curOrder.tokenPay,
            curOrder.amountPay,
            block.timestamp
        );
    }
    function payGas(
        address tokenAddress,
        address user,
        uint256 fee
    ) private returns (bool) {
        tokens[tokenAddress][feeAccount] =
            tokens[tokenAddress][feeAccount] +
            fee;
        tokens[tokenAddress][user] = tokens[tokenAddress][user] - fee;
        return true;
    }

    // fillOrder

    function fillOrder(uint256 _orderId) public {
        _Order memory curOrder = orders[_orderId];
        require(curOrder.id == _orderId);
        uint256 fee = curOrder.amountGet * feePercent / 100;
        require(
            tokens[curOrder.tokenGet][msg.sender] > (curOrder.amountGet + fee)
        );
        orderFill[_orderId] = true;
        // uint256 gas =
        // 账户余额更换  && 收取小费（填充订单的人付费）
        // 发起交易账户 余额处理
        tokens[curOrder.tokenPay][curOrder.user] =
            tokens[curOrder.tokenPay][curOrder.user] -
            curOrder.amountPay;
        tokens[curOrder.tokenGet][curOrder.user] =
            tokens[curOrder.tokenGet][curOrder.user] +
            curOrder.amountGet;

        // 填充交易账户 余额处理
        tokens[curOrder.tokenPay][msg.sender] =
            tokens[curOrder.tokenPay][msg.sender] +
            curOrder.amountPay;
        tokens[curOrder.tokenGet][msg.sender] =
            tokens[curOrder.tokenGet][msg.sender] -
            curOrder.amountGet;

        payGas(curOrder.tokenGet,msg.sender,fee);

        emit Trade(
            curOrder.id,
            curOrder.user,
            curOrder.tokenGet,
            curOrder.amountGet,
            curOrder.tokenPay,
            curOrder.amountPay,
            block.timestamp,
            fee
        );
    }
}
