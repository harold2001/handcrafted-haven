import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginUser } from '@/services/auth.service';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return loginUser(credentials as { email: string; password: string });
      },
    }),
  ],
  callbacks: {
    async redirect() {
      return '/dashboard';
    },
  },
  pages: {
    signIn: '/auth/login',
  },
});
