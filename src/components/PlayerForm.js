import React, { useState } from 'react';
import axios from 'axios';

const PlayerForm = ({ player, onSave }) => {
  const [name, setName] = useState(player ? player.name : '');
  const [skill, setSkill] = useState(player ? player.skill : 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (player) {
        await axios.put(`/api/players/${player.id}`, { name, skill });
      } else {
        await axios.post('/api/players', { name, skill });
      }
      onSave();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Player Name"
        required
      />
      <input
        type="number"
        value={skill}
        onChange={(e) => setSkill(Number(e.target.value))}
        min="1"
        max="5"
        placeholder="Skill Level"
        required
      />
      <button type="submit">{player ? 'Update' : 'Add'} Player</button>
    </form>
  );
};

export default PlayerForm;
