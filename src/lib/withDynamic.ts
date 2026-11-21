import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Handler = (req: NextRequest, context?: any) => Promise<NextResponse>;

export function withDynamic(handler: Handler): Handler {
  return async (req, context) => {
    await headers();
    return handler(req, context);
  };
}
