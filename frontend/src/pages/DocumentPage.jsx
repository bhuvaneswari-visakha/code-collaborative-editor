import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";
import "./dashboard.css";
import "./document.css";

const DocumentPage = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const socketRef = useRef(null);
  const remoteContentRef = useRef(null);

  const [editorContent, setEditorContent] = useState("");
  const [terminalOutput, setTerminalOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [chatMessages, setChatMessages] = useState([]);
const [chatInput, setChatInput] = useState("");
const [isChatOpen, setIsChatOpen] = useState(false);

  const triggerPopup = (message, type = "success") => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup((prev) => ({ ...prev, show: false }));
    }, 2000);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return undefined;
    }

    const socket = io(`${import.meta.env.VITE_API_URL}`, {
      auth: { token },
    });
    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, navigate]);

  useEffect(() => {
    if (!docId) return;

    const fetchDocument = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/documents/${docId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        triggerPopup("Failed to load document", "error");
        return;
      }
      const data = await res.json();
      setEditorContent(data.content || "");
      setLanguage(data.language || "javascript");
    };

    fetchDocument();
  }, [docId, token]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!docId || !socket) return undefined;

    socket.emit("join-document", docId);

    const handleReceiveChanges = (payload) => {
      if (!payload || payload.docId !== docId) return;
      remoteContentRef.current = payload.content ?? "";
      setEditorContent(payload.content ?? "");
    };

    const handleReceiveMessage = (messageData) => {
      if (!messageData || messageData.docId !== docId) return;
      setChatMessages((prev) => [...prev, messageData]);
    };

    socket.on("receive-changes", handleReceiveChanges);
    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.emit("leave-document", docId);
      socket.off("receive-changes", handleReceiveChanges);
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [docId]);

const handleSendMessage = () => {
  const socket = socketRef.current;
  if (!chatInput.trim()) return;
  if (!socket || !docId) return;

  const messageData = {
    docId,
    message: chatInput,
    time: new Date().toLocaleTimeString(),
    username: "You",
  };

  socket.emit("send-message", messageData);
  setChatMessages((prev) => [...prev, { ...messageData, self: true }]);
  setChatInput("");
};


  const handleEditorChange = (value) => {
    if (value === null || value === undefined) return;

    if (remoteContentRef.current !== null && value === remoteContentRef.current) {
      remoteContentRef.current = null;
      setEditorContent(value);
      return;
    }

    setEditorContent(value);
    const socket = socketRef.current;
    if (socket && docId) {
      socket.emit("code-change", { docId, content: value });
    }
  };

  const handleSave = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/documents/${docId}/save`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: editorContent }),
    });

    if (res.ok) {
      triggerPopup("File saved successfully!");
    } else {
      triggerPopup("Save failed", "error");
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setTerminalOutput("Executing code...");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/documents/${docId}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: editorContent,
        language,
      }),
    });

    const data = await res.json();
    setTerminalOutput(data.output);
    setIsRunning(false);
  };

  return (
    <div className="documentContainer">
      {popup.show && (
        <div className={`popup ${popup.type}`}>{popup.message}</div>
      )}

      <div className="documentHeader">
        <div className="leftActions">
          <button className="backBtn" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
        <div className="rightActions">
          <button
            className="runBtn"
            onClick={handleRun}
            disabled={isRunning || !language}
          >
             {isRunning ? "Running..." : "Run"} <MdPlayArrow/>
          </button>
          <button className="saveBtn" onClick={handleSave}>
            Save
          </button>
          <button
              className="chatToggleBtn"
              onClick={() => setIsChatOpen((prev) => !prev)}
            >
              Discussion
            </button>

        </div>
      </div>

      <div className="editorTerminalWrapper">
        <div className="editorContainer">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={editorContent}
            onChange={handleEditorChange}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              wordWrap: "on",
            }}
          />
        </div>

        <div className="terminalContainer">
          <div className="terminalHeader">Output/Preview</div>
          <div className="terminalOutput">
            {language === "html" ? (
              <iframe
                title="preview"
                srcDoc={editorContent}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  background: "white",
                }}
              />
            ) : (
              <pre>{terminalOutput}</pre>
            )}
          </div>
        </div>
          {isChatOpen && (
            <div className="chatContainer">
              <div className="chatHeader">
                <span>Discussion</span>
              </div>

              <div className="chatMessages">
                {chatMessages.filter((msg) => msg.docId === docId).map((msg) => (
                  <div
                    key={`${msg.time}-${msg.username}-${msg.message}`}
                    className={`chatMessage ${msg.self ? "self" : ""}`}
                  >
                    
                      <span className="chatName">{msg.username}</span>
                    
                    <p className="chatText">{msg.message}</p>
                    <span className="timestamp">{msg.time}</span>
                  </div>
                ))}
              </div>

              <div className="chatInputWrapper">
                <input
                  type="text"
                  placeholder="Start Chat..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          )}


      </div>
    </div>
  );
};

export default DocumentPage;
