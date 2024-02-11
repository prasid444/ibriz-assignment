import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div>
      This is Home Page
      <Link to="/contract">Go to Contract Page</Link>
    </div>
  );
};
