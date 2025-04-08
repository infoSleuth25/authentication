# 🔐 Authentication vs Authorization

Understanding the difference between **Authentication** and **Authorization** is crucial for building secure web applications. Here's a simple breakdown with examples, use cases, and best practices.

---

## ✅ What is Authentication?

> 🔍 **Authentication answers:** *"Who are you?"*

Authentication is the process of verifying the identity of a user. It ensures that users are who they claim to be.

### 🔑 Common Methods:
- Username & Password
- OTP (One-Time Password)
- Social Login (Google, GitHub via OAuth2)
- Biometrics (Fingerprint, Face ID)

### 📦 In Backend (Example):
1. User sends login request with credentials.
2. Backend checks the credentials.
3. If valid, generates and returns a **JWT token** or **Session**.

### ✅ Good Practices:
- Always **hash passwords** before storing (e.g., using `bcrypt`)
- Never store raw (plain-text) passwords
- Use HTTPS to avoid sniffing sensitive info

---

## ✅ What is Authorization?

> 🔍 **Authorization answers:** *"What can you do?"*

Authorization decides what actions or resources a user is allowed to access **after authentication** is successful.

### 📌 Example Scenarios:
- A normal user cannot access the admin panel.
- A seller can add products, but a buyer cannot.
- Only admins can delete other users.

### 🔒 How it's implemented:
- Role-based access control (RBAC)
- Scope-based access (OAuth)
- Middleware functions to check roles/permissions

```js
// Example in Express.js
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};
```

---

## ✅ Level 1: Plain Text Storage (Not Recommended ❌)

**Description:**  
In this basic level, we directly store the username and password as they are in the database without any protection.

**Drawback:**
- Passwords are stored in plain text.
- If database is compromised, all user passwords are exposed.
- Highly insecure, never used in real-world applications.

---

## ✅ Level 2: Encryption (Symmetric Key)

**Description:**  
Here, passwords are encrypted using a reversible encryption method like **Caesar Cipher** or other symmetric encryption algorithms.  
A secret key is used both to encrypt and decrypt the data.

**Benefits:**
- Passwords are not in plain text.
- Some level of protection if database is exposed.

**Drawbacks:**
- If the secret key is leaked, all passwords can be decrypted.
- Still not recommended for production-level security.

---

## ✅ Level 3: Hashing + Salting (Best Practice ✅)

**Description:**  
This is the **industry standard** for password security.  
We use one-way **hashing algorithms** (like `bcrypt`) which convert the password into a fixed-size string that **cannot be reversed**.

**Salting** adds a random value to each password before hashing to make it unique — even if two users have the same password.

**Benefits:**
- Irreversible and secure.
- Even if the database is leaked, it’s extremely difficult to reverse engineer passwords.
- Widely accepted and trusted method.

---

## ✅ Level 4: JWT (JSON Web Token) Authentication

**Description:**  
This is a modern, stateless method of authentication.  
When a user logs in, a **JWT token** is generated and sent back to the client.  
This token contains a **signed payload** (usually user ID or other identifying info) and is used to **verify the user on protected routes**.

**How it works:**
- Server signs a token using a **secret key** and sends it to the client.
- Client stores the token (usually in **cookies** or **localStorage**).
- For every subsequent request, client sends the token in the **Authorization header**.
- Server verifies the token using the secret and extracts user info from the payload.

**Benefits:**
- ✅ Stateless — no need to store sessions on server.
- ✅ Scalable — great for APIs and microservices.
- ✅ Easy to share between frontend and mobile apps.

**Drawbacks:**
- ❌ If a token is stolen, attacker can use it until it expires (unless using blacklisting or short expiry).
- ❌ Token invalidation (logout) is tricky unless extra handling is done.

**Best Practices:**
- Always use **HTTPS** to prevent token leaks.
- Set short expiry and use **refresh tokens** if needed.
- Store tokens **safely** — avoid localStorage for sensitive apps, use **HttpOnly cookies**.
