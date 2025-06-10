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
import { useRequestPasswordResetMutation } from '../api/authApi';
import { RequestPasswordDto } from 'common';
import { useNavigate } from '@tanstack/react-router';
import { LuArrowLeft } from 'react-icons/lu';
import { requestPasswordResetSchema } from '@/zod/requestPasswordSchema';
import { useEffect, useState } from 'react';

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<RequestPasswordDto>({
    resolver: zodResolver(requestPasswordResetSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  });

  const navigation = useNavigate();
  const [dbError, setDbError] = useState('');

  useEffect(() => {}, [dbError]);

  console.log(dbError);

  const requestPasswordResetMutation = useRequestPasswordResetMutation();

  const onSubmit = (data: RequestPasswordDto) => {
    const credentials: RequestPasswordDto = {
      email: data.email,
    };
    requestPasswordResetMutation.mutate(credentials, {
      onSuccess: () => {
        navigation({ to: '/', replace: true });
        setDbError('');
      },
      onError: (error) => {
        console.log(error);
        setDbError(error.response?.data?.message || error.message);
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

              {!!dbError && (
                <Text color="red.500" textAlign="center" mt={2}>
                  {dbError}
                </Text>
              )}

              <Button
                size="lg"
                width="full"
                mt={2}
                type="submit"
                loading={isFormSubmitting}
              >
                Request password reset
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

export default ForgotPasswordPage;
