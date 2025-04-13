import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginUser } from '@/services/auth.service';
import { Role } from '@/utils/types';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@example.com',
          name: 'email',
        },
        password: { label: 'Password', type: 'password', name: 'password' },
      },
      async authorize(credentials) {
        const result = await loginUser(
          credentials as { email: string; password: string }
        );
        return result;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.role = token.role as Role;
      return session;
    },
    async redirect() {
      return '/dashboard';
    },
  },
  pages: {
    signIn: '/auth/login',
  },
});
