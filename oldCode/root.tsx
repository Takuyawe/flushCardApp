import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import 'remixicon/fonts/remixicon.css';
import stylesheet from '~/tailwind.css?url';
import { Header } from './components/Header';
import { createSupabaseServerClient } from './supabase.server';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

// TODO: add loader to check if user is logged in, if not redirect to login page

export function Layout({ children }: { children: React.ReactNode }) {
  // const loaderResponse = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      {/* TODO: should h-dvh */}
      <body className="h-screen">
        <header>
          <Header />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}