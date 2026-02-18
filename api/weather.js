
export default async function handler(req, res) {
    const { query, historical_date, endpoint = 'current' } = req.query;
    const baseUrl = 'http://api.weatherstack.com';

    const access_key = "private";

    const allowedEndpoints = ['current', 'historical', 'marine'];
    if (!allowedEndpoints.includes(endpoint)) {
        return res.status(400).json({ error: { info: 'Invalid endpoint' } });
    }

    try {
        const params = new URLSearchParams({
            access_key,
            query,
            ...(historical_date ? { historical_date } : {})
        });

        const targetUrl = `${baseUrl}/${endpoint}?${params.toString()}`;

        // Using fetch (available in Vercel Node.js runtime 18+)
        const response = await fetch(targetUrl);
        const data = await response.json();

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: { info: 'Internal Server Error', details: error.message } });
    }
}
