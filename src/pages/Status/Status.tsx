import { Icon } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi2';
import StatusComponent from '@/components/StatusComponent';
function Status() {
  return (
    <div className="border-x border-y pt-6 border-neutral-500">
      <div className="flex px-5 mb-5 items-center gap-4">
        <Link to={'/home'}>
          <Icon size={'2xl'}>
            <HiArrowLeft />
          </Icon>
        </Link>
        <h1 className="text-4xl font-bold">Status</h1>
      </div>
      <StatusComponent />
    </div>
  );
}

export default Status;
