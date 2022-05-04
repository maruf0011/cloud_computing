import express from "express";
import cors from "cors";
import crypto from 'crypto';
import bodyParser from "body-parser";
import { spawn } from 'child_process';
import fs from 'fs';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    res.send('hello LOL.===');
});

app.get('/retrieve_files', (req, res) => {
    try {
        const files = fs.readdirSync('./image_dir', { withFileTypes: true }).filter(info => (info.isFile() && info.name.endsWith('png')));
        const name_list = files.map(f_info => {
            const f_stat = fs.statSync('./image_dir/' + f_info.name);
            let file_exist = fs.existsSync('./results/' + f_info.name + '.txt');

            let dice_score = '0.0';
            let status = 'Not analyzed.'
            if (file_exist) {
                dice_score = fs.readFileSync('./results/' + f_info.name + '.txt').toString();
                status = "Analyzed.";
            }

            return ({
                "fileId": "",
                "fileName": f_info.name,
                "status": status,
                "diceOutput": dice_score,
                "share": "Share with everybody",
                "imageUrl": "https://raw.githubusercontent.com/PreyeaRegmi/RICE-Portal/dev/src/assets/img/60190-S70.jpg",
                "matUrl": "",
                "fileDetail": {
                    "metaData": [
                        "Sample Organism : Mitochondria",
                        "Sampling Time : 1800 miliseconds"
                    ],
                    "scanParameter": [
                        "Resolution of Image : 3840 X 2160",
                        "No of images in volume : 30"
                    ],
                    "analyticsOutput": [
                        "Precision : N/A",
                        "DiceOutput : " + dice_score
                    ],
                    "shareStatus": [
                        "Share Status : Share with everybody"
                    ]
                }
            })
        });
        // console.log(name_list)
        res.send(name_list);
    }
    catch (error) {
        console.log(error);
        return res.json({
            status: 0,
            msgType: "error",
            msg: `Error Messgae: ${error}`
        });
    }
});

app.post('/perform_analytics', (req, resp) => {
    // console.log(req)
    const file_name = req.body.file_name;
    // const uuid = crypto.randomUUID();

    spawn('python3', ['mito_demo_inference_small.py', req.body.file_name]);
    resp.send({
        id: "uuid",
        file_name
    });
});

// app.get('/get_processed_result/:id', (req, resp) => {
//     const process_id = req.params.id;

//     resp.send({
//         dice_score: 50,
//         precision: .5,
//         recall: .5,
//         f1_score: .5
//     });
// });

app.get('/get_action_recommendation/', (req, resp) => {
    const process_id = req.body.fileid;
    console.log("here is the id...", process_id)
    var final_data = [
        {
            "actionId": "1",
            "actionMessage": "Change Resolution of your image to",
            "actionsOptions": [
                {
                    "actionOptionId": "1",
                    "actionName": "720p",
                    "semCommand": {}
                },
                {
                    "actionOptionId": "3",
                    "actionName": "1080p",
                    "semCommand": {}
                },
                {
                    "actionOptionId": "4",
                    "actionName": "1920p",
                    "semCommand": {}
                },
                {
                    "actionOptionId": "5",
                    "actionName": "3160p",
                    "semCommand": {}
                }
            ]
        },
        {
            "actionId": "2",
            "actionMessage": "Change size of image to",
            "actionsOptions": [
                {
                    "actionOptionId": "8",
                    "actionName": "1024 X 1024",
                    "semCommand": {}
                },
                {
                    "actionOptionId": "9",
                    "actionName": "2048 X 2048",
                    "semCommand": {}
                }
            ]
        },
        {
            "actionId": "3",
            "actionMessage": "Move sample stage to",
            "actionsOptions": [
                {
                    "actionOptionId": "10",
                    "actionName": "X : 125",
                    "semCommand": {}
                },
                {
                    "actionOptionId": "11",
                    "actionName": "Y : 250",
                    "semCommand": {}
                }
            ]
        }
    ]

    resp.send(final_data)
});




app.listen(3000);