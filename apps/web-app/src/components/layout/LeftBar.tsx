import { useAuthStore } from '@/store/authStore';
import { Text, Flex, VStack, Box } from '@chakra-ui/react';
import { Link, useLocation } from '@tanstack/react-router';
import { FC } from 'react';
import { IconType } from 'react-icons/lib';

import { LuBookOpenCheck, LuPen, LuHouse } from 'react-icons/lu';

interface MenuItem {
  label: string;
  Icon: IconType;
  path: string;
}

interface MenuItemProps {
  item: MenuItem;
  isActive: boolean;
}

const MenuItem: FC<MenuItemProps> = ({
  item: { Icon, label, path },
  isActive,
}) => (
  <Flex
    gap={5}
    alignItems={'center'}
    cursor={'pointer'}
    pr={10}
    py={3}
    transition={'0.2s'}
    className={'group'}
  >
    <Box
      bg={isActive ? 'colorPalette.400' : 'transparent'}
      p={4}
      borderTopRightRadius={'md'}
      borderBottomRightRadius={'md'}
      _groupHover={{ bg: 'colorPalette.300' }}
      transition={'0.2s'}
    >
      <Icon />
    </Box>
    <Link to={path}>
      <Text
        textDecoration={isActive ? 'underline' : 'none'}
        textUnderlineOffset={isActive ? 10 : 0}
        transition={'0.2s'}
      >
        {label}
      </Text>
    </Link>
  </Flex>
);

const MENU_ITEMS: MenuItem[] = [
  { label: 'Tournaments', Icon: LuHouse, path: '/app' },
  { label: 'Organizing', Icon: LuPen, path: '/app/organizing' },
  { label: 'Participating', Icon: LuBookOpenCheck, path: '/app/participating' },
];

const LeftBar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  const menuItems = isAuthenticated ? MENU_ITEMS : [MENU_ITEMS[0]];

  return (
    <Flex bg={'bg'} alignItems={'flex-start'}>
      <VStack align={'stretch'} pt={10}>
        {menuItems.map((item) => (
          <MenuItem
            item={item}
            isActive={location.pathname === item.path}
            key={item.path}
          />
        ))}
      </VStack>
    </Flex>
  );
};

export default LeftBar;
