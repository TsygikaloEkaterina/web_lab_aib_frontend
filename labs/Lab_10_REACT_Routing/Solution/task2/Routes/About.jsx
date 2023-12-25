import React from 'react'
import { useParams } from 'react-router-dom'

function About({users}) {
  const { id } = useParams();

  const user = users.find((u) => u.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Birth_year: {user.birth_year}</p>
      <p>id: {user.id}</p>
    </div>
  );
}

export default About