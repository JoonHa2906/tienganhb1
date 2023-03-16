const routes = {
   home: '/',
   profile: 'profile/:nickname',
   login: '/login/:page',
   loginbackhome: '/login',
   signup: '/signup/:page',
   verification: '/verification/:success/:message',
   dictionary: '/dictionary',
   listening: '/listening',
   listeningslug: '/listening/:slug',
   reading: '/reading',
   readingslug: '/reading/:slug',
   testing: '/testing',
   game: '/game',
   gameslug: '/game/:slug',
};

export default routes;
