import Home from "@/app/(afterLogin)/home/page";
import PhotoModal from "@/app/(afterLogin)/@modal/(.)[username]/status/[id]/photo/[photoId]/page";

type Props = {
  params: Promise<{ username: string, id: string, photoId: string }>
}

export default async function Page({params}: Props) {
  const resolvedParams = await params;

  resolvedParams.username; // elonmusk
  resolvedParams.id;       // 1
  resolvedParams.photoId;  // 1

  return (
    <>
      <Home/>
      <PhotoModal params={resolvedParams}/>
    </>
  )
}