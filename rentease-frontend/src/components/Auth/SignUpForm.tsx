import { useForm } from 'react-hook-form';
import axiosInstance from '../../api/axiosInstance';

interface SignupForm {
  email: string;
  password: string;
  name: string;
}

export function SignUpForm() {
  const { register, handleSubmit } = useForm<SignupForm>();

  const onSubmit = async (data: SignupForm) => {
    await axiosInstance.post('/auth/signup', data);
    alert('User successfully created');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" required />
      <input {...register('password')} placeholder="Password" type="password" required />
      <input {...register('name')} placeholder="Name" />
      <button type="submit">Signup</button>
    </form>
  );
}
