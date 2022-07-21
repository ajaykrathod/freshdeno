/** @jsx h */
/**  @jsxFrag Fragment */
import { Fragment, h } from "preact";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps} from "$fresh/server.ts";
import { Head, asset } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Index from "../islands/Index.tsx";


export default function Home() {
  return (
    <>
      <Head>
        <title>FreshDeno</title>
        <link rel="stylesheet" href={asset("/global.css")} />
      </Head>
      <body>
        <Header/>
        <div className="index">
            <Index/>
        </div>
      </body>
    </>
  );
}
