class PostIterator {

    constructor(posts) {
        this.posts = posts ? posts : [];
    }

    //sets the publisher of posts.
    setPublisher(email) {
        this.posts.map(e => e.publisher = email);
    }

    //add new posts. Takes post array as argument.
    add(secon_posts) {
        this.posts = this.posts.concat(secon_posts);
    }

    //filters according to hashtag.
    hashtag_filter(hashtag) {
        this.posts = this.posts.filter(e => e.hashtags && e.hashtags.includes(hashtag));
    }

    get_posts() {
        return this.posts;
    }
}

module.exports = { PostIterator }