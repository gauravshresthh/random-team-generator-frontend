import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Rate, notification } from 'antd';
import Header from '../components/Header';
import PlayerManagement from './PlayerManagement';
import TeamManagement from './TeamManagement';
import axios from 'axios';
import { BASE_URL } from '../configs/baseUrl';
import GeneratedTeams from './GeneratedTeams';
import TreeView from '../components/TreeView';

const Home = () => {
  const [openAddPlayerModal, setOpenAddPlayerModal] = useState(false);
  const [openAddTeamModal, setOpenAddTeamModal] = useState(false);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerSkill, setPlayerSkill] = useState(3);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [teamName, setTeamName] = useState('');
  const [generatedTeams, setGeneratedTeams] = useState([]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/players`);
      const playersWithKeys = response.data.map((player, index) => ({
        ...player,
        key: index.toString(),
      }));
      setPlayers(playersWithKeys);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/teams`);
      const teamsWithKeys = response.data.map((team, index) => ({
        ...team,
        key: index.toString(),
      }));
      setTeams(teamsWithKeys);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  const renderMessage = (type) => {
    if (type === 'success') {
      return 'Operation executed successfully';
    }
    if (type === 'error') {
      return 'Operation failed';
    }
  };
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: renderMessage(type),
    });
  };

  const handleAddPlayerOkClick = async () => {
    setConfirmLoading(true);

    if (playerName && playerSkill) {
      await addPlayer({
        name: playerName,
        skill: playerSkill,
      });
    }

    setConfirmLoading(false);
    setOpenAddPlayerModal(false);
  };

  const handleAddTeamOkClick = async () => {
    setConfirmLoading(true);
    if (teamName) {
      await addTeam({
        name: teamName,
      });
    }
    setConfirmLoading(false);
    setOpenAddTeamModal(false);
  };

  const addPlayer = async (payload) => {
    try {
      await axios.post(`${BASE_URL}/player`, payload);
      openNotificationWithIcon('success');
      fetchPlayers();
    } catch (error) {
      openNotificationWithIcon('error');
      console.error(error);
    }
  };

  const addTeam = async (payload) => {
    try {
      await axios.post(`${BASE_URL}/team`, payload);
      openNotificationWithIcon('success');
      fetchTeams();
    } catch (error) {
      openNotificationWithIcon('error');
      console.error(error);
    }
  };

  const handleCancelAddPlayerModal = () => {
    setOpenAddPlayerModal(false);
  };

  const showPlayerAddModal = () => {
    setOpenAddPlayerModal(true);
  };

  const showTeamAddModal = () => {
    setOpenAddTeamModal(true);
  };

  const handleCancelAddTeamModal = () => {
    setOpenAddTeamModal(false);
  };

  const handleGenerateTeams = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/generate-teams`);
      setGeneratedTeams(response.data.teams);
      openNotificationWithIcon('success');
      fetchPlayers();
    } catch (error) {
      openNotificationWithIcon('error');
      console.error(error);
    }
  };

  return (
    <div className="home">
      {contextHolder}
      <Header />
      <div className="button_container">
        <Button type="primary" onClick={showPlayerAddModal}>
          Add a player
        </Button>
        <Button type="primary" onClick={showTeamAddModal}>
          Add a team
        </Button>
        <Button type="primary" onClick={handleGenerateTeams}>
          Generate teams
        </Button>
      </div>

      <GeneratedTeams generatedTeams={generatedTeams} />
      <PlayerManagement
        players={players}
        openNotificationWithIcon={openNotificationWithIcon}
        fetchPlayers={fetchPlayers}
      />
      <TeamManagement
        teams={teams}
        openNotificationWithIcon={openNotificationWithIcon}
        fetchTeams={fetchTeams}
      />

      <Modal
        title="Add a player"
        open={openAddPlayerModal}
        onOk={handleAddPlayerOkClick}
        confirmLoading={confirmLoading}
        onCancel={handleCancelAddPlayerModal}
      >
        <Input
          placeholder="Player name"
          style={{ marginTop: '2rem' }}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <div className="skills">Skill level</div>
        <Rate value={playerSkill} onChange={(value) => setPlayerSkill(value)} />
      </Modal>

      <Modal
        title="Add a team"
        open={openAddTeamModal}
        onOk={handleAddTeamOkClick}
        confirmLoading={confirmLoading}
        onCancel={handleCancelAddTeamModal}
      >
        <Input
          placeholder="Team name"
          style={{ marginTop: '2rem' }}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </Modal>

      {/* <TreeView /> */}
    </div>
  );
};

export default Home;
