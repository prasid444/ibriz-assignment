import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="h-screen flex flex-row items-center justify-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-primary font-bold text-2xl">Welcome to Minting Assignment</h1>
        <div className="text-gray-600 text-xs">Press Continue to Start</div>
        <Link to={'/contract'}>
          <Button size="large" type="primary" className="bg-primary">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
};
