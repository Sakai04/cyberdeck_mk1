//데이터 조회   api get API route
import clientPromise from "../../../../lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("cyberdeck");
        const collection = db.collection("entries");

        // MongoDB 데이터 조회
        const data = await collection.find({}).toArray();

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
