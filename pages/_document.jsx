import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/static/manifest.json" />
          {this.props.headTags}
        </Head>{" "}
        {/* this line needs to be added */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
