import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";

// 카카오 OAuth 프로바이더 설정
const KakaoProvider: Provider = {
  id: "kakao",
  name: "Kakao",
  type: "oauth",
  authorization: {
    url: "https://kauth.kakao.com/oauth/authorize",
    params: { scope: "profile_nickname profile_image account_email" },
  },
  token: "https://kauth.kakao.com/oauth/token",
  userinfo: "https://kapi.kakao.com/v2/user/me",
  clientId: process.env.KAKAO_CLIENT_ID,
  clientSecret: process.env.KAKAO_CLIENT_SECRET,
  profile(profile) {
    return {
      id: profile.id.toString(),
      name: profile.properties?.nickname,
      email: profile.kakao_account?.email,
      image: profile.properties?.profile_image,
    };
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    KakaoProvider,
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
