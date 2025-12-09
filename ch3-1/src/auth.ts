import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {NextResponse} from "next/server";

//auth 로그인 했는지 안했는지 알 수 있는 함수
//signIn, 로그인 하는 용
// handler는 Route Handlers(API Route에서 이름 바뀜)임.
export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: { //직접 만든 로그인, 회원가입 페이지 등록
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  providers: [
    CredentialsProvider({ //로그인을 수행할 때 이부분이 호출됨.
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, { // next action server 주소로 호출
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        })

        if (!authResponse.ok) {
          return null
        }

        const user = await authResponse.json() // 누가 로그인 했는지 정보를 담음
        console.log('user', user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        }
      },
    }),
  ]
});