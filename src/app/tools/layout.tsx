import React from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";
import logo from "@/assets/logo.svg";
import ProfileComponent from "@/components/profile.component";
import {Garland} from "@/components/garland.component";
import {ASide} from "@/components/aside.component";
import {Links} from "@/components/links.component";

import banner_1 from "@/assets/banners/g1.png";
import banner_2 from "@/assets/banners/g2.png";
import banner_3 from "@/assets/banners/g3.png";
import banner_4 from "@/assets/banners/g6.png";
import Link from "next/link";
import Script from "next/script";
export default function Layout({children,}: { children: React.ReactNode }) {

    return (
        <div className={"flex flex-col gap-8 pb-10 physgun_inner"}>
            <header className={"bg-neutral-900 sticky top-0 z-50 shadow-lg"}>
                <div className={"container mx-auto py-3"}>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-2">
                            <a href="/"><Image className={"ms-5 me-10"} src={logo} alt={"Logo"} width={120} height={100} /></a>
                        </div>
                        <div className="flex flex-row">
                        <Links/>
                        </div>
                    </div>
                </div>
                <Garland/>
            </header>
            <div className={"container mx-auto"}>
                <div className={"flex flex-row gap-5"}>
                    <div className="flex flex-col gap-5">
                        <ASide/>
                        <div
                            className="flex overflow-hidden flex-row border h-[300px] border-dashed rounded-xl border-zinc-600 text-sm text-zinc-500">
                            <div id="yandex_rtb_R-A-13227626-1" className="flex-1 w-[240px] h-[400px]"></div>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 mb-10">
                        <div className="flex flex-row gap-3 w-full mb-5">
                        <Link className={"flex-1 rounded-lg overflow-hidden border border-neutral-900 shadow-lg relative"}
                                  href={"/tools/mdmp"}><Image className={"w-full"} src={banner_4}
                                                                         alt={"Баннер генератора"}/>
                                                                         <span
                                    className={"absolute top-2 right-2 bg-blue-500 text-white px-2 py-0.5 rounded-full text-[12px]"}>Новое</span></Link>
                            <Link
                                className={"flex-1 rounded-lg overflow-hidden border border-neutral-900 shadow-lg"}
                                href={"/generator/gmdonate/theme"}>
                                <Image className={"w-full"} src={banner_1} alt={"Баннер генератора"}/>
                            </Link>
                            <Link className={"flex-1 rounded-lg overflow-hidden border border-neutral-900 shadow-lg"}
                                  href={"/generator/gmdonate/donate"}><Image className={"w-full"} src={banner_2}
                                                                             alt={"Баннер генератора"}/></Link>
                            <Link className={"flex-1 rounded-lg overflow-hidden border border-neutral-900 shadow-lg"}
                                  href={"/"}><Image className={"w-full"} src={banner_3}
                                                    alt={"Баннер генератора"}/></Link>
                        </div>
                        <div className="p-5 bg-neutral-900 rounded-2xl w-full h-fit">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <Script>
                {`
          window.yaContextCb.push(() => {
                Ya.Context.AdvManager.render({
                    "blockId": "R-A-13227626-1",
                    "renderTo": "yandex_rtb_R-A-13227626-1"
                })
            })
          `}
            </Script>
        </div>
    )
}
