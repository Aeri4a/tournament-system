import {
  VStack,
  Input,
  Button,
  Box,
  Flex,
  Heading,
  Text,
  Field,
  IconButton,
  Link,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '../api/authApi';
import { LoginFormInputs, loginSchema } from '@/zod/loginSchema';
import { UserLoginDto } from 'common';
import { useNavigate } from '@tanstack/react-router';
import { LuArrowLeft } from 'react-icons/lu';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const navigation = useNavigate();

  const loginMutation = useLoginMutation();

  const onSubmit = (data: LoginFormInputs) => {
    const credentials: UserLoginDto = {
      email: data.email,
      password: data.password,
    };
    loginMutation.mutate(credentials, {
      onSuccess: () => {
        navigation({ to: '/', replace: true });
      },
    });
  };

  const handleHomeNavigation = () => {
    navigation({
      to: '/',
    });
  };

  return (
    <Box minH="100vh" position="relative">
      <Flex minH="100vh" alignItems="center" justifyContent="center" p={4}>
        <Box
          p={{ base: 6, md: 10 }}
          borderRadius="md"
          width={{ base: '95%', sm: '80%', md: '700px', lg: '900px' }}
          boxShadow="xl"
        >
          <Flex direction={{ base: 'column', md: 'row' }}>
            <Box flex={{ base: 'none', md: 2 }}>
              {/* TODO: Spacing & styling */}
              <Heading>PingPong Challenge</Heading>
              <Text>Your perfect tournament system</Text>
              <IconButton
                variant={'surface'}
                onClick={handleHomeNavigation}
                mt={5}
                p={2}
              >
                <LuArrowLeft />
                Back to Home
              </IconButton>
            </Box>

            <VStack
              onSubmit={handleSubmit(onSubmit)}
              as="form"
              align="stretch"
              width="100%"
              flex={{ base: 'auto', md: 1 }}
              borderLeftWidth={{ sm: 0, md: 4, lg: 4 }}
              borderLeftRadius={1}
              pl={{ sm: 0, md: 10, lg: 10 }}
              pt={{ sm: 5, lg: 0, md: 0 }}
            >
              <Field.Root invalid={!!errors.email}>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  bg="white"
                  borderColor="gray.400"
                  color="gray.800"
                  size="lg"
                  _placeholder={{ color: 'gray.500' }}
                  {...register('email')}
                />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.password}>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  bg="white"
                  borderColor="gray.400"
                  color="gray.800"
                  size="lg"
                  _placeholder={{ color: 'gray.500' }}
                  {...register('password')}
                />
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>

              <Link href="/forgot-password">
                <Text color="blue.500" textAlign="center" mt={2} fontSize="xs">
                  Forgot your password? Reset it here
                </Text>
              </Link>

              <Button
                size="lg"
                width="full"
                mt={2}
                type="submit"
                loading={isFormSubmitting}
              >
                Login
              </Button>

              <Box mt={4} textAlign="center">
                <Link href="/register">
                  <Text color="blue.500" textAlign="center" mt={2}>
                    Not a member? Sign up here
                  </Text>
                </Link>
              </Box>
            </VStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default LoginPage;
