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

    // Return the JSON data as a response
    return NextResponse.json(jsonData, { status: 200 });
  } catch (error) {
    // Handle potential errors
    console.error("Error reading JSON file:", error);

    return NextResponse.json(
      { error: "Unable to read data file" },
      { status: 500 }
    );
  }
}
