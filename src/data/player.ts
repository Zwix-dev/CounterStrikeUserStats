"use server"
export async function getFaceitPlayerBySteam(url: string) {
    const regex = new RegExp("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")
    if (regex.test(url)) {
        const match = url.match(/\/(\d+)\/$/);
        if (match) {
            const steamId = match[1];
            try {
                const response = await fetch(`https://open.faceit.com/data/v4/players?game=csgo&game_player_id=${steamId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${process.env.FACEIT_SERVER_SIDE_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                return data;
            } catch (e) {
                return { error: "Erreur d'url" };
            }
        }
    } else {
        try {
            const response = await fetch(`https://open.faceit.com/data/v4/players?game=csgo&game_player_id=${url}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${process.env.FACEIT_SERVER_SIDE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data) {
                return data;
            } else {
                return { error: "ID steam introuvable" }
            }


        } catch (e) {
            return { error: e }
        }
    }
}

export async function getSteamPlayerBySteam(url: string) {
    const regex = new RegExp("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")
    if (regex.test(url)) {
        const match = url.match(/\/(\d+)\/$/);
        if (match) {
            const steamId = match[1];
            try {
                const response = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_WEB_API}&steamids=${steamId}`, {
                    method: 'GET',

                });
                const data = await response.json();
                return data;
            } catch (e) {
                return { error: "Erreur d'url" };
            }
        }
    } else {
        try {
            const response = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_WEB_API}&steamids=${url}`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data) {
                return data;
            } else {
                return { error: "ID steam introuvable" }
            }


        } catch (e) {
            return { error: e }
        }
    }
}

export async function getFaceit(idFaceit: string) {


    try {
        const response = await fetch(`https://open.faceit.com/data/v4/players/${idFaceit}/history`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.FACEIT_SERVER_SIDE_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data) {
            return data;
        } else {
            return { error: "ID steam introuvable" }
        }


    } catch (e) {
        return { error: e }
    }
}
