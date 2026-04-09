const express = require('express');
const cors = require('cors');
const http = require("http");
const { Server } = require("socket.io");
const { exec } = require("child_process");
const bcrypt = require('bcrypt');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const PORT = Number(process.env.PORT) || 4000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || !JWT_SECRET.trim()) {
  console.error("JWT_SECRET is missing in .env. Server cannot start securely.");
  process.exit(1);
}

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake?.auth?.token;
    if (!token) {
      return next(new Error("Authentication token missing"));
    }
    const payload = jwt.verify(token, JWT_SECRET);
    socket.data.username = payload.username;
    next();
  } catch (error) {
    next(new Error("Authentication failed"));
  }
});

io.on("connection", (socket) => {
  socket.data.joinedDocs = new Set();

  socket.on("join-document", async (docId) => {
    try {
      if (!docId) return;
      const user = await db.get(
        "SELECT user_id FROM users WHERE username = ?",
        [socket.data.username]
      );
      if (!user) return;

      const access = await db.get(
        `
        SELECT d.doc_id
        FROM documents d
        LEFT JOIN collaborators dc ON d.doc_id = dc.doc_id AND dc.user_id = ?
        LEFT JOIN collaborators wc ON d.workspace_id = wc.workspace_id AND wc.user_id = ?
        WHERE d.doc_id = ? AND (d.owner_id = ? OR dc.user_id IS NOT NULL OR wc.user_id IS NOT NULL)
        `,
        [user.user_id, user.user_id, docId, user.user_id]
      );
      if (!access) return;

      socket.join(docId);
      socket.data.joinedDocs.add(docId);
    } catch (error) {
      console.log("Socket join error:", error);
    }
  });

  socket.on("leave-document", (docId) => {
    if (!docId) return;
    socket.leave(docId);
    socket.data.joinedDocs.delete(docId);
  });

  socket.on("code-change", ({ docId, content } = {}) => {
    if (!docId || !socket.data.joinedDocs.has(docId)) return;
    socket.to(docId).emit("receive-changes", { docId, content });
  });

  socket.on("send-message", ({ docId, message, time } = {}) => {
    if (!docId || !message || !socket.data.joinedDocs.has(docId)) return;
    socket.to(docId).emit("receive-message", {
      docId,
      message,
      time: time || new Date().toLocaleTimeString(),
      username: socket.data.username || "Anonymous",
    });
  });
});

app.use(express.json());
app.use(cors())
const dbPath = path.join(__dirname, 'code-collaborative-editor.db');
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    httpServer.listen(PORT);
  } catch (e) {
    process.exit(1);
  }
};

initializeDBAndServer();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let jwtToken;
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    res.status(401).send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, JWT_SECRET, (error, payload) => {
      if (error) {
        res.status(401).send("Invalid JWT Token");
      } else {
        req.username = payload.username;
        next();
      }
    });
  }
};

const getUserByUsername = async (username) => {
  if (!username) return null;
  return db.get("SELECT user_id, username FROM users WHERE username = ?", [username]);
};

const getWorkspaceAccess = async (workspaceId, userId) => {
  const workspace = await db.get(
    "SELECT workspace_id, owner_id FROM workspaces WHERE workspace_id = ?",
    [workspaceId]
  );
  if (!workspace) {
    return { exists: false, hasAccess: false, isOwner: false };
  }
  if (workspace.owner_id === userId) {
    return { exists: true, hasAccess: true, isOwner: true };
  }
  const collaborator = await db.get(
    "SELECT collaborator_id FROM collaborators WHERE workspace_id = ? AND user_id = ?",
    [workspaceId, userId]
  );
  return {
    exists: true,
    hasAccess: Boolean(collaborator),
    isOwner: false,
  };
};

const getDocumentAccess = async (docId, userId) => {
  const document = await db.get(
    "SELECT doc_id, owner_id, workspace_id FROM documents WHERE doc_id = ?",
    [docId]
  );
  if (!document) {
    return { exists: false, hasAccess: false, isOwner: false };
  }
  if (document.owner_id === userId) {
    return { exists: true, hasAccess: true, isOwner: true, workspaceId: document.workspace_id };
  }
  const docCollaborator = await db.get(
    "SELECT collaborator_id FROM collaborators WHERE doc_id = ? AND user_id = ?",
    [docId, userId]
  );
  if (docCollaborator) {
    return { exists: true, hasAccess: true, isOwner: false, workspaceId: document.workspace_id };
  }
  const workspaceAccess = await getWorkspaceAccess(document.workspace_id, userId);
  return {
    exists: true,
    hasAccess: workspaceAccess.hasAccess,
    isOwner: false,
    workspaceId: document.workspace_id,
  };
};

app.post("/register/", async (req, res) => {
  const { email, phoneNo, username, password, name } = req.body;
  const checkUserQuery = `
    SELECT * FROM users WHERE username = ? OR email = ?
  `;
  const existingUser = await db.get(checkUserQuery, [username, email]);
  if (existingUser) {
    return res.status(400).send("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();
  const insertUserQuery = `
    INSERT INTO users (user_id,email, username, password, name)
    VALUES (?, ?, ?, ?, ?)
  `;
  await db.run(insertUserQuery, [
    userId,
    email,
    username,
    hashedPassword,
    name,
  ]);
  res.status(201).json({ userId });
});

app.post("/login/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    const selectUserQuery = `
      SELECT * FROM users WHERE username = ?
    `;
    const dbUser = await db.get(selectUserQuery, [username]);

    if (!dbUser) {
      return res.status(400).send("Invalid User");
    }

    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordMatched) {
      return res.status(400).send("Invalid Password");
    }

    const payload = { username };
    const jwtToken = jwt.sign(payload, JWT_SECRET);

    res.json({ token: jwtToken });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).send("Server error");
  }
});

app.post("/workspaces/", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const username = req.username;
    const normalizedName = String(name || "").trim();
    if (!normalizedName) {
      return res.status(400).send("Workspace name is required");
    }

    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).send("Invalid user");
    }

    const workspaceId = uuidv4();
    const insertWorkspaceQuery = `
      INSERT INTO workspaces (workspace_id, name, owner_id)
      VALUES (?, ?, ?)
    `;

    await db.run(insertWorkspaceQuery, [
      workspaceId,
      normalizedName,
      user.user_id
    ]);

    res.status(201).json({
      workspaceId,
      workspace_id: workspaceId,
      name: normalizedName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.get("/workspaces/", authenticateToken, async (req, res) => {
  const username = req.username;
  const user = await getUserByUsername(username);
  if (!user) {
    return res.status(401).send("Invalid user");
  }

  const workspacesQuery = `
    SELECT DISTINCT w.workspace_id, w.name
    FROM workspaces w
    LEFT JOIN collaborators c ON w.workspace_id = c.workspace_id
    WHERE w.owner_id = ? OR c.user_id = ?
    ORDER BY w.name ASC
  `;

  const workspaces = await db.all(workspacesQuery, [user.user_id, user.user_id]);
  res.json(workspaces);
});

app.post("/workspaces/join", authenticateToken, async (req, res) => {
  const { workspaceId } = req.body;
  const username = req.username;
  const normalizedWorkspaceId = String(workspaceId || "").trim();

  if (!normalizedWorkspaceId) {
    return res.status(400).send("workspaceId is required");
  }

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(401).send("Invalid user");
    }

    const workspaceQuery = `
      SELECT workspace_id, owner_id FROM workspaces WHERE workspace_id = ?
    `;
    const workspace = await db.get(workspaceQuery, [normalizedWorkspaceId]);

    if (!workspace) {
      return res.status(404).send("Workspace not found");
    }

    if (workspace.owner_id === user.user_id) {
      return res.status(200).send("Already joined");
    }

    const existingQuery = `
      SELECT collaborator_id
      FROM collaborators
      WHERE workspace_id = ? AND user_id = ?
    `;
    const existing = await db.get(existingQuery, [workspace.workspace_id, user.user_id]);

    if (existing) {
      return res.status(200).send("Already joined");
    }

    const joinQuery = `
      INSERT INTO collaborators (collaborator_id, workspace_id, user_id, role)
      VALUES (?, ?, ?, ?)
    `;
    await db.run(joinQuery, [uuidv4(), workspace.workspace_id, user.user_id, "collaborator"]);

    res.status(200).send("Joined workspace successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.put("/workspaces/:workspaceId/rename", authenticateToken, async (req, res) => {
  const { workspaceId } = req.params;
  const { newName } = req.body;
  const username = req.username;

  const ownerQuery = `
    SELECT w.workspace_id
    FROM workspaces w
    JOIN users u ON w.owner_id = u.user_id
    WHERE w.workspace_id = ? AND u.username = ?
  `;
  const workspace = await db.get(ownerQuery, [workspaceId, username]);

  if (!workspace) {
    return res.status(403).send("Not authorized");
  }

  const updateWorkspaceQuery = `
    UPDATE workspaces SET name = ?
    WHERE workspace_id = ?
  `;

  await db.run(updateWorkspaceQuery, [newName, workspaceId]);

  res.send("Workspace renamed successfully");
});

app.delete("/workspaces/:workspaceId", authenticateToken, async (req, res) => {
  const { workspaceId } = req.params;
  const username = req.username;

  try {
    const userQuery = `
      SELECT user_id FROM users WHERE username = ?
    `;
    const user = await db.get(userQuery, [username]);

    if (!user) {
      return res.status(401).send("Invalid user");
    }

    const ownerCheckQuery = `
      SELECT workspace_id
      FROM workspaces
      WHERE workspace_id = ? AND owner_id = ?
    `;
    const workspace = await db.get(ownerCheckQuery, [
      workspaceId,
      user.user_id
    ]);

    if (!workspace) {
      return res.status(403).send("Not Authorized");
    }

    await db.run(
      `DELETE FROM collaborators WHERE workspace_id = ?`,
      [workspaceId]
    );

    await db.run(
      `DELETE FROM documents WHERE workspace_id = ?`,
      [workspaceId]
    );

    await db.run(
      `DELETE FROM workspaces WHERE workspace_id = ?`,
      [workspaceId]
    );

    res.send("Workspace deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

app.get("/workspaces/:workspaceId/documents", authenticateToken, async (req, res) => {
  const { workspaceId } = req.params;
  const user = await getUserByUsername(req.username);
  if (!user) {
    return res.status(401).send("Invalid user");
  }
  const workspaceAccess = await getWorkspaceAccess(workspaceId, user.user_id);
  if (!workspaceAccess.exists) {
    return res.status(404).send("Workspace not found");
  }
  if (!workspaceAccess.hasAccess) {
    return res.status(403).send("Not authorized");
  }

  const documentsQuery = `
    SELECT doc_id, title, language
    FROM documents
    WHERE workspace_id = ?
  `;

  const documents = await db.all(documentsQuery, [workspaceId]);
  res.json(documents);
});

app.post("/documents/", authenticateToken, async (req, res) => {
  try {
    const { title, workspaceId, language } = req.body;
    const username = req.username;
    const normalizedTitle = String(title || "").trim();
    if (!normalizedTitle) {
      return res.status(400).send("Document title is required");
    }
    if (!workspaceId) {
      return res.status(400).send("workspaceId is required");
    }

    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).send("Invalid user");
    }

    const workspaceAccess = await getWorkspaceAccess(workspaceId, user.user_id);
    if (!workspaceAccess.exists) {
      return res.status(404).send("Workspace not found");
    }
    if (!workspaceAccess.hasAccess) {
      return res.status(403).send("Not authorized");
    }

    const documentId = uuidv4();

    const insertDocumentQuery = `
      INSERT INTO documents (doc_id, title, content, language, owner_id, workspace_id)
      VALUES (?, ?, '', ?, ?, ?)
    `;

    await db.run(insertDocumentQuery, [
      documentId,
      normalizedTitle,
      language || "javascript",
      user.user_id,
      workspaceId
    ]);

    const insertCollaboratorQuery = `
      INSERT INTO collaborators (collaborator_id, doc_id, user_id, role)
      VALUES (?, ?, ?, ?)
    `;
    await db.run(insertCollaboratorQuery, [uuidv4(), documentId, user.user_id, "owner"]);

    res.status(201).json({ documentId, doc_id: documentId, title: normalizedTitle });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.put("/documents/:docId/save", authenticateToken, async (req, res) => {
  try {
    const { docId } = req.params;
    const { content } = req.body;
    const username = req.username;

    const user = await db.get("SELECT user_id FROM users WHERE username = ?", [username]);
    if (!user) return res.status(401).send("User not found");

    const access = await getDocumentAccess(docId, user.user_id);
    if (!access.exists) {
      return res.status(404).send("Document not found");
    }
    if (!access.hasAccess) {
      return res.status(403).send("Not authorized");
    }

    const updateResult = await db.run(
      "UPDATE documents SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE doc_id = ?",
      [content, docId]
    );
    if (!updateResult || updateResult.changes === 0) {
      return res.status(404).send("Document not found");
    }

    await db.run(
      "INSERT INTO document_history (doc_id, content, saved_by) VALUES (?, ?, ?)",
      [docId, content, user.user_id]
    );

    res.send("Document saved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error while saving");
  }
});

app.get("/documents/:docId/history", authenticateToken, async (req, res) => {
  const { docId } = req.params;

  try {
    const user = await getUserByUsername(req.username);
    if (!user) return res.status(401).send("Invalid user");

    const access = await getDocumentAccess(docId, user.user_id);
    if (!access.exists) {
      return res.status(404).send("Document not found");
    }
    if (!access.hasAccess) {
      return res.status(403).send("Not authorized");
    }

    const historyQuery = `
      SELECT version_id, content, saved_at, saved_by
      FROM document_history
      WHERE doc_id = ?
      ORDER BY saved_at DESC
    `;
    const history = await db.all(historyQuery, [docId]);
    res.send(history);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.get("/documents/:docId", authenticateToken, async (req, res) => {
  const { docId } = req.params;
  const user = await getUserByUsername(req.username);
  if (!user) {
    return res.status(401).send("Invalid user");
  }
  const access = await getDocumentAccess(docId, user.user_id);
  if (!access.exists) {
    return res.status(404).send("Document not found");
  }
  if (!access.hasAccess) {
    return res.status(403).send("Not authorized");
  }

  const documentQuery = `
    SELECT title, content, language
    FROM documents
    WHERE doc_id = ?
  `;
  const document = await db.get(documentQuery, [docId]);

  if (!document) {
    return res.status(404).send("Document not found");
  }

  res.json({
    title: document.title,
    language: document.language,
    content: document.content
  });
});

app.put("/documents/:docId/rename", authenticateToken, async (req, res) => { 
  const { docId } = req.params;
  const { newTitle } = req.body;
  const username = req.username; 
  try {
    const normalizedTitle = String(newTitle || "").trim();
    if (!normalizedTitle) {
      return res.status(400).send("newTitle is required");
    }

    const user = await db.get("SELECT user_id FROM users WHERE username = ?", [username]);
    if (!user) return res.status(401).send("User not found");

    const access = await getDocumentAccess(docId, user.user_id);
    if (!access.exists) {
      return res.status(404).send("Document not found");
    }
    if (!access.hasAccess) {
      return res.status(403).send("Not authorized to rename this document");
    }

    await db.run("UPDATE documents SET title = ? WHERE doc_id = ?", [normalizedTitle, docId]);
    res.send("Document renamed successfully");

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.delete("/documents/:docId", authenticateToken, async (req, res) => {
  const { docId } = req.params;
  const username = req.username;

  const userQuery = `
    SELECT user_id FROM users WHERE username = ?
  `;
  const user = await db.get(userQuery, [username]);
  if (!user) {
    return res.status(401).send("Invalid user");
  }

  const access = await getDocumentAccess(docId, user.user_id);
  if (!access.exists) {
    return res.status(404).send("Document not found");
  }
  if (!access.isOwner) {
    return res.status(403).send("Not authorized");
  }

  await db.run(`DELETE FROM collaborators WHERE doc_id = ?`, [docId]);
  await db.run(`DELETE FROM document_history WHERE doc_id = ?`, [docId]);
  await db.run(`DELETE FROM messages WHERE doc_id = ?`, [docId]);
  await db.run(`DELETE FROM active_users WHERE doc_id = ?`, [docId]);
  await db.run(`DELETE FROM documents WHERE doc_id = ?`, [docId]);

  res.send("Document deleted successfully");
});

app.get('/profile/:userId/', authenticateToken, async (req, res) => {
  const { userId } = req.params;
  const username = req.username;

  try {
    const selectUserQuery = `
      SELECT user_id, username, name
      FROM users
      WHERE user_id = ? AND username = ?
    `;
    const dbUser = await db.get(selectUserQuery, [userId, username]);

    if (!dbUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({
      userId: dbUser.user_id,
      username: dbUser.username,
      name: dbUser.name,
      
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.post("/chat/:docId/", authenticateToken, async (req, res) => {
  const { docId } = req.params;
  const { message } = req.body;
  const username = req.username;

  if (!message) {
    return res.status(400).send("Message cannot be empty");
  }

  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).send("Invalid user");
    }
    const access = await getDocumentAccess(docId, user.user_id);
    if (!access.exists) {
      return res.status(404).send("Document not found");
    }
    if (!access.hasAccess) {
      return res.status(403).send("Not authorized");
    }

    const insertQuery = `
      INSERT INTO messages (doc_id, user_id, message)
      VALUES (?, ?, ?)
    `;
    await db.run(insertQuery, [docId, user.user_id, message]);

    res.send("Message sent!");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.put("/settings/", authenticateToken, async (req, res) => {
    const { theme, fontSize } = req.body;
    const username = req.username;
    try {
        const userQuery = `SELECT user_id FROM users WHERE username = ?;`;
        const user = await db.get(userQuery, [username]);
        const existing = await db.get(
            `SELECT * FROM settings WHERE user_id = ?`,
            [user.user_id]
        );
        if (!existing) {
            const insertQuery = `
                INSERT INTO settings (user_id, theme, font_size)
                VALUES (?, ?, ?);
            `;
            await db.run(insertQuery, [user.user_id, theme, fontSize]);
        } else {
            const updateQuery = `
                UPDATE settings
                SET theme = ?, font_size = ?
                WHERE user_id = ?;
            `;
            await db.run(updateQuery, [theme, fontSize, user.user_id]);
        }
        res.send("Settings updated");
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});

app.post("/workspaces/:workspaceId/collaborators", authenticateToken, async (req, res) => {
  const { workspaceId } = req.params;
  const { role, userId, username: collaboratorUsername } = req.body;
  const username = req.username;
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).send("Invalid user");
    }
    let targetUserId = userId;
    if (!targetUserId && collaboratorUsername) {
      const userByName = await getUserByUsername(collaboratorUsername);
      targetUserId = userByName?.user_id;
    }
    if (!targetUserId) {
      return res.status(400).send("userId or username is required");
    }
    const workspaceAccess = await getWorkspaceAccess(workspaceId, user.user_id);
    const isOwner = workspaceAccess.exists && workspaceAccess.isOwner;
    if (!isOwner) {
      return res.status(403).send("Not Authorized");
    }

    const collaboratorUser = await db.get(
      "SELECT user_id FROM users WHERE user_id = ?",
      [targetUserId]
    );
    if (!collaboratorUser) {
      return res.status(404).send("Collaborator user not found");
    }

    const existing = await db.get(
      "SELECT collaborator_id FROM collaborators WHERE workspace_id = ? AND user_id = ?",
      [workspaceId, targetUserId]
    );
    if (existing) {
      return res.status(200).send("Collaborator already added");
    }

    const collaboratorId = uuidv4();
    const insertCollaboratorQuery = `
      INSERT INTO collaborators (collaborator_id, workspace_id, user_id, role)
      VALUES (?, ?, ?, ?)
    `;
    await db.run(insertCollaboratorQuery, [collaboratorId, workspaceId, targetUserId, role || "collaborator"]);
    res.status(200).json({ userId: targetUserId });
  } catch (e) {
    console.log(e);
    res.status(500).send("server error: " + e);
  }
})

app.delete("/workspaces/:workspaceId/collaborators/:userId", authenticateToken, async (req, res) => {
  const { workspaceId, userId } = req.params;
  const username = req.username;
  try {
    const userQuery = ` SELECT user_id FROM users WHERE username = ? `;
    const user = await db.get(userQuery, [username]);
    const ownerQuery = ` SELECT workspace_id FROM workspaces WHERE workspace_id = ? AND owner_id = ? `;
    const isOwner = await db.get(ownerQuery, [workspaceId, user.user_id]);
    if (!isOwner) {
      res.status(403).send("Not Authorized");
    } else {
      const deleteCollaboratorQuery = ` DELETE FROM collaborators WHERE workspace_id = ? AND user_id = ? `;
      await db.run(deleteCollaboratorQuery, [workspaceId, userId]);
      res.status(200).send("Collaborator Deleted Successfully..")
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("server error: " + e);
  }
})

app.post("/documents/:docId/run", authenticateToken, async (req, res) => {
    const { content, language } = req.body;
    const { docId } = req.params;
    const username = req.username;

    console.log(`--- Execution Request ---`);
    console.log(`ID: ${docId} | Language: ${language}`);

    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ output: "Invalid user" });
        }
        const access = await getDocumentAccess(docId, user.user_id);
        if (!access.exists) {
            return res.status(404).json({ output: "Document not found" });
        }
        if (!access.hasAccess) {
            return res.status(403).json({ output: "Not authorized" });
        }

        const tempDir = path.resolve(__dirname, "temp");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        let filePath;
        let command;
        let args = [];

        if (language === "javascript") {
            filePath = path.join(tempDir, `${docId}.js`);
            command = "node";
        } else if (language === "python") {
            filePath = path.join(tempDir, `${docId}.py`);
            fs.writeFileSync(filePath, content, "utf8");
            
            command = "C:\\Users\\LENOVO\\AppData\\Local\\Programs\\Python\\Python312\\python.exe";
            
            args = [filePath];
        }else {
            return res.status(400).json({ output: "Unsupported language selected." });
        }

        fs.writeFileSync(filePath, content, "utf8");
        args = [filePath];

        let output = "";
        let errorOutput = "";
        let responseSent = false;

        const child = spawn(command, args);

        child.stdout.on("data", (data) => {
            output += data.toString();
        });

        child.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        child.on("close", (code) => {
            if (!responseSent) {
                responseSent = true;
                // If there's errorOutput (like a syntax error), return that, otherwise return stdout
                const finalResult = errorOutput || output || "Program finished with no output.";
                res.json({ output: finalResult });
                
                // Cleanup file
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        });

        child.on("error", (err) => {
            if (!responseSent) {
                responseSent = true;
                console.error("Spawn Error:", err.message);
                res.json({ 
                    output: `System Error: Could not find the '${command}' executable. Please ensure ${language} is installed and added to your PATH.` 
                });
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        });

        // 5. Timeout protection (5 seconds)
        setTimeout(() => {
            if (!responseSent) {
                responseSent = true;
                child.kill();
                res.json({ output: "Execution timed out (5 seconds)." });
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        }, 5000);

    } catch (err) {
        console.error("Server Catch Block:", err);
        res.status(500).json({ output: "Internal Server Error: " + err.message });
    }
});

