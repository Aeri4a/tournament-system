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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResetPasswordMutation } from '../api/authApi';
import { ResetPasswordDto } from 'common';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { LuArrowLeft } from 'react-icons/lu';
import {
  ResetPasswordFormInputs,
  resetPasswordSchema,
} from '@/zod/resetPasswordSchema';

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    mode: 'onTouched',
  });

  const navigation = useNavigate();
  const query: { token: string } = useSearch({ from: '/reset-password' });

  const resetPasswordMutation = useResetPasswordMutation();

  const onSubmit = (data: ResetPasswordDto) => {
    const credentials: ResetPasswordDto = {
      token: query['token'],
      newPassword: data.newPassword,
    };
    resetPasswordMutation.mutate(credentials, {
      onSuccess: () => {
        navigation({ to: '/', replace: true });
      },
      onError: (error) => {
        console.log(error);
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
              <Field.Root invalid={!!errors.newPassword}>
                <Input
                  id="password"
                  placeholder="New password"
                  type="password"
                  bg="white"
                  borderColor="gray.400"
                  color="gray.800"
                  size="lg"
                  _placeholder={{ color: 'gray.500' }}
                  {...register('newPassword')}
                />
                <Field.ErrorText>{errors.newPassword?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.confirmNewPassword}>
                <Input
                  id="confirmNewPassword"
                  placeholder="Confirm new password"
                  type="password"
                  bg="white"
                  borderColor="gray.400"
                  color="gray.800"
                  size="lg"
                  _placeholder={{ color: 'gray.500' }}
                  {...register('confirmNewPassword')}
                />
                <Field.ErrorText>
                  {errors.confirmNewPassword?.message}
                </Field.ErrorText>
              </Field.Root>

              <Button
                size="lg"
                width="full"
                mt={2}
                type="submit"
                loading={isFormSubmitting}
              >
                Update password
              </Button>
            </VStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ResetPasswordPage;
