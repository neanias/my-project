import { AppProps } from "$fresh/src/server/types.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <body class="bg(white dark:gray-900)">
        <main class="container mx-auto p-4">
          <Component />
        </main>
      </body>
    </html>
  );
}
