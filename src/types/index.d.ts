type Image_Urls = {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
}

type Author = {
    username: string;
    avatar: string;
};

type Photo = {
    id: string;
    urls: Image_Urls;
    title: string;
    author: Author;
    description: string;
    topic: string;
    date: Date;
    likes: string;
    slug: string;
};

type User = {
    id: string;
    email: string;
    username: string;   
}