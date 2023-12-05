# Otomoji

## ⚪︎**サービス URL**

[Otomoji](https://next-otomoji.vercel.app)

<br>

## ⚪︎ 開発のきっかけ


中学校の頃の英語の先生がリスニングテストを自身の声を収録して作成されており、時間がかかっているという話を聞いた。教員の長時間労働が問題になっていて自らの技術で解決できないかと考え、文字を入力するだけでテストが簡単に作れるOtomojiを作った。
<br>


## ⚪︎ 主な使用技術

| Category       | Technology Stack                 |
|----------------|----------------------------------|
| Frontend       | React, Tailwind, Radix           |
| Backend        | Nextjs                           |
| Infrastructure | Vercel                           |
| Database       | PlanetScale                      |
| ORM            | Prisma                           |
| library        | superstruct, fontawesome,Auth.js |

<br>

## ⚪︎ 技術採用の意図

<details>
<summary>React</summary>

- Djangoでは静的なページが要求された場合Nginxて返すと言ったアプローチだった。ほとんどのデータがAPIでやって来て、動的にあらゆるものが構築され、htmlが中身のないulタグが陳列されるようになるとは思っていなかった。そのためキャッシュがAPI単位で行われるようになり、非常に管理しやすくなった。
- ただ、テンプレートエンジンとJSXは似ていたので比較的飲み込みやすかった。また、webpackによって部品化することができるようになったのは大きい。
- DOMの更新を最小限にするために、差分を求めてその部分だけをレンダリングするという考え。そのおかげで人間がDOM操作をする必要が無い。
</details>

<details>
<summary>auth.js</summary>

- Django,OracleDBで開発していた際はsessionで認証を行っていたが、DBにplanetscaleを採用したことで検索回数に応じたコストの増加を懸念してjwtを採用することにした。
- jwtを使うべきではないという声が多くあったのでかなり調べた。セキュリティーの問題(alg noneなど)が指摘されていたので、自前で実装するのではなく、ライブラリーに頼った。これらの記事の多くが2016年頃のものが多いため、当時はまだライブラリーが登場していなかったのかもしれない。
</details>

<details>
<summary>Next.js</summary>

- 元々は、React単体でGoでAPIサーバーを立ててSPAにしていた。FireStoreの価格が高く、アクセスする回数を減らすためにGoでキャッシュサーバー立ていた。しかし、Cloudflareを知って、あまりの安さにWorkerにAPIサーバーを立てようと考える。そのためバックエンドをHonoに変更。しかし、Nextjsを知りちょうどその時期にAPI Handlersが発表され、全面的に移行。キャッシュをやってくれるのがいい。ServerActionが追加され、APIサーバーを叩く必要もなくなりそうで楽しみ。
- SPAでは、セキュリティ関係が大変だった。

</details>

<details>

<summary>vercel</summary>

- Hobbyプランが無料なので採用。収益化する際は、CloudflarePagesに移行したい。
</details>

<details>
<summary>その他</summary>

- DBはPlanetScaleを使用。Firestoreを一時期使っていたが、無料枠が少なかったので移行。

- ORMはPrismaを使用。API通信において型の管理が非常に大変だったが、prismaによってかなり楽になった。Zod,superstructと併せて使うことでフロント、バックエンドでも型安全性を担保
</details>



<br>

## ⚪︎ 工夫した点
<details>
<summary>DB設計について</summary>

- author_idをあえて正規化しなかった。
例えば、blocksを取得したい場合、Workにしかauthor_idを記載していないと、ユーザーがblocksの属すPartを取得し、Partの属すWorkを取得してWorkのAuthorを確認して認可するという手順を踏まなければならず、処理速度の低下につながる。
- また、author_idは一度設定したら変わることがないのでこのような実装でも問題ないと判断した。
</details>


## ⚪︎ 今後の課題及び追加予定機能

<details>
<summary>キャッシュ関係</summary>

- 現状fetchAPIのキャッシュがHeaderを設定していることによってうまくできていない。
- 合成された音声をキャッシュしたい。nodejsでの音声の扱いが難しくて断念しているが、いずれは実装したい。pydub...
</details>
<details>
<summary>Block</summary>

- Blockを移動することができる機能とコピーペーストを実装したい。
</details>

<details>
<summary>コードをきれいに</summary>

- 特にHTMLのコードが汚いので、きれいにしたい。
</details>

<details>
<summary>ディレクトリー構造</summary>

- 特にHTMLのコードが汚いので、きれいにしたい。
</details>

-レスポンシブ対応
