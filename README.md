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

##### Level 1 Authentication : Directly storing username and password into the database
##### Level 2 Authentication : Encryption