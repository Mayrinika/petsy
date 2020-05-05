const db = {
    users: [
        {
            userId: "Ekg1I3VD1hbTx2uGhMrOZ9DFNi33",
            email: "lisa@email.com",
            handle: "Лиза",
            cratedAt: "2020-04-30T13:43:07.366Z",
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/petsy-405d6.appspot.com/o/40149613497.png?alt=media",
            bio: "Hello",
            location: "Yekaterinburg",
        },
    ],
    reviews: [
        {
            userHandle: "Наталья",
            body: "Все понравилось!",
            createdAt: "2020-04-29T10:38:43.475Z",
            likeCount: 5,
            commentCount: 3,
        },
    ],
    comments: [
        {
            userHandle: "Наталья",
            reviewId: "duhfiurhfrgirjg",
            body: "Здорово!",
            createdAt: "2020-04-30T13:43:07.366Z",
        },
    ],
    notification: [
        {
            recipient: 'user',
            sender: 'user2',
            read: 'true | false',
            reviewId: 'fhgriuhghfgoijg',
            type: 'like | comment',
            createdAt: '2020-04-30T13:43:07.366Z',
        }
    ],
};

const userdetails = {
    //Redux data
    credentials: {
        userId: "Ekg1I3VD1hbTx2uGhMrOZ9DFNi33",
        email: "lisa@email.com",
        handle: "Лиза",
        cratedAt: "2020-04-30T13:43:07.366Z",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/petsy-405d6.appspot.com/o/40149613497.png?alt=media",
        bio: "Hello",
        location: "Yekaterinburg",
    },
    likes: [
        {
            userHandle: "Наталья",
            reviewId: "l5dtjCKyMRzaZQZSdlID",
        },
        {
            userHandle: "Наталья",
            reviewId: "l5dtjCKyMRzaZQZSdlID",
        },
    ]
};
