<details>
<summary>
Authentication
</summary>

---

<details>
<summary>
Login
</summary>

```js
fetch(`${host}/auth/login`, {
    method:'POST',
    headers: {
        'content-type':'application/json'
    },
    body: JSON.stringify({
        username,
        password
    })
})
```
</details>

<details>
<summary>
Logout
</summary>

```js
fetch(`${host}/auth/logout`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Current User
</summary>

```js
fetch(`${host}/auth/currentuser`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

</details>

---

<details>
<summary>
Bonus Request
</summary>

---

<details>
<summary>
Request a bonus
</summary>

```js
//bonusId: the id of selected bonus by user
fetch(`${host}/bonus/request/${bonusId}`,{
    method:'POST',
    headers: {
        'content-type':'application/json'
    },
    body: JSON.stringify({
        username
    })
})
```

</details>

<details>
<summary>
Get bonus request by id
</summary>

```js
fetch(`${host}/bonus/request/${bonusId}`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Get waiting bonus request list
</summary>

```js
fetch(`${host}/bonus/requests`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Search bonus request list by username
</summary>

```js
fetch(`${host}/bonus/requests/search?username=${username}`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Get bonus request list by username
</summary>

```js
fetch(`${host}/bonus/requests/list?username=${username}`,{
    method:'GET',
    headers: {
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Get approved bonus request list
</summary>

```js
fetch(`${host}/bonus/requests/approved`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Get rejected bonus request list
</summary>

```js
fetch(`${host}/bonus/requests/rejected`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Update a requested bonus
</summary>

```js
// requestId: id of the requested bonus
statusId = [
    10, // WAITING
    20, // ACCEPTED
    30, // REJECTED
    40, // OTHER
]
fetch(`${host}/bonus/request/update/${requestId}`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    },
    body: JSON.stringify({
        statusId,
        bonusId,
        messageId, // optional
        note // optional
    })
})
```
</details>
</details>

---

<details>
<summary>
Bonus
</summary>

---

<details>
<summary>
Get bonus by id
</summary>

```js
fetch(`${host}/bonus/${bonusId}`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Get bonus list
</summary>

```js
fetch(`${host}/bonus/list`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Get active bonus list
</summary>

```js
fetch(`${host}/bonus/list/active`,{
    method:'GET',
    headers: {
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Create a bonus
</summary>

```js
// text: plain text
// content: html content
 statusId = [
    10, // ACTIVE
    20, // DEACTIVE
]
fetch(`${host}/bonus/create`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    },
    body: JSON.stringify({
        text,content,statusId
    })
})
```
</details>

<details>
<summary>
Update a bonus
</summary>

```js
// bonusId: the id of updated bonus
// text: plain text
// content: html content
 status = [
    10, // ACTIVE
    20, // DEACTIVE
]
fetch(`${host}/bonus/update/${bonusId}`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    },
    body: JSON.stringify({
        text,content,statusId
    })
})
```
</details>

</details>

---

<details>
<summary>
Message
</summary>

---

<details>
<summary>
Get message by id
</summary>

```js
fetch(`${host}/message/${userId}`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Get message list
</summary>

```js
fetch(`${host}/message/list`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Get active message list
</summary>

```js
fetch(`${host}/message/list/active`,{
    method:'GET',
    headers: {
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Create a message
</summary>

```js
statusId = [
    10, // ACTIVE
    20, // DEACTIVE
]
fetch(`${host}/message/create`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    },
    body: JSON.stringify({
        message,
        statusId
    })
})
```
</details>

<details>
<summary>
Update a message
</summary>

```js
// messageId: the id of updated message
statusId = [
    10, // ACTIVE
    20, // DEACTIVE
]
fetch(`${host}/message/update/${messageId}`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    },
    body: JSON.stringify({
        message,
        statusId
    })
})
```
</details>

<details>
<summary>
Remove a message
</summary>

```js
// messageId: the id of removed message
fetch(`${host}/message/remove/${messageId}`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```   
</details>

</details>

---

<details>
<summary>
Blocked users
</summary>

---

<details>
<summary>
Get blocked user by id
</summary>

```js
fetch(`${host}/blacklist/${userId}`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Get blocked user list
</summary>

```js
fetch(`${host}/blacklist/list`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Create a blocked user
</summary>

```js
statusId = [
    10, // ACTIVE
    20, // DEACTIVE
]
fetch(`${host}/blacklist/create`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    },
    body: JSON.stringify({
        username,
        statusId
    })
})
```
</details>

<details>
<summary>
Update a blocked user
</summary>

```js
// userId: the id of updated blocked user
statusId = [
    10, // ACTIVE
    20, // DEACTIVE
]
fetch(`${host}/blacklist/update/${userId}`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    },
    body: JSON.stringify({
        username,
        statusId
    })
})
```
</details>

<details>
<summary>
Remove a blocked user
</summary>

```js
// userId: the id of removed blocked user
fetch(`${host}/blacklist/remove/${userId}`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

</details>

---

<details>
<summary>
User Management
</summary>

---

<details>
<summary>
Get user by id
</summary>

```js
fetch(`${host}/users/${userId}`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Get user list
</summary>

```js
fetch(`${host}/users/list`,{
    method:'GET',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

<details>
<summary>
Create a user
</summary>

```js
userType = [
    10, // ADMIN
    20, // EDITOR
]
userStatus = [
  10, // ACTIVE
  20, // DEACTIVE
]
permissions = [
    1, // bonus id list
    2,
    ...
]
fetch(`${host}/users/create`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    },
    body: JSON.stringify({
        loginName, 
        password, 
        username, 
        email, 
        phone, 
        userType,
        userStatus,
        permissions: [1,2,...]
    })
})
```
</details>

<details>
<summary>
Update a user
</summary>

```js
// userId: the id of updated user
userType = [
    10, // ADMIN
    20, // EDITOR
]
userStatus = [
  10, // ACTIVE
  20, // DEACTIVE
]
permissions = [
    1, // bonus id list
    2,
    ...
]
fetch(`${host}/users/update/${userId}`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    },
    body: JSON.stringify({
        loginName,
        password,
        username,
        email,
        phone,
        userType,
        userStatus,
        permissions: [1,2,...]
    })
})
```
</details>

<details>
<summary>
Update user profile
</summary>

```js
fetch(`${host}/users/update`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    },
    body: JSON.stringify({
        loginName,
        password,
        username,
        userSurname,
        email,
        phone
    })
})
```
</details>

<details>
<summary>
Remove a user
</summary>

```js
// userId: the id of removed user
fetch(`${host}/users/remove/${userId}`,{
    method:'POST',
    headers: {
        Authorization: jwt_token,
        'content-type':'application/json'
    }
})
```
</details>

</details>