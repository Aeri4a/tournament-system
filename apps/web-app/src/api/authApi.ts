import { useAuthStore } from '@/store/authStore';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axios from '@/config/axiosConfig';
import { User, UserLoginDto } from 'common';

const API_PATH = 'http://localhost:3000/api/auth';

export interface ErrorResponse {
  message: string;
}

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
