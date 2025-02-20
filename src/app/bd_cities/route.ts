import { type NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cityname = searchParams.get("cityname");
  try {
    // Construct the path to the JSON file in the public folder
    let filePath = path.join(process.cwd(), "public", "bd_cities.json");

    if (cityname) {
      filePath = path.join(
        process.cwd(),
        "public",
        "citydata",
        `${cityname}.json`
      );
    }

    // Read the file synchronously
    const fileContents = fs.readFileSync(filePath, "utf8");

    // Parse the JSON content
    const jsonData = JSON.parse(fileContents);

    // Return the JSON data with CORS headers
    return new NextResponse(JSON.stringify(jsonData), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Handle potential errors
    console.error("Error reading JSON file:", error);

    return new NextResponse(JSON.stringify({ error: "Unable to read data file" }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
      },
    });
  }
}
