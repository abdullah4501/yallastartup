import { readFile } from "node:fs/promises";
import { join } from "node:path";

const storedFilename = "yalla-startup-support-frameworks.xlsx";
const downloadFilename = "9-5 Exist book_Frameworks.xlsx";

export async function GET() {
  const file = await readFile(join(process.cwd(), "public", storedFilename));
  const body = Uint8Array.from(file).buffer;

  return new Response(body, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${downloadFilename}"; filename*=UTF-8''${encodeURIComponent(downloadFilename)}`,
      "Content-Length": String(file.byteLength),
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
