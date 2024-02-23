const OpenAI = require("openai");
const AIRoleEnums = require("../enums/ai_roles.enum");

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY,
});
const createAssistant = async (name, instructions) => {
    return openai.beta.assistants.create({
        name : name,
        instructions : instructions,
        tools : [{type : process.env.OPEN_AI_TOOL_TYPE}],
        model : process.env.OPEN_AI_ENGINE_ID,
    });
}

const createThread = async () => {
    return openai.beta.threads.create();
}

const addMessageToThread = async (threadId, message) => {
    return openai.beta.threads.messages.create(
        threadId,
        {
            role : AIRoleEnums.USER,
            content : message,
        }
    );
}

const runAssistant = async (threadId,assistantId,instructions) => {
    return openai.beta.threads.runs.create(
        threadId,
        {
            assistant_id: assistantId,
            instructions: instructions,
        }
    );
}

module.exports = {
    createAssistant,
    createThread,
    addMessageToThread,
    runAssistant,
}