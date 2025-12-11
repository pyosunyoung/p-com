import Main from "@/app/(beforeLogin)/_component/Main";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session?.user) { //로그인 정보가 있다면 홈으로
    redirect('/home');
    return null;
  }
  return (
    <Main />
  )
}
