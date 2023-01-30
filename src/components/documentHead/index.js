import Head from "next/head";

export default function DocumentHead({ title }) {
  return (
    <Head>
      <title>{title} | Flixflex Movie APP</title>
    </Head>
  );
}
