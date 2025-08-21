# login jack 

1.user profile
```{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "68a703497c1b581fa317bdcd",
            "username": "jack",
            "email": "jack@gmail.com",
            "fullName": "Jack Sparow",
            "avatar": "http://res.cloudinary.com/dp7fychwy/image/upload/v1755775815/x9hcd8o1e0hmxg8sc9qk.jpg",
            "coverImage": "http://res.cloudinary.com/dp7fychwy/image/upload/v1755775818/mrv7fgvnoeh8ryy3waqr.png",
            "watchHistory": [],
            "createdAt": "2025-08-21T11:30:17.633Z",
            "updatedAt": "2025-08-21T11:43:41.788Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGE3MDM0OTdjMWI1ODFmYTMxN2JkY2QiLCJlbWFpbCI6ImphY2tAZ21haWwuY29tIiwidXNlcm5hbWUiOiJqYWNrIiwiaWF0IjoxNzU1Nzc2NjIxLCJleHAiOjE3NTU4NjMwMjF9.k0CU73v3IpGp9OsfotYhpJSq_22x3Q97VNbX1a6Y5Tk",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGE3MDM0OTdjMWI1ODFmYTMxN2JkY2QiLCJpYXQiOjE3NTU3NzY2MjEsImV4cCI6MTc1NjY0MDYyMX0.8sxXbipJDMnve2jPJdER6K2IrqfOA48IPdJQOnd3-N0"
    },
    "message": "User logged in successfully",
    "success": true
}```

2. videos
```{
    "statusCode": 201,
    "data": {
        "_id": "68a72690f6a2ba4f7ef12c23",
        "owner": "68a703497c1b581fa317bdcd",
        "videoFile": "http://res.cloudinary.com/dp7fychwy/video/upload/v1755784840/e5fquamk6wpdnqcf3v4b.mp4",
        "thumbnail": "http://res.cloudinary.com/dp7fychwy/image/upload/v1755784849/h9pcod5rapxepr1utvo9.jpg",
        "title": "mountain",
        "description": "this a mountain video",
        "views": 0,
        "duration": 8.25,
        "isPublished": true,
        "createdAt": "2025-08-21T14:00:48.858Z",
        "updatedAt": "2025-08-21T14:00:48.858Z",
        "__v": 0
    },
    "message": "video upload successfully on db",
    "success": true
}
```
3. created tweet 
```
 {
    "statusCode": 201,
    "data": {
        "_id": "68a74713e579ccfb02cb90ae",
        "owner": "68a703497c1b581fa317bdcd",
        "content": "Hi this is the first tweet of my life and I am tweet this on my own app that's different feelinng so thank you",
        "createdAt": "2025-08-21T16:19:31.316Z",
        "updatedAt": "2025-08-21T16:19:31.316Z",
        "__v": 0
    },
    "message": "tweet created successfully",
    "success": true
}
```