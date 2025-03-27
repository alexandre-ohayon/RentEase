import { useForm } from 'react-hook-form';
import axiosInstance from '../../api/axiosInstance';
import { useAuthStore } from '../../store/authStore';

interface SigninForm {
  email: string;
  password: string;
}

export function SignInForm() {
  const { register, handleSubmit } = useForm<SigninForm>();
  const setToken = useAuthStore((state) => state.setToken);

  const onSubmit = async (data: SigninForm) => {
    const res = await axiosInstance.post('/auth/signin', data);
    setToken(res.data.token);
    alert('User successfully logged in');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" required />
      <input {...register('password')} placeholder="Password" type="password" required />
      <button type="submit">Signin</button>
    </form>
  );
}
