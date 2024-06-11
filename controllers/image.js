const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = '66a2300af8e04f40bcc712795358c3ba';
    const USER_ID = 'carstendold';
    const APP_ID = 'face-recognition-brain';
    // const MODEL_ID = 'face-detection';
    const IMAGE_URL = imageUrl; 
  
    const raw = JSON.stringify({
        "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
        },
        "inputs": [
            {
            "data": {
                "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
    
    const requestOptions = {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions
}

const handleApiCall = (request, response) => {
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(request.body.input))
        .then(response => response.json())
        .then(data => {
            response.json(data);
        })
        .catch(error => response.status(400).json('Unable to do API call'))
}

const handleImage = (request, response, supabase) => {
    const { id } = request.body;
    supabase('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        response.json(entries[0].entries);
    })
    .catch(err => response.status(400).json('Unable to get entries'))
}

export { handleImage, handleApiCall };