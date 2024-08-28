import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

const JobManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/jobs/');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/jobs/${id}/delete/`);
      fetchJobs(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };
  
  // Function to update a job with given values
  const handleUpdate = async (values) => {
    try {
      await axios.put(`http://localhost:8001/api/jobs/${currentJob.id}/update/`, values);
      fetchJobs(); // Refresh the list after update
      setIsModalVisible(false); // Close the modal
      setCurrentJob(null); // Clear the current job
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const showModal = (job) => {
    setCurrentJob(job);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentJob(null);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record)}>Update</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
      <Modal
        title="Update Job"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={currentJob}
          onFinish={handleUpdate}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please input the location!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="salary"
            label="Salary"
            rules={[{ required: true, message: 'Please input the salary!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company_name"
            label="Company Name"
            rules={[{ required: true, message: 'Please input the company name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobManagement;
