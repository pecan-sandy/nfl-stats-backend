// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Off-Tackle API configuration
const API_BASE_URL = process.env.API_BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

// ESPN API bases
const ESPN_BASE = 'https://site.web.api.espn.com';
const CORE_BASE = 'https://sports.core.api.espn.com';

// CORS middleware
app.use(cors());

// ✅ GET Teams (Off-Tackle)
app.get('/api/teams', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/teams/`, {
            headers: { Authorization: `Token ${API_TOKEN}` },
        });
        res.json(response.data);
    } catch (error) {
        console.error('❌ Error fetching teams:', error.message);
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});

// ✅ GET Players (Off-Tackle)
app.get('/api/players', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/players/`, {
            headers: { Authorization: `Token ${API_TOKEN}` },
        });
        res.json(response.data);
    } catch (error) {
        console.error('❌ Error fetching players:', error.message);
        res.status(500).json({ error: 'Failed to fetch players' });
    }
});

// ✅ GET Games (Off-Tackle)
app.get('/api/games', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/games/`, {
            headers: { Authorization: `Token ${API_TOKEN}` },
        });
        res.json(response.data);
    } catch (error) {
        console.error('❌ Error fetching games:', error.message);
        res.status(500).json({ error: 'Failed to fetch games' });
    }
});

// 🔁 ESPN: Player bio (overview)
app.get('/api/espn/player/:id/bio', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(
            `${ESPN_BASE}/apis/common/v3/sports/football/nfl/athletes/${id}/overview`
        );
        res.json(response.data);
    } catch (error) {
        console.error('❌ Error fetching ESPN bio:', error.message);
        res.status(500).json({ error: 'Failed to fetch player bio' });
    }
});

// 🔁 ESPN: Player statistics (season)
app.get('/api/espn/player/:id/stats', async (req, res) => {
    try {
        const { id } = req.params;
        const year = req.query.year || new Date().getFullYear();
        const response = await axios.get(
            `${CORE_BASE}/v2/sports/football/leagues/nfl/seasons/${year}/types/2/athletes/${id}/statistics`
        );
        res.json(response.data);
    } catch (error) {
        console.error('❌ Error fetching ESPN stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch player stats' });
    }
});

// 🔁 ESPN: Team standings
app.get('/api/espn/team/:teamId/standings', async (req, res) => {
    try {
        const { teamId } = req.params;
        const year = req.query.year || new Date().getFullYear();
        const response = await axios.get(
            `${CORE_BASE}/v2/sports/football/leagues/nfl/seasons/${year}/types/2/groups/1/standings`
        );
        res.json(response.data);
    } catch (error) {
        console.error('❌ Error fetching ESPN standings:', error.message);
        res.status(500).json({ error: 'Failed to fetch standings' });
    }
});

// 🔁 ESPN: Season / weekly leaders
app.get('/api/espn/leaders', async (req, res) => {
    try {
        const response = await axios.get(
            `${ESPN_BASE}/apis/site/v3/sports/football/nfl/leaders`,
            { params: req.query }
        );
        res.json(response.data);
    } catch (error) {
        console.error('❌ Error fetching ESPN leaders:', error.message);
        res.status(500).json({ error: 'Failed to fetch leaders' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
