// import "@fontsource/orbitron";
"use client";
import Homepage from "@/components/manual-ui/homepage/homepage";
import { RecoilRoot } from 'recoil';
export default function Home() {
  return (
    <>
      <RecoilRoot>
        <Homepage />
      </RecoilRoot>
    </>
  );
}
