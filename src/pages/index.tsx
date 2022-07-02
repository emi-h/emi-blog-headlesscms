import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { client } from "src/libs/client";

export type Blog ={
  title:string;
  content:string;
}

const Home: NextPage<MicroCMSListResponse<Blog>> = (props) => {
const [search, setSearch]= useState<MicroCMSListResponse<Blog>>();

  const handleSubmit:ComponentProps<"form">["onSubmit"] = async (event)=>{
    event.preventDefault();
    const q = event.currentTarget.query.value;
    const data =await fetch("/api/search",{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({q}),
    });
    const json:MicroCMSListResponse<Blog> = await data.json();
    setSearch(json);
  };

  const handleReset:ComponentProps<"button">["onClick"]=()=>{
    setSearch(undefined);
  };
  
  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;

  return (
  <div>
     <form onSubmit={handleSubmit}>
      <input className="border border-black px-2" type="text" name="query" />
      <button className="border border-black px-2">Search</button>
      <button type="reset" className="border border-black px-2" onClick={handleReset}>Reset</button>
    </form>
    <p className="text-gray-400">{`${search ? "Number of articles" : "Total article"}：${totalCount}`}</p>
    <ul className="mt-4 space-y-4">
      {contents?.map((content)=>{
        return(
          <li key={content.id}>
            <Link href={`/blog/${content.id}`}>
              <a className="text-xl hover:text-blue-400">{content.title}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  </div>
  )
  ;
};

export const getStaticProps:GetStaticProps<MicroCMSListResponse<Blog>>=async()=>{
  const data = await client.getList<Blog>({endpoint: 'blogs'});
  return{
    props:data,
  };
};

export default Home;
