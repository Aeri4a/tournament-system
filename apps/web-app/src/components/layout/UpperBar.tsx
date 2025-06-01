import { useAuthStore } from '@/store/authStore';
import { Box, Button, Flex, Separator, Text } from '@chakra-ui/react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ColorModeButton } from '../ui/color-mode';
import { GiPingPongBat } from 'react-icons/gi';

const UpperBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

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
            <Box>Avatar</Box>
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
