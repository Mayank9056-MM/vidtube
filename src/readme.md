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
4. created comment
```
 {
    "statusCode": 200,
    "data": {
        "video": "68a72690f6a2ba4f7ef12c23",
        "owner": "68a703497c1b581fa317bdcd",
        "content": "I like your video",
        "_id": "68a817a7b067bb7af7327be9",
        "createdAt": "2025-08-22T07:09:27.099Z",
        "updatedAt": "2025-08-22T07:09:27.099Z",
        "__v": 0
    },
    "message": "comment created successfully",
    "success": true
}
```
4. subscription toggle
```
{
	"statusCode": 201,
	"data": {
		"subscriber": "68acae60bfecb03f1fe3525c",
		"channel": "68a703497c1b581fa317bdcd",
		"_id": "68ad4cb0ef15ce535dd484a8",
		"createdAt": "2025-08-26T05:57:04.510Z",
		"updatedAt": "2025-08-26T05:57:04.510Z",
		"__v": 0
	},
	"message": "Subscription successfully",
	"success": true
}
```

5. refereshAccess token
```
  {
    "statusCode": 200,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGE3MDM0OTdjMWI1ODFmYTMxN2JkY2QiLCJlbWFpbCI6InNwaWRlcm1hbkBnYW1pbC5jb20iLCJ1c2VybmFtZSI6ImphY2siLCJpYXQiOjE3NTYxOTAyMTIsImV4cCI6MTc1NjI3NjYxMn0.2LbF-K2GwzIN3N6TcJvMBuegUhtvADdKdwXpYlwPKII",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGE3MDM0OTdjMWI1ODFmYTMxN2JkY2QiLCJpYXQiOjE3NTYxOTAyMTIsImV4cCI6MTc1NzA1NDIxMn0.sG9qRE9wbOesMEuxAtQJmcUM8UKKwiYxdLiinVfFvPg"
    },
    "message": "Access token refreshed successfully",
    "success": true
}
```

6. subscribed channlels
```
 {
    "statusCode": 200,
    "data": [
        {
            "_id": "68ad4cb0ef15ce535dd484a8",
            "subscriber": "68acae60bfecb03f1fe3525c",
            "channel": {
                "_id": "68a703497c1b581fa317bdcd",
                "username": "jack",
                "email": "spiderman@gamil.com",
                "avatar": "http://res.cloudinary.com/dp7fychwy/image/upload/v1755775815/x9hcd8o1e0hmxg8sc9qk.jpg"
            },
            "createdAt": "2025-08-26T05:57:04.510Z",
            "updatedAt": "2025-08-26T05:57:04.510Z",
            "__v": 0
        }
    ],
    "message": "subscribed channels fetched",
    "success": true
}
```

7. subscribers
```
  {
    "statusCode": 200,
    "data": [
        {
            "_id": "68ad57699bd8732b97b70672",
            "subscriber": {
                "_id": "68a703497c1b581fa317bdcd",
                "username": "jack",
                "email": "spiderman@gamil.com",
                "avatar": "http://res.cloudinary.com/dp7fychwy/image/upload/v1755775815/x9hcd8o1e0hmxg8sc9qk.jpg"
            },
            "channel": "68acae60bfecb03f1fe3525c",
            "createdAt": "2025-08-26T06:42:49.375Z",
            "updatedAt": "2025-08-26T06:42:49.375Z",
            "__v": 0
        }
    ],
    "message": "subscribers fetched",
    "success": true
}
```