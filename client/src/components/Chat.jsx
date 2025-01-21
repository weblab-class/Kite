import { post } from "../utilities";

function Chat() {
    const handleChat = async () => {
        try {
            const response = await post("/api/chat", {
                prompt: "write a haiku about ai"
            });
            console.log("AI Response:", response);
        } catch (error) {
            console.error("Chat error:", error);
        }
    };

    return (
        <button onClick={handleChat}>
            Generate Haiku
        </button>
    );
}

export default Chat; 