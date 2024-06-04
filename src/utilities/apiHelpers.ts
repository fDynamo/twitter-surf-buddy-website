export function createResponse(
  body: any,
  options?: Partial<{ status: number; method: string }>
) {
  const status = options?.status ? options.status : 200;
  const method = options?.method ? options.method : "GET";
  let toSend = body;
  if (typeof toSend == "string") {
    toSend = { message: toSend };
  }

  return Response.json(toSend, {
    status,
    headers: {
      "Access-Control-Allow-Origin": process.env.REDIRECT_URL as string,
      "Access-Control-Allow-Methods": "OPTIONS, " + method,
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
