import { Modal, Table } from 'antd';

import React, { useState } from 'react';
import { BASE_URL } from '../configs/baseUrl';
import axios from 'axios';

const PlayerManagement = (props) => {
  const { players, openNotificationWithIcon, fetchPlayers } = props;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = async () => {
    try {
      if (deleteItemId) {
        await axios.delete(`${BASE_URL}/player/${deleteItemId}`);
        openNotificationWithIcon('success');
        fetchPlayers();
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
      title: 'Player id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Player Names',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Skill level',
      dataIndex: 'skill',
      key: 'skill',
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
    <>
      <div className="player_management_table">
        <Table dataSource={players} columns={columns} pagination={false} />
      </div>
      <Modal
        title="Are you sure you want to delete this data?"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      ></Modal>
    </>
  );
};

export default PlayerManagement;
