import { Button, Tabs } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { MintTokenView } from '../views/MintTokenView';
import { TransferTokenView } from '../views/TransferTokenView';

export const ContractPage = () => {
  const [activeTabKey, setActiveTabKey] = useState('mint');
  return (
    <div className="h-screen bg-gray flex flex-col ">
      <div className="flex py-2 px-1 items-center bg-[#DF5627]">
        <div className="">
          <Link to={'/'}>
            <Button
              type="link"
              icon={<ArrowLeft color="white" />}
              onClick={() => {
                // go back
              }}
            />
          </Link>
        </div>
        <div className="px-2 flex-1 flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">Contract Page</h1>
        </div>
      </div>
      <div className="p-4 flex-1">
        <div className="bg-white rounded-md">
          <Tabs
            defaultActiveKey="mint"
            activeKey={activeTabKey}
            destroyInactiveTabPane
            onChange={(newKey) => setActiveTabKey(newKey)}
            items={[
              {
                key: 'mint',
                id: 'mint',
                label: 'Mint Token',
                children: <MintTokenView />,
              },
              {
                key: 'transfer',
                id: 'transfer',
                label: 'Transfer Token',
                children: <TransferTokenView />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
