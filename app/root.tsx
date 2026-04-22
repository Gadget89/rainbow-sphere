import { useEffect, useRef } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon.png",
  },
];

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Hey there!" },
    { name: "description", content: "Thanks for visiting!" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const updateFavicon = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
      if (favicon) {
        favicon.href = isDark ? "/logo_light.png" : "/logo_dark.png";
      }
    };

    updateFavicon();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateFavicon);

    return () => {
      mediaQuery.removeEventListener("change", updateFavicon);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  // Redirect to home on 404 errors
  useEffect(() => {
    if (isRouteErrorResponse(error) && error.status === 404 && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate("/", { replace: true });
    }
  }, [error, navigate]);

  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  // Don't render anything for 404s since we're redirecting
  if (isRouteErrorResponse(error) && error.status === 404) {
    return null;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
