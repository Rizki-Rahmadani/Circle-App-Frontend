import { Button, Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  HiHeart,
  HiLogout,
  HiOutlineHeart,
  HiOutlineSearchCircle,
  HiSearchCircle,
} from 'react-icons/hi';
import { HiHome, HiOutlineHome, HiOutlineUser, HiUser } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import useUserStore from './StoreState/userStore';
import useThreadStore from './StoreState/useThreadStore';
import CreateThreadDialog from './CreateThreadDialog';

type NavbarProps = {
  onclick: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onclick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const addThread = useThreadStore((state) => state.addThread);
  const [logo] = useState<string>('circle');
  return (
    <Flex height={'full'}>
      <nav className="flex flex-col w-full justify-between pb-5">
        <div className="flex flex-col space-y-5 text-xl px-8 mt-6">
          <h1 className="text-5xl font-bold text-green-500">{logo}</h1>
          <Link to="/home" className="flex gap-3">
            <Icon fontSize="2xl" color="white.700">
              {location.pathname === '/home' ? <HiHome /> : <HiOutlineHome />}
            </Icon>
            Home
          </Link>
          <Link to="/my-profile" className="flex gap-3">
            <Icon fontSize="2xl" color="white.700">
              {location.pathname === '/profile' ? (
                <HiUser />
              ) : (
                <HiOutlineUser />
              )}
            </Icon>
            Profile
          </Link>
          <Link to="/search" className="flex gap-3 ">
            <Icon fontSize="2xl" color="white.700">
              {location.pathname === '/search' ? (
                <HiSearchCircle />
              ) : (
                <HiOutlineSearchCircle />
              )}
            </Icon>
            Search
          </Link>
          <Link to="/follows" className="flex gap-3">
            <Icon fontSize="2xl" color="white.700">
              {location.pathname === '/follows' ? (
                <HiHeart />
              ) : (
                <HiOutlineHeart />
              )}
            </Icon>
            Follows
          </Link>

          <Button
            bg={'green.500'}
            width={'xs'}
            rounded={20}
            onClick={() => setIsDialogOpen(true)}
          >
            Create Post
          </Button>
        </div>
        <div>
          <Button onClick={onclick} className="flex gap-3">
            <Icon fontSize="2xl" color="white.700">
              <HiLogout />
            </Icon>
            Logout
          </Button>
        </div>
      </nav>
      {/* Dialog Component */}
      <CreateThreadDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)} // Close the dialog when triggered
        user={user}
        addThread={addThread}
      />
    </Flex>
  );
};

export default Navbar;
