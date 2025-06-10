import { useAuthStore } from '@/store/authStore';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axios from '@/config/axiosConfig';
import {
  ConfirmUserDto,
  RegisterUserDto,
  RequestPasswordDto,
  ResetPasswordDto,
  User,
  UserLoginDto,
} from 'common';

const API_PATH = 'http://localhost:3000/api/auth';

export interface ErrorResponse {
  message: string;
}

const activateUser = async (dto: ConfirmUserDto): Promise<User> => {
  const { data } = await axios.post<User>(`${API_PATH}/confirmation`, dto);
  return data;
};

export const useUserActivationMutation = (): UseMutationResult<
  User,
  AxiosError<{ message?: string }>,
  ConfirmUserDto
> => {
  return useMutation<User, AxiosError<{ message?: string }>, ConfirmUserDto>({
    mutationFn: activateUser,
    onSuccess: (data) => {
      console.log('Account activated Successfully:', data);
    },
    onError: (error) => {
      console.error(
        'Account activatation failed',
        error.response?.data?.message || error.message,
      );
    },
  });
};

const registerUser = async (credentials: RegisterUserDto): Promise<User> => {
  const { data } = await axios.post<User>(`${API_PATH}/register`, credentials);
  return data;
};

export const useRegisterMutation = (): UseMutationResult<
  User,
  AxiosError<{ message?: string }>,
  RegisterUserDto
> => {
  return useMutation<User, AxiosError<{ message?: string }>, RegisterUserDto>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('Register successful:', data);
    },
    onError: (error) => {
      console.error(
        'Register failed:',
        error.response?.data?.message || error.message,
      );
    },
  });
};

const loginUser = async (credentials: UserLoginDto): Promise<User> => {
  const { data } = await axios.post<User>(`${API_PATH}/login`, credentials);
  return data;
};

export const useLoginMutation = (): UseMutationResult<
  User,
  AxiosError<{ message?: string }>,
  UserLoginDto
> => {
  const { login } = useAuthStore();

  return useMutation<User, AxiosError<{ message?: string }>, UserLoginDto>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data);
      console.log('Login successful:', data);
    },
    onError: (error) => {
      console.error(
        'Login failed:',
        error.response?.data?.message || error.message,
      );
    },
  });
};

const logoutUser = async (): Promise<void> => {
  await axios.post(`${API_PATH}/logout`);
};

export const useLogoutMutation = (): UseMutationResult<
  void,
  AxiosError<{ message?: string }>,
  void
> => {
  const { logout } = useAuthStore();

  return useMutation<void, AxiosError<{ message?: string }>, void>({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      console.log('Logout successful');
    },
    onError: (error) => {
      console.error(
        'Logout failed:',
        error.response?.data?.message || error.message,
      );
    },
  });
};

const requestPasswordReset = async (dto: RequestPasswordDto): Promise<void> => {
  const { data } = await axios.post<void>(
    `${API_PATH}/request-password-reset`,
    dto,
  );
  return data;
};

export const useRequestPasswordResetMutation = (): UseMutationResult<
  void,
  AxiosError<{ message?: string }>,
  RequestPasswordDto
> => {
  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    RequestPasswordDto
  >({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      console.log('Password reset request successful');
    },
    onError: (error) => {
      console.error(
        'Password reset request failed:',
        error.response?.data?.message || error.message,
      );
    },
  });
};

const resetPassword = async (dto: ResetPasswordDto): Promise<void> => {
  const { data } = await axios.post<void>(`${API_PATH}/reset-password`, dto);
  return data;
};

export const useResetPasswordMutation = (): UseMutationResult<
  void,
  AxiosError<{ message?: string }>,
  ResetPasswordDto
> => {
  return useMutation<void, AxiosError<{ message?: string }>, ResetPasswordDto>({
    mutationFn: resetPassword,
    onSuccess: () => {
      console.log('Password successfully reset');
    },
    onError: (error) => {
      console.error(
        'Failed to reset password:',
        error.response?.data?.message || error.message,
      );
    },
  });
};

const checkSession = async (): Promise<User> => {
  const { data } = await axios.get<User>(`${API_PATH}`);
  return data;
};

export const useCheckSessionMutation = (): UseMutationResult<
  User,
  AxiosError<{ message?: string }>,
  void
> => {
  const { login, logout } = useAuthStore();

  return useMutation<User, AxiosError<{ message?: string }>, void>({
    mutationFn: checkSession,
    onSuccess: (data) => {
      login(data);
    },
    onError: () => {
      logout();
    },
  });
};
