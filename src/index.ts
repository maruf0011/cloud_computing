import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get('/hello', (req, res) => {
    res.send('hello LOL.===');
});

app.get('/retrieve_files', (req, resp) => {
    resp.send([
        {
            file_name: 'test.ttf',
            file_size: '50mb',
            scan_params: [
                'params1',
                'params2'
            ]
        },
        {
            file_name: 'test2.ttf',
            file_size: '50mb',
            scan_params: [
                'params3',
                'params4'
            ]
        }
    ]);
});

app.post('/perform_analytics', (req, resp) => {
    const file_name = req.body.file_name;

    resp.send({
        id: 'andc3x3dafeds',
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