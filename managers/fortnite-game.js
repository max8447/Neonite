const { default: axios } = require("axios");
const { application } = require('express')


/**
 * 
 * @param {application} app 
 * @param {String} port 
 */
module.exports = (app, port) => {


    function getSeasonInfo(req) {
        
        const userAgent = req.headers["user-agent"];
        const season = userAgent.split('-')[1];
        const seasonglobal = season.split('.')[0];
        return { season, seasonglobal };
        
    }
    
    app.get(["/content/api/pages/fortnite-game", "/content/api/pages/"], async (req, res) => {
        const content = (await axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game').catch(() => {})).data;
        try{
        const { season, seasonglobal } = getSeasonInfo(req);
        const fortnitegame = JSON.parse(JSON.stringify(require("../fortnitegame.json"))); //maybe just doing "require" causes problems
        const backgrounds = fortnitegame.dynamicbackgrounds.backgrounds.backgrounds;
        fortnitegame.shopSections = content.shopSections;
        switch (seasonglobal) {
            case "10":
                backgrounds[0].stage = "seasonx";
                break;
            case "11":
                if (season === "11.31" || season === "11.40") {
                    backgrounds[0].stage = "Winter19";
                } else {
                    backgrounds[0].stage = "season11";
                }
                break;
            case "12":
                backgrounds[0].stage = "season12";
                break;
            case "13":
                backgrounds[0].stage = "season13";
                break;
            case "14":
                backgrounds[0].stage = "season14";
                break;
            case "15":
                backgrounds[0].stage = "season15";
                break;
            case "16":
                backgrounds[0].stage = "season16";
                break;
            case "17":
                backgrounds[0].stage = "season17";
                break;
            case "18":
                backgrounds[0].stage = "season18";
                break;
            case "19":
                if (season === "19.01") /*if it doesnt work i didnt get chance to test it cause the build has not been uploaded - unrealhybrid*/ {
                    backgrounds[0].stage = "winter2021";
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp19-lobby-xmas-2048x1024-f85d2684b4af.png";
                } else {
                    backgrounds[0].stage = "season19";
                }
                break;
            case "20":
                if (season === "20.40") {
                    backgrounds[0].stage = "season20";
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp20-40-armadillo-glowup-lobby-2048x2048-2048x2048-3b83b887cc7f.jpg";
                } else {
                    backgrounds[0].stage = "season20";
                }
                break;
            case "21":
                if (season === "21.30") {
                    backgrounds[0].stage = "season2130";
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/nss-lobbybackground-2048x1024-f74a14565061.jpg";
                } else {
                    backgrounds[0].stage = "season2100";
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s21-lobby-background-2048x1024-2e7112b25dc3.jpg";
                }
                break;
                case "22":
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp22-lobby-square-2048x2048-2048x2048-e4e90c6e8018.jpg";
                break;
                case "23":
                    if(season === "23.10")
                    {   
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp23-winterfest-lobby-square-2048x2048-2048x2048-277a476e5ca6.png"
                    }
                    else{
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp23-lobby-2048x1024-2048x1024-26f2c1b27f63.png"
                    }
                break;
            default:
                backgrounds[0].backgroundimage = content.dynamicbackgrounds.backgrounds.backgrounds[0].backgroundimage;
                backgrounds[0].stage = content.dynamicbackgrounds.backgrounds.backgrounds[0].stage;
        }
        return res.json(fortnitegame);
    }
    catch{}
    });
    
        

       
    
    app.post("/api/v1/fortnite-br/surfaces/motd/target", (req, res) => {
        res.json({
            	"contentType": "collection",
		"contentId": "motd-default-collection",
		"tcId": "cca20b46-eb7d-4852-94b9-8479ddb53b2d",
		"contentItems": [
			{
				"contentType": "content-item",
				"contentId": "753b2fed-a492-4e11-a34f-9741cc739d47",
				"tcId": "9b89584d-0711-4269-980d-09d50d04f857",
				"contentFields": {
					"body": "Made by Kemo (@xkem0x) and maintained by Beat (@TheBeatYT_evil). If you have any bugs, you can join our Discord by clicking the button below.",
					"entryType": "Website",
					"image": [
						{
							"width": 1920,
							"height": 1080,
							"url": `http://127.0.0.1:${port}/NeoniteWallpaper1920x1080.png`
						},
						{
							"width": 960,
							"height": 540,
							"url": `http://127.0.0.1:${port}/NeoniteWallpaper1920x1080.png`
						}
					],
					"tabTitleOverride": "NeoniteV2",
					"tileImage": [
						{
							"width": 1024,
							"height": 512,
							"url": `http://127.0.0.1:${port}/NeoniteWallpaper1920x1080.png`
						}
					],
					"title": "NeoniteV2",
					"websiteButtonText": "Join our discord",
            				"websiteURL": "https://discord.gg/DJ6VUmD",
            				"websiteSKickIntroDo": false
				},
				"contentSchemaName": "MotdWebsiteNews"
			}
		]
        })
    })
}