"use client";
import React, {ReactElement, useEffect, useState} from "react";
import inImage from "@/assets/heros/news.jpg";
import {Button, Flex, Spin} from "antd";
import Image from "next/image";
import {useRAPI} from "@/hooks/rapi.hook";
import {IPost} from "@/types/global.type";

export const PostComponent = ( {post} : {post: IPost}  ) : ReactElement => {
    return (
        <article className={"flex flex-col justify-between gap-3 p-3 rounded-md"}>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between text-neutral-700 text-sm">
                    <span>{post.from == 1 ? "ВКонтакте" : "Telegram"}</span>
                    <span>{post.datetime}</span>
                </div>
                <Image priority={true} loading="lazy" className={"rounded-xl w-full"} style={{height:180}} src={post.thumbnail_post == "none" ? inImage : post.thumbnail_post} alt={"Post image"} width={0} height={0} sizes={"200px"}/>
                <p className={"line-clamp-3 text-neutral-400 text-sm"}>{post.message_post}</p>
            </div>
            <Button href={post.from == 1 ? "https://vk.com/physgun_ru" : "https://t.me/physgun"} size={"large"} className={"border !border-neutral-700"} type={"text"}>Читать далее</Button>
        </article>
    )
}

export const NewsLetters = () : ReactElement => {
    const RAPI = useRAPI();
    const [posts, setPosts] = useState([])

    async function fetchPosts() {
        const fPosts = await RAPI.request('/api/v1/news/all',"GET")
        setPosts(fPosts)
    }

    useEffect(()=>{
        fetchPosts()
    },[])

    if (posts.length <= 0)
        return (
            <Flex justify={"center"} align={"center"} style={{minHeight: "100%"}}>
                <Spin size={"large"} spinning={true}/>
            </Flex>
        )

    return (
        <div className="inline-grid grid-cols-3 gap-3">
            {posts.map((post : IPost, key : number) => (
                <PostComponent key={key} post={{from: post.from,
                    datetime: post.datetime,
                    message_post: post.message_post,
                    thumbnail_post: post.thumbnail_post}} />
            ))}
        </div>
    )
}