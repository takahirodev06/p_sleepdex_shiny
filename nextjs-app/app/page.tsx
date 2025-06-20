import {DotGothic16} from "next/font/google";

const DotGothic16Font = DotGothic16({
    weight: "400",
    subsets: ["latin"],
});

export default function Home() {
    return (
        <div className="main">
            <header>
                <div className="head_ball"></div>
                <h1 className={DotGothic16Font.className}> ポケスリいろちがいずかん </h1>
            </header>
            <div className="pdex">
                <div className="pdex_container">
                    <div></div>
                </div>
            </div>
            <footer></footer>
        </div>
    );
}
