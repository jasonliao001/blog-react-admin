import React, { useState } from 'react';
import { Card, Form, Row, Col, Input, Button, Table, Divider, Modal } from 'antd';
import './useradmin.module.css';
// form config
const formEnumState = [
  {
    label: '用户名',
    placeholder: '请输入用户名',
    key: 'username',
    value: ''
  },
  {
    label: '手机号',
    placeholder: '请输入手机号',
    key: 'phone',
    value: ''
  }
];
//  table data
const data = [
  {
    key: '1',
    username: 'John Brown',
    phone: 32,
    email: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    username: 'John Brown',
    phone: 32,
    email: 'New York No. 1 Lake Park'
  },
  {
    key: '3',
    username: 'John Brown',
    phone: 32,
    email: 'New York No. 1 Lake Park'
  }
];
// table config
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">修改 </a>
        <Divider type="vertical" />
        <a href="javascript:;">删除</a>
      </span>
    )
  }
];
// modal components
const ModalForm = Form.create({
  name: 'modal-form',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value
      }),
      phone: Form.createFormField({
        ...props.phone,
        value: props.phone.value
      })
    };
  },
  onValuesChange(_, values) {
    // console.log(values);
  }
})(props => {
  const [modalformEnum] = useState(formEnumState);
  const getFields = () => {
    const { getFieldDecorator } = props.form;
    const children = [];
    for (let i = 0; i < 2; i++) {
      children.push(
        <Col key={i}>
          <Form.Item label={`${modalformEnum[i].label}`}>{getFieldDecorator(`${modalformEnum[i].key}`, {})(<Input placeholder={`${modalformEnum[i].placeholder}`} />)}</Form.Item>
        </Col>
      );
    }
    return children;
  };
  const handleSearch = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };
  return (
    <Form className="ant-advanced-search-form">
      <Row gutter={24}>{getFields()}</Row>
    </Form>
  );
});
// form components
const CustomizedForm = Form.create({
  name: 'useradmin-search',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value
      }),
      phone: Form.createFormField({
        ...props.phone,
        value: props.phone.value
      })
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  }
})(props => {
  const [modalConfig, setModalConfig] = useState({
    title: '新建用户',
    visible: false,
    confirmLoading: false,
    cancelText: '取消'
  });
  const [formEnum] = useState(formEnumState);
  const showModal = () => {
    setModalConfig(modalConfig => ({ ...modalConfig, ...{ visible: true } }));
  };
  const handleOk = () => {
    // console.log(fields);
    console.log('fields :', fields);
    setModalConfig(modalConfig => ({ ...modalConfig, ...{ confirmLoading: true } }));
    setTimeout(() => {
      setModalConfig(modalConfig => ({ ...modalConfig, ...{ visible: false, confirmLoading: false } }));
    }, 2000);
  };
  const handleCancel = () => {
    setModalConfig(modalConfig => ({ ...modalConfig, ...{ visible: false } }));
  };
  const handleSearch = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };
  const handleReset = () => {
    props.form.resetFields();
  };
  const getFields = () => {
    const { getFieldDecorator } = props.form;
    const children = [];
    for (let i = 0; i < 2; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item label={`${formEnum[i].label}`}>{getFieldDecorator(`${formEnum[i].key}`, {})(<Input placeholder={`${formEnum[i].placeholder}`} />)}</Form.Item>
        </Col>
      );
    }
    return children;
  };
  const [fields, setFields] = useState({
    username: {
      value: ''
    },
    phone: {
      value: ''
    }
  });
  const handleFormChange = changedFields => {
    setFields(fields => {
      return { ...fields, ...changedFields };
    });
  };
  return (
    <>
      <Form className="ant-advanced-search-form" onSubmit={handleSearch} layout="inline">
        <Row gutter={24}>
          {getFields()}
          <Col span={8} key={1} offset={16} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={showModal}>
              新建
            </Button>
            <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal title="Title" visible={modalConfig.visible} onOk={handleOk} confirmLoading={modalConfig.confirmLoading} onCancel={handleCancel}>
        <ModalForm {...fields} onChange={handleFormChange} />
      </Modal>
    </>
  );
});
//  user adminComponent
const useradminComponent = props => {
  const [fields, setFields] = useState({
    username: {
      value: ''
    },
    phone: {
      value: ''
    }
  });
  const handleFormChange = changedFields => {
    setFields(fields => {
      return { ...fields, ...changedFields };
    });
  };

  return (
    <Card bordered={false}>
      <CustomizedForm {...fields} onChange={handleFormChange} />
      <p>
        数据绑定{fields.username.value}
        {fields.phone.value}
      </p>
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default useradminComponent;
