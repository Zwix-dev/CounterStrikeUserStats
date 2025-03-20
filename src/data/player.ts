"use server"
export async function getPlayerBySteam(url:string) {
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
            } catch(e) {
                return {error:"Erreur d'url"};
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
            return data;
        } catch(e) {
            return {error:"ID steam introuvable"}
        }
       
       
    }
}