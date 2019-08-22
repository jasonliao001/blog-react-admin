import React, { useState, useReducer, useContext, createContext } from 'react';
import { Card, Form, Row, Col, Input, Button, Table, Divider, Modal, message } from 'antd';
import { connect } from 'react-redux';
import './useradmin.module.css';
import { AddRowData, DeleteRowData, UpdateRowData } from './actions';
import reducer from './reducer';
// form config
const formEnumState = [
  {
    label: '用户名',
    placeholder: '请输入用户名查询',
    key: 'username',
    value: ''
  },
  {
    label: '手机号',
    placeholder: '请输入手机号查询',
    key: 'phone',
    value: ''
  }
  // {
  //   label: '邮箱',
  //   placeholder: '请输入邮箱查询',
  //   key: 'email',
  //   value: ''
  // }
];

const initialState = [];

// table config

// 弹出modal中的form表单
const ModalFormWrap = props => {
  const [modalformEnum] = useState(formEnumState);
  const THeme = useContext(ThemeContext);
  console.log('ModalFormWrap', THeme);
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
  return (
    <Form className="ant-advanced-search-form">
      <Row gutter={24}>{getFields()}</Row>
    </Form>
  );
};

// 弹出modal 更改
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
  }
})(ModalFormWrap);
// 查询表单
const SearchFormWrap = props => {
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
      render: (text, record, i) => (
        <span>
          <a href="javascript:;" onClick={updateRow.bind(this, text, record, i)}>
            修改
          </a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={deleteRow.bind(this, text, record, i)}>
            删除
          </a>
        </span>
      )
    }
  ];
  const [tableData, dispatch] = useReducer(reducer, initialState);
  const [modalConfig, setModalConfig] = useState({
    title: '新建用户',
    visible: false,
    confirmLoading: false,
    cancelText: '取消',
    okText: '确定',
    type: 0
  });
  const [formEnum] = useState(formEnumState);
  const [fields, setFields] = useState({
    username: {
      value: ''
    },
    phone: {
      value: ''
    }
  });
  const [rowIndex, SetrowIndex] = useState(formEnumState);
  const updateRow = (text, record, i) => {
    console.log(tableData, 'tableData');

    setFields(() => ({
      username: {
        value: tableData[i].username
      },
      phone: {
        value: tableData[i].phone
      }
    }));
    setModalConfig(() => ({ ...modalConfig, ...{ title: '编辑', type: 1 } }));
    showModal();
    SetrowIndex(({ rowIndex }) => (rowIndex = i));
  };

  const deleteRow = (text, record, i) => {
    Modal.confirm({
      title: '警告',
      content: `您确定要删除${record.username}?`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch(DeleteRowData({ key: i }));
        setTimeout(() => message.success('删除成功'), 300);
      }
    });
  };
  const handleFormChange = changedFields => {
    setFields(fields => {
      return { ...fields, ...changedFields };
    });
  };
  const addModal = () => {
    setModalConfig(() => ({ ...modalConfig, ...{ title: '新建用户', type: 0 } }));
    showModal();
  };
  const showModal = () => {
    setModalConfig(modalConfig => ({ ...modalConfig, ...{ visible: true } }));
  };
  const handleOk = () => {
    setModalConfig(modalConfig => ({ ...modalConfig, ...{ confirmLoading: true } }));
    setTimeout(() => {
      setModalConfig(modalConfig => ({ ...modalConfig, ...{ visible: false, confirmLoading: false } }));
      if (modalConfig.type) {
        dispatch(UpdateRowData({ username: fields.username.value, phone: fields.phone.value, i: rowIndex }));
      } else {
        dispatch(AddRowData({ username: fields.username.value, phone: fields.phone.value }));
      }

      handleModalFormReset();
      setFields(fields => ({
        username: {
          value: ''
        },
        phone: {
          value: ''
        }
      }));
    }, 2000);
  };
  const handleCancel = () => {
    setModalConfig(modalConfig => ({ ...modalConfig, ...{ visible: false } }));
  };

  const handleSearch = e => {
    e.preventDefault();
  };
  const handleReset = () => {
    props.form.resetFields();
  };
  const handleModalFormReset = props => {
    // props.form.resetFields();
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

  return (
    <>
      <Form className="ant-advanced-search-form" onSubmit={handleSearch} layout="inline">
        <Row gutter={24}>
          {getFields()}
          <Col span={8} key={1} offset={16} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={addModal}>
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
      <Table columns={columns} style={{ marginTop: '20px' }} dataSource={tableData} bordered />
      <Modal onOk={handleOk} {...modalConfig} visible={modalConfig.visible} confirmLoading={modalConfig.confirmLoading} onCancel={handleCancel}>
        <ModalForm {...fields} onChange={handleFormChange} />
      </Modal>
    </>
  );
};

// 查询表单
const SearchForm = Form.create({
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
  }
})(SearchFormWrap);
const ThemeContext = React.createContext('light');
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
      <SearchForm {...fields} onChange={handleFormChange} />
      <p style={{ marginTop: '20px' }}>
        表单数据双向绑定{fields.username.value}
        {fields.phone.value}
      </p>
    </Card>
  );
};

const mapStateToProps = state => ({ tableData: state.useradmin });
const mapDispatchToProps = (dispatch, props) => ({
  add: () => dispatch(AddRowData({ username: props.name })),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(useradminComponent);
