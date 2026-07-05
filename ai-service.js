window.AI = {

    identifyBird: async function(imageData) {

        const response = await fetch(
            "https://birdwatcher-ai.laurenforsythe197.workers.dev/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    image: imageData
                })
            }
        );

        if (!response.ok) {
            throw new Error("OpenAI returned " + response.status);
        }

        return await response.json();
    }
};
