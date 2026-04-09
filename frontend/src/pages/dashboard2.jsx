import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDelete,
  MdEdit,
  MdMenu,
  MdClose,
  MdContentCopy,
  MdGroupAdd,
} from "react-icons/md";
import Popup from "../components/Popup/popup";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [workspaces, setWorkspaces] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showWsModal, setShowWsModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [newWsName, setNewWsName] = useState("");
  const [joinWsId, setJoinWsId] = useState("");
  const [newDocData, setNewDocData] = useState({ title: "", language: "javascript" });
  const [renamingId, setRenamingId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchWorkspaces();
  }, [token, navigate]);

  useEffect(() => {
    if (activeWorkspace) {
      fetchDocuments(activeWorkspace.workspace_id);
      sessionStorage.setItem("activeWorkspaceId", activeWorkspace.workspace_id);
    }
  }, [activeWorkspace]);

  const triggerPopup = (message, type = "success") => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 2000);
  };

  const fetchWorkspaces = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/workspaces/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setWorkspaces(data);

    const savedId = sessionStorage.getItem("activeWorkspaceId");
    if (savedId) {
      const found = data.find(w => String(w.workspace_id) === String(savedId));
      if (found) setActiveWorkspace(found);
    }
  };

  const fetchDocuments = async (wsId) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/workspaces/${wsId}/documents`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setDocuments(data);
  };

  const handleJoinWorkspace = async (e) => {
    e.preventDefault();
    if (!joinWsId.trim()) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/workspaces/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ workspaceId: joinWsId }),
    });

    if (res.ok) {
      setJoinWsId("");
      triggerPopup("Joined successfully!");
      fetchWorkspaces();
    } else {
      triggerPopup("Could not join workspace", "error");
    }
  };

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    if (!newWsName.trim()) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/workspaces/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newWsName }),
    });

    if (res.ok) {
      const ws = await res.json();
      setNewWsName("");
      setShowWsModal(false);
      triggerPopup("Workspace created");
      setWorkspaces(prev => [...prev, ws]);
      setActiveWorkspace(ws);
    } else {
      triggerPopup("Failed to create workspace", "error");
    }
  };

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    if (!newDocData.title.trim() || !activeWorkspace) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/documents/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...newDocData,
        workspaceId: activeWorkspace.workspace_id,
      }),
    });

    if (res.ok) {
      setNewDocData({ title: "", language: "javascript" });
      setShowDocModal(false);
      triggerPopup("File created");
      fetchDocuments(activeWorkspace.workspace_id);
    }
  };

  const handleDeleteWorkspace = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete?")) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/workspaces/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      triggerPopup("Deleted", "error");
      if (activeWorkspace?.workspace_id === id) {
        setActiveWorkspace(null);
        setDocuments([]);
      }
      fetchWorkspaces();
    }
  };

  const handleDeleteDocument = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete?")) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/documents/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      triggerPopup("Deleted", "error");
      fetchDocuments(activeWorkspace.workspace_id);
    }
  };

  const handleRenameDocument = async (docId) => {
    if (!tempTitle.trim()) {
      setRenamingId(null);
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/documents/${docId}/rename`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newTitle: tempTitle }),
    });

    if (res.ok) {
      setDocuments(prev =>
        prev.map(d =>
          d.doc_id === docId ? { ...d, title: tempTitle } : d
        )
      );
      triggerPopup("Renamed");
    }

    setRenamingId(null);
  };

  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    triggerPopup("ID copied");
  };

  return (
    <div className={`dashboardContainer ${isSidebarOpen ? "" : "sidebar-closed"}`}>
      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      )}

      {showWsModal && (
        <div className="modalOverlay" onClick={() => setShowWsModal(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h3>New Workspace</h3>
            <form onSubmit={handleCreateWorkspace}>
              <input autoFocus value={newWsName} onChange={(e) => setNewWsName(e.target.value)} />
              <div className="modalActions">
                <button type="button" className="cancelBtn" onClick={() => setShowWsModal(false)}>Cancel</button>
                <button type="submit" className="confirmBtn">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDocModal && (
        <div className="modalOverlay" onClick={() => setShowDocModal(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h3>New File</h3>
            <form onSubmit={handleCreateDocument}>
              <input autoFocus value={newDocData.title} onChange={(e) => setNewDocData({ ...newDocData, title: e.target.value })} />
              <select value={newDocData.language} onChange={(e) => setNewDocData({ ...newDocData, language: e.target.value })}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
              </select>
              <div className="modalActions">
                <button type="button" className="cancelBtn" onClick={() => setShowDocModal(false)}>Cancel</button>
                <button type="submit" className="confirmBtn">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="sidebar">
        <div className="sidebarTop">
          <h2 className="logo">CodeCollab</h2>
          <button className="primaryBtn" onClick={() => setShowWsModal(true)}>+ New Workspace</button>

          <form onSubmit={handleJoinWorkspace} className="joinForm">
            <input value={joinWsId} onChange={(e) => setJoinWsId(e.target.value)} />
            <button className="addWorkspaceBtn" type="submit"><MdGroupAdd /></button>
          </form>

          <div className="workspaceList"
          style={{
               overflowY: workspaces.length > 6 ? "auto" : "hidden",      }}
          >
            {workspaces.map(ws => (
              <div
                key={ws.workspace_id}
                className={`workspaceItem ${activeWorkspace?.workspace_id === ws.workspace_id ? "active" : ""}`}
                onClick={() => setActiveWorkspace(ws)}
              >
                <span>{ws.name}</span>
                <button className="deleteWsBtn" onClick={(e) => handleDeleteWorkspace(e, ws.workspace_id)}>
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="logoutBtn" onClick={() => { sessionStorage.clear(); navigate("/login"); }}>
          Logout
        </button>
      </div>

      <div className="mainArea"
      style={{
             overflowY: documents.length > 6 ? "auto" : "hidden",
         }}>
        <div className="dashboardHeader">
          <div className="headerLeft">
            <button className="hamburgerBtn" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <MdClose /> : <MdMenu />}
            </button>
            <h2>{activeWorkspace ? activeWorkspace.name : "Select Workspace"}</h2>
            {activeWorkspace && (
              <div onClick={() => copyId(activeWorkspace.workspace_id)}>
                ID: {activeWorkspace.workspace_id.slice(0, 8)}...
                <MdContentCopy />
              </div>
            )}
          </div>

          {activeWorkspace && (
            <button className="secondaryBtn" onClick={() => setShowDocModal(true)}>
              + New File
            </button>
          )}
        </div>

        <div className="documentsGrid">
          {documents.map(doc => (
            <div
              key={doc.doc_id}
              className="docCard"
              onClick={() => renamingId !== doc.doc_id && navigate(`/document/${doc.doc_id}`)}
            >
              <div className="docCardHeader">
                {renamingId === doc.doc_id ? (
                  <input
                    autoFocus
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onBlur={() => handleRenameDocument(doc.doc_id)}
                    onKeyDown={(e) => e.key === "Enter" && handleRenameDocument(doc.doc_id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <h4>{doc.title}</h4>
                )}
                <div>
                  <button className="renameDocBtn" onClick={(e) => { e.stopPropagation(); setRenamingId(doc.doc_id); setTempTitle(doc.title); }}>
                    <MdEdit />
                  </button>
                  <button  className="deleteDocBtn" onClick={(e) => handleDeleteDocument(e, doc.doc_id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
              <p className="langTag">{doc.language}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

