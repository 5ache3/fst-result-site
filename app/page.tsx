"use client"
import { useEffect } from "react";
import Header from "../components/Header";
export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/fillieres');
      const response = await data.json();
      console.log(response);
    };
    fetchData();
  }, []);
  return (
    <>
    <Header />
    
    </>
  );
}
