import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

function shouldRedirectToSignIn(
  verify: RequestCookie | undefined,
  url: string
) {
  const host = new URL(url);
  return (
    !verify &&
    (url.includes("/blogs") ||
      url.includes("/members") ||
      url.includes("/notifications") ||
      url === `${host.origin}/`)
  );
}

export default async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown> | undefined> {
  let verify = req.cookies.get("refreshToken");
  let darkMode = req.cookies.get("darkMode?");
  let url = req.url;
  const host = new URL(url);

  if (shouldRedirectToSignIn(verify, url)) {
    return NextResponse.redirect(`${host.origin}/auth/sign-in`);
  }

  if (verify && url.includes("/auth")) {
    return NextResponse.redirect(`${host.origin}/`);
  }
  return NextResponse.next();
}
