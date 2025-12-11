import { auth } from "./auth"
import {NextResponse} from "next/server";

export async function middleware() {
  const session = await auth();
  if (!session) { //세션 검사. 세션이 있으면 넘어가고 없다면 로그인 페이지로 리다이렉트
    return NextResponse.redirect('http://localhost:3000/i/flow/login');
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
}