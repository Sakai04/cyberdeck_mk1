//데이터 추가 api postAPI route
import clientPromise from "../../../../lib/mongodb";

export async function POST(req) {
    try {
        const body = await req.json();
        const client = await clientPromise;
        const db = client.db("cyberdeck");
        const collection = db.collection("entries");

        // MongoDB에 데이터 추가
        const result = await collection.insertOne(body);

        return new Response(JSON.stringify({ success: true, data: result }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
