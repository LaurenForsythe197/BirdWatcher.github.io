window.AI = {

    identifyBird: async function(imageData) {

        const response = await fetch(
            fetch("https://birdwatcher.yourname.workers.dev/identifyBird",
            {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    model: "gpt-4.1",
                    input: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "input_text",
                                    text:
                                    `Identify this bird.
                                    Return ONLY valid JSON.
                                    
                                    {
                                      "species_name":"",
                                      "common_name":"",
                                      "scientific_name":"",
                                      "confidence":"high|medium|low",
                                      "estimated_age":"adult|juvenile|unknown",
                                      "gender":"male|female|unknown",
                                      "identifying_features":"",
                                      "habitat":"",
                                      "fun_fact":""
                                    }`
                                },
                                {
                                    type: "input_image",
                                    image_url: imageData
                                }
                            ]
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            throw new Error("OpenAI returned " + response.status);
        }

        const data = await response.json();
        console.log(data);
        const text =
            data.output[0].content[0].text;
        return JSON.parse(text);
    }
};
