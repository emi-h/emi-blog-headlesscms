import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { client } from "src/libs/client";

export type Blog ={
  title:string;
  content:string;
}

const Home: NextPage<MicroCMSListResponse<Blog>> = (props) => {
  return <div>
    <p className="text-gray-400">{`Number of articles：${props.totalCount}`}</p>
    <ul className="mt-4 space-y-4">
      {props.contents.map((content)=>{
        return(
          <li key={content.id}>
            <Link href={`/blog/${content.id}`}>
              <a className="underline text-xl text-blue-800 hover:text-blue-400">{content.title}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  </div>;
};

export const getStaticProps:GetStaticProps<MicroCMSListResponse<Blog>>=async()=>{
  const data = await client.getList<Blog>({endpoint: 'blogs'},);
  return{
    props:data,
  };
};

export default Home;
