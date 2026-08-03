import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const ChatBot = () => {

    const { axios } = useAppContext();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "👋 Hello! I'm GoCarRent AI. How can I help you today?"
        }
    ]);

    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMessage = {
            role: "user",
            content: message
        };

        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setMessage("");
        setLoading(true);

        try {

            const history = updatedMessages
                .slice(0, -1)
                .map(msg => ({
                    role: msg.role,
                    content: msg.content
                }));

            const { data } = await axios.post("/api/chat", {
                message: userMessage.content,
                history
            });

            if (data.success) {
                setMessages(prev => [
                    ...prev,
                    {
                        role: "assistant",
                        content: data.reply
                    }
                ]);
            } else {
                setMessages(prev => [
                    ...prev,
                    {
                        role: "assistant",
                        content: data.message || "Something went wrong."
                    }
                ]);
            }

        } catch (error) {

            console.log(error);

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: "❌ Unable to connect to AI."
                }
            ]);

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-primary text-white shadow-xl text-3xl z-50"
            >
                💬
            </button>

            {/* Chat Window */}
            {open && (
                <div className="fixed bottom-24 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl border flex flex-col z-50">

                    {/* Header */}
                    <div className="bg-primary text-white p-4 rounded-t-2xl">
                        <h2 className="font-bold text-lg">
                            GoCarRent AI
                        </h2>

                        <p className="text-sm opacity-90">
                            Ask me anything about GoCarRent
                        </p>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">

                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={`flex ${msg.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2 rounded-xl ${msg.role === "user"
                                            ? "bg-primary text-white"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>

                        ))}

                        {loading && (
                            <div className="text-sm text-gray-500">
                                🤖 AI is typing...
                            </div>
                        )}

                        <div ref={bottomRef}></div>

                    </div>

                    {/* Input */}
                    <div className="border-t p-3 flex gap-2">

                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            placeholder="Type your message..."
                            className="flex-1 border rounded-lg px-3 py-2 outline-none"
                        />

                        <button
                            onClick={sendMessage}
                            className="bg-primary text-white px-4 rounded-lg hover:opacity-90"
                        >
                            Send
                        </button>

                    </div>

                </div>
            )}
        </>
    );
};

export default ChatBot;