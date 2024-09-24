import { Divider, Tag, Tree } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import React from 'react';

const GeneratedTeams = (props) => {
  const { generatedTeams } = props;

  const formattedData = generatedTeams.map((team) => ({
    title: team.teamName,
    key: team.teamName,
    children: team.players.map((player) => ({
      title: `${player.name} (Skill: ${player.skill})`,
      key: player.id.toString(),
    })),
  }));

  function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  if (generatedTeams?.length === 0) {
    return null;
  }

  return (
    <div className="generated_teams">
      <Paragraph className="generated_teams_title">Generated teams</Paragraph>
      <div className="generated_teams_wrapper">
        {generatedTeams?.map((team) => {
          return (
            <div key={team.teamName} className="team-container">
              <div className="team-name">
                <Tag color="black">Team Name: {team?.teamName}</Tag>
              </div>

              <div className="players-list">
                {team.players?.map((player) => (
                  <Tag key={player.id} color={getRandomHexColor()}>
                    {player.name} ({player.skill})
                  </Tag>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneratedTeams;
