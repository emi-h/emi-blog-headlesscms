import dayjs from "dayjs";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "src/libs/client";
import { Blog } from "src/pages";

type Props= Blog & MicroCMSContentId & MicroCMSDate;

const BlogId:NextPage<Props> =(props)=>{
    return(
        <div>
            <h1 className="font-bold text-4xl">{props.title}</h1>
            <time dateTime={props.publishedAt} className="block mt-4">{dayjs(props.publishedAt).format("DD/MM/YYYY")}</time>
            <article className="prose prose-sm" dangerouslySetInnerHTML={{__html:props.content}}></article>
        </div>
    );
};

export const getStaticPaths:GetStaticPaths<{id:string}> = async()=>{
    const data = await client.getList({endpoint:'blogs'});
    const ids = data.contents.map((content)=>`/blog/${content.id}`);
    return{
        paths:ids,
        fallback:false,
    }
};

export const getStaticProps:GetStaticProps<Props,{id:string}> = async(ctx)=>{
    
    if(!ctx.params){
        return{notFound:true};
    }
    const data = await client.getListDetail<Blog>({
        endpoint: 'blogs',
        contentId: ctx.params.id,
    });
    
    return{
        props:data,
    }
};


export default BlogId;