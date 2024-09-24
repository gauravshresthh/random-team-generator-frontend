import { Modal, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../configs/baseUrl';

const TeamManagement = (props) => {
  const { teams, fetchTeams, openNotificationWithIcon } = props;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = async () => {
    try {
      if (deleteItemId) {
        await axios.delete(`${BASE_URL}/team/${deleteItemId}`);
        openNotificationWithIcon('success');
        fetchTeams();
      }
    } catch (error) {
      openNotificationWithIcon('error');
      console.error(error);
    }
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  const columns = [
    {
      title: 'Team Names',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      render: (value) => {
        return (
          <div className="actions_wrapper">
            <div>Edit</div>
            <div
              onClick={() => handleDeleteClick(value)}
              className="delete_button"
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table dataSource={teams} columns={columns} pagination={false} />
      <Modal
        title="Are you sure you want to delete this data?"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      ></Modal>
    </div>
  );
};

export default TeamManagement;
