import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Input, Modal, Select} from "antd";
import {useEth} from "../../../contexts/EthContext";
import {ETH_ADDRESS} from "../../../utils/utils";


const CreateTransaction = (props) => {
  const {state} = useEth();
  const [tokens, setTokens] = useState()
  const [form] = Form.useForm()
  const {isOpen,onCancel,onSubmit} = props
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if(state.contract.BDTToken) {
      setTokens([
        {label: 'ETH', value: ETH_ADDRESS},
        {label: 'BDT', value: state.contract.BDTToken.options.address},
      ])
    }
  }, [state])
  useEffect(() => {
    setIsLoading(false)
  }, [isOpen]);
  const handleSubmit = async () => {
    setIsLoading(true)
    const values = await form.validateFields()
    onSubmit(values)

  }
  return (
    <>
      <Modal
        open={isOpen}
        title={'发起交易'}
        onCancel={onCancel}
        footer={[
          <Button key={'01'} type={"primary"} loading={isLoading} onClick={handleSubmit}>提交</Button>
        ]}
      >
        <Form form={form}>
          <Form.Item label={'tokenPay'} name={'tokenPay'}>
            <Select options={tokens}></Select>
          </Form.Item>
          <Form.Item label={'amountPay'} name={'amountPay'}>
            <Input/>
          </Form.Item>
          <Form.Item label={'tokenGet'} name={'tokenGet'}>
            <Select options={tokens}></Select>
          </Form.Item>
          <Form.Item label={'amountGet'} name={'amountGet'}>
            <Input/>
          </Form.Item>
        </Form>

      </Modal>
    </>
  );
}
CreateTransaction.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};


export default CreateTransaction;