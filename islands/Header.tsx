/** @jsx h */
/** @jsxFrag Fragment */

import { h,Fragment } from "preact";
import {Head, asset} from "$fresh/runtime.ts"

const Header = () => {
  return (
    <>
        <Head>
            <link rel="stylesheet" href={asset("header.css")} />
        </Head>
        <div>
            <nav>
                <h2 class="title" onClick={() => window.location.href = "/"}>
                    FreshDeno
                </h2>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                </ul>
            </nav>
        </div>
    </>
  )
}

export default Header