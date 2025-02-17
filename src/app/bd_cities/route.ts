import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let path = "../../data_src/bd_cities.json";
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const cityname = searchParams.get("cityname");
  if (cityname) {
    path = `../../data_src/citydata/${cityname}.json`;
  }
  const cities = require(path);
  return NextResponse.json(cities);
}
