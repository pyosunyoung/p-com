import {useCallback, useEffect} from 'react';
import { io, Socket } from 'socket.io-client';
import {useSession} from "next-auth/react";

let socket: Socket | null;
export default function useSocket(): [Socket | null, () => void] {
  const { data: session } = useSession();
  const disconnect = useCallback(() => {
    socket?.disconnect();// 연결 종료
    socket = null;
  }, []);

  useEffect(() => {
    if (!socket) { // 중복 소켓 방지. 소켓이 없다면 실행 ㄱ
      socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        transports: ['websocket'] // http 폴링,웹 소켓이 없던 시절은 주기적으로 요청을 보냄 그때가 http 폴링임., 폴링 안하고 웹소켓만 쓰겟다는 뜻., 웹소켓은 폴리도 지원함.
      });
      socket.on('connect_error', (err) => {
        console.error(err);
        console.log(`connect_error due to ${err.message}`);
      })
    }
  }, [session]);

  useEffect(() => {
    if (socket?.connected && session?.user?.email) { // 소켓이 맺어져있고 user email이 있다면
      socket?.emit('login', { id: session?.user?.email }); //  객체로 보내고 로그인해라?
    }
  }, [session]);

  return [socket, disconnect];
}