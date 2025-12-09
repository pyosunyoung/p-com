import { auth } from "./auth"
import {NextResponse} from "next/server";

export async function middleware() {
  const session = await auth();
  if (!session) { //로그인 한 사람만 접근가능
    return NextResponse.redirect('http://localhost:3000/i/flow/login'); // 로그인 실패시 되돌아가기
  }
}

// See "Matching Paths" below to learn more
export const config = { //midleware를 적용할 경로, 로그인을 해야만 들어갈 수 있는 경로들로 설정해놓음.
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'], 
}