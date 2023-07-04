export interface ISignUpFormData {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export type TLoginFormData = Pick<ISignUpFormData, 'email' | 'password'>;
