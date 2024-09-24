import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import axios from 'axios';
import { BASE_URL } from '../configs/baseUrl'; // Adjust import as needed

const { TreeNode } = Tree;

const TreeView = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/generate-teams`);
        const teams = response.data.teams;

        const formattedData = teams.map((team) => ({
          title: team.teamName,
          key: team.teamName,
          children: team.players.map((player) => ({
            title: `${player.name} (Skill: ${player.skill})`,
            key: player.id.toString(),
          })),
        }));

        setTreeData(formattedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="tree-view">
      <Tree showLine defaultExpandAll treeData={treeData} />
    </div>
  );
};

export default TreeView;
