const { Configuration, OpenAIApi } = require('openai');
const fs = require("fs")
const summarizer = require('summarizefy')
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const createImageByText = async (prompt) => {
    try {
        //prompt = summarizer(prompt);
        console.log(prompt);

        const result = await openai.createImage({
            prompt,
            model: "dall-e-3",
            n: 1,
            size: "1024x1024",
            style: "vivid",
            user: "akifcan özbulut"
        });

        const url = result.data.data[0].url;
        console.log(url)
        return url;
    } catch (error) {
        console.error('Error in createImageByText:', error);
        throw error; // rethrow the error for further handling
    }
};

module.exports = { createImageByText }

