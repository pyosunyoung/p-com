// 이전 14버전
// "use client";
// import { useEffect } from "react";

// export const MSWComponent = () => {
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
//         require("@/mocks/browser");
//       }
//     }
//   }, []);

//   return null;
// };

//15버전 코드
'use client'

import { Suspense, use } from 'react'
import { handlers } from '@/mocks/handlers'

const mockingEnabledPromise =
  typeof window !== 'undefined' //브라우저일 때 browser.ts의 worker를 임포트함.
    ? import('@/mocks/browser').then(async ({ default: worker }) => {
      if (process.env.NODE_ENV === 'production' || process.env.MSW_ENABLED === 'false') { // 개발 모드일 때만 msw가 돌아가도록 설정.
        return;
      }
      await worker.start({ //msw실행
        onUnhandledRequest(request, print) {
          if (request.url.includes('_next')) {
            return
          }
          print.warning() //msw가 처리하지 못할 때 경고
        },
      })
      worker.use(...handlers);
      (module as any).hot?.dispose(() => { worker.stop(); });
      console.log(worker.listHandlers())
    })
    : Promise.resolve()

export function MSWProvider({
                              children,
                            }: Readonly<{
  children: React.ReactNode
}>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return ( //fallbakc 로딩중엔 아무것도 안뜸.
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  )
}

function MSWProviderWrapper({
                              children,
                            }: Readonly<{
  children: React.ReactNode
}>) {
  use(mockingEnabledPromise) //use는 mockingEnabledPromise 프로미스를 처리하는 훅
  return children //프로미스가 실행되길 기다리고 children을 리턴하는 훅
}