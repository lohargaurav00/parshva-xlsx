import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';

export const POST = async (req: NextRequest,) => {
    try {
        const docketData = await req.json();

        // Read the existing data from the file, or initialize an empty array if the file doesn't exist yet
        let existingData = [];
        
        try {
            const fileData = fs.readFileSync("./dockets.json", "utf8");
            existingData = JSON.parse(fileData);
        } catch (error) {
            // If the file doesn't exist, it will be created later
        }

        // Push the incoming data into the existing array
        existingData.push(docketData);

        // Write the updated array back to the file
        fs.writeFileSync("./dockets.json", JSON.stringify(existingData, null, 2), "utf8");

        return NextResponse.json(existingData);
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }

}