import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

function shouldRedirectToSignIn(
  verify: RequestCookie | undefined,
  url: string | string[]
) {
  return (
    !verify &&
    (url.includes("/blogs") ||
      url.includes("/members") ||
      url.includes("/notifications") ||
      url === "http://localhost:3000/")
  );
}

export default async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown> | undefined> {
  let verify = req.cookies.get("refreshToken");
  // let accessToken = req.cookies.get("accessToken");
  let url = req.url;

  if (shouldRedirectToSignIn(verify, url)) {
    return NextResponse.redirect("http://localhost:3000/auth/sign-in");
  }

  if (verify && url.includes("/auth")) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  return NextResponse.next();
}
