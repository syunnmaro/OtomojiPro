import {Header} from "@/components/atom/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-svg-core/styles.css'
import {faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/blocks/footer";
import {getServerSession} from "next-auth/next";
import {LoginButton, WorksButton} from "@/components/atom/Buttons";
import Link from "next/link";
import {OPTIONS} from "@/lib/authOptions";

const HomePage = async () => {
    const session = await getServerSession(OPTIONS)
    const user = session?.user // ログインしていなければnullになる。
    return (
        <>
            <Header>
                <div className="">
                    <Link href={"/"} className="text-3xl text-white">Otomoji</Link>
                </div>
            </Header>
            <div className="font-medium text-gray-600 max-w-screen-xl mx-auto">

                <section className="text-center">
                    <h1 className="mt-12 text-5xl font-extrabold leading-normal md:leading-normal lg:leading-normal">
                        リスニングテストをたったの10分で <br/>
                        文字を打つだけで作成
                    </h1>
                    <p className="mt-6 text-xl font-semibold text-gray-400">
                        Otomjiはテキストベースの音声生成サービスです。<br/>
                        直感的な操作で簡単に問題を作成できます。

                    </p>
                    <div className="flex flex-col items-center mt-8">
                        {user ? <WorksButton/> : <LoginButton/>}

                    </div>
                </section>

            </div>
        </>

    );
};

export default HomePage;
