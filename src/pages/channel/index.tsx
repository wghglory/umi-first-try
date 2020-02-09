import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Table } from 'antd';
import Button from 'antd/es/button/button';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city',
  },
];

interface ChannelProps {
  data: any;
  getChannelData: () => void;
  getChannelDataBySearch: Function;
}

export default connect(
  ({ channel }: any) => {
    return {
      ...channel,
    };
  },
  {
    getChannelData: () => {
      return { type: 'channel/getChannelData' };
    },
    getChannelDataBySearch: (search: any) => {
      return { type: 'channel/getChannelDataBySearch', payload: search };
    },
  },
)(
  class Channel extends Component<ChannelProps> {
    constructor(props: ChannelProps) {
      super(props);
      this.state = {
        name: '',
      };
    }
    componentDidMount() {
      this.props.getChannelData();
    }
    setFormValue = (name: string, event: any) => {
      this.setState({
        [name]: event.target.value,
      });
    };
    search = () => {
      const tem = { ...this.state };
      this.props.getChannelDataBySearch(tem);
    };
    render() {
      const { data }: any = this.props;
      const { name }: any = this.state;
      return (
        <div className={styles.normal}>
          <PageHeaderWrapper>
            <Card className={styles.formCard}>
              <Form>
                <Form.Item label="姓名">
                  <Input value={name} onChange={event => this.setFormValue('name', event)} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.search}>
                    搜索
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <Card>
              <Table dataSource={data} columns={columns} rowKey={record => record.id} />
            </Card>
          </PageHeaderWrapper>
        </div>
      );
    }
  },
);
