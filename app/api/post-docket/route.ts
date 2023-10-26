import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from "path";

export const POST = async (req: NextRequest,) => {
    try {
        const docketData = await req.json();

        const filePath = path.join(process.cwd(), "dockets.json");
        console.log(filePath);

        // Read the existing data from the file, or initialize an empty array if the file doesn't exist yet
        let existingData = [];

        try {
            const fileData = fs.readFileSync(filePath, "utf8");
            existingData = JSON.parse(fileData)

        } catch (error: any) {
            // If the file doesn't exist, it will be created later
            console.log(error.message);
        }

        // Push the incoming data into the existing array
        existingData.push(docketData);
        try {
            // Write the updated array back to the file
            fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf8")
        } catch (error : any) {
            console.log('while right:' + error.message);
        }


        return NextResponse.json(existingData);
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }

}