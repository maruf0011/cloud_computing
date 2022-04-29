import express from "express";
import cors from "cors";
import fs from 'fs';
import crypto from 'crypto';
import { spawn } from 'child_process';
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    res.send('hello LOL.===');
});

app.get('/retrieve_files', (req, resp) => {
    const files = fs.readdirSync('./image_dir', { withFileTypes: true }).filter(info => (info.isFile() && info.name.endsWith('png')));
    const name_list = files.map(f_info => {
        const f_stat = fs.statSync('./image_dir/' + f_info.name);
        return ({
            file_name: f_info.name,
            file_size: f_stat.size
        });
    });
    resp.send(name_list);
});

app.post('/perform_analytics', (req, resp) => {
    // console.log(req)
    const file_name = req.body.file_name;

    const uuid = crypto.randomUUID();


    // spawn('python', ['filename.py', file_name, uuid]);
    resp.send({
        id: uuid,
        file_name
    });
});

app.get('/get_processed_result/:id', (req, resp) => {
    const process_id = req.params.id;

    resp.send({
        dice_score: 50,
        precision: .5,
        recall: .5,
        f1_score: .5
    });
});


app.get('/get_action_recommendation/:id', (req, resp) => {
    const process_id = req.params.id;
    resp.send([
        {
            "actionId": "uniqueId",
            "actionMessage": "Change Resolution",
            "actionsOptions": [
                {
                    "actionOptionId": "uniqueId",
                    "actionName": "a) 1080p",
                    "semCommand": {}
                },
                {
                    "actionOptionId": "uniqueId",
                    "actionName": "a) 720p",
                    "semCommand": {}
                }
            ]
        }
    ])
});




app.listen(3000);