import { useAuthStore } from '@/store/authStore';
import { Box, Button, Flex, Separator, Text } from '@chakra-ui/react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ColorModeButton } from '../ui/color-mode';
import { GiPingPongBat } from 'react-icons/gi';
import { useLogoutMutation } from '@/api/authApi';

const UpperBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate({
          to: '/login',
        });
      },
    });
  };

  return (
    <Flex
      direction={'row'}
      justifyContent={'space-between'}
      p={5}
      alignItems={'center'}
    >
      <Flex gap={5}>
        <Link to="/">
          <Flex
            alignItems={'center'}
            color={'colorPalette.500'}
            cursor={'pointer'}
          >
            <GiPingPongBat size={32} />
          </Flex>
        </Link>
        <Separator orientation={'vertical'} />
        <Text alignContent={'center'}>PingPong Challenge</Text>
      </Flex>

      <Flex alignItems={'center'} gap={4}>
        <Box>
          {isAuthenticated ? (
            <Flex direction={'row'} gap={5} alignItems={'center'}>
              <Box>{user?.email}</Box>
              <Button onClick={handleLogout}>Logout</Button>
            </Flex>
          ) : (
            <Button
              onClick={() => {
                navigate({ to: '/login' });
              }}
            >
              Login
            </Button>
          )}
        </Box>
        <ColorModeButton />
      </Flex>
    </Flex>
  );
};

export default UpperBar;
