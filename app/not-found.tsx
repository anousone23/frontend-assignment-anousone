"use client";

import Error from "next/error";

export default function GlobalNotFound() {
  return (
    <html>
      <body className="text-center bg-brand-lavender">
        <Error statusCode={404} />
      </body>
    </html>
  );
}
