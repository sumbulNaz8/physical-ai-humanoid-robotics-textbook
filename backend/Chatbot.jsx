import { useState } from "react";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: message,
        mode: "chat",
      }),
    });

    const data = await res.json();
    setReply(data.answer);
  };

  return (
    <div>
      <h2>Chatbot</h2>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your question"
      />

      <button onClick={sendMessage}>Send</button>

      <p>{reply}</p>
    </div>
  );
}
