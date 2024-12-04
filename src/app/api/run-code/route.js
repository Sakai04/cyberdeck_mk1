import { exec } from "child_process";

export async function POST(req) {
    try {
        const body = await req.json();
        const { code } = body;

        const result = await new Promise((resolve, reject) => {
            exec(`node -e "${code}"`, (error, stdout, stderr) => {
                if (error) reject(stderr);
                resolve(stdout);
            });
        });

        return new Response(JSON.stringify({ success: true, result }), {
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
