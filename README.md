# React Horizon UI `Firebase`⚡️

Designed for those who like modern UI elements and beautiful websites. Made of hundred of elements, designed blocks and fully coded pages, **React Horizon UI** is ready to help you create stunning websites and webapps.
The product used a Firebase backend for the authentication flow: Social login via Google and the classic `user/password` auth flow.

<br />

> 🚀 Built with **[React App Generator](https://appseed.us/generator/react/)** for *[Horizon UI](https://appseed.us/generator/react/horizon-ui/)*

- ✅ Modern aesthetics UI design - Designed by *[Simmmple](https://simmmple.com/)*
- ✅ Styled with `Chakra Ui`, `Dark-Mode`
- ✅ Authentication: 
  - Google Social Login
  - `SignIN/SignUP` via `user/password`
- ✅ **Full-stack Ready** using a *Firebase** 

<br />

> Links

- 👉 [React Horizon UI](https://react-horizon-firebase.appseed-srv1.com) - LIVE Demo
- 👉 Free Support via Github (issues tracker) and [Discord](https://discord.gg/fZC6hup).

<br />

![React Horizon UI - Full-Stack starter provided by AppSeed and Simmmple.](https://user-images.githubusercontent.com/51070104/174428337-181e6dea-0ad9-4fe1-a35f-25e5fa656a9d.png)

<br >

## How to use it

To use the product Node JS (>= 12.x) is required and GIT to clone/download the project from the public repository.

**Step 1** - Clone the project

```bash
$ git clone https://github.com/app-generator/react-horizon-ui-chakra-firebase.git
$ cd react-horizon-ui-chakra-firebase
```

<br >

**Step 2** - Install dependencies via NPM or yarn

```bash
$ npm i
// OR
$ yarn
```

<br />

**Step 3** - Start in development mode

```bash
$ npm run start 
// OR
$ yarn start
```

<br />

## Configure Firebase Credentials

**App Settings** as provided by the Firebase platform - `src/config/constants.js` 

```javascript
const config = {
    ...
    firebase: {                                               
        apiKey: 'YOUR_API_KEY',                            # <-- YOUR DATA HERE
        authDomain: 'YOUR_DOMAIN_HERE',                    # <-- YOUR DATA HERE 
        projectId: 'YOUR_PROJECT_ID',                      # <-- YOUR DATA HERE
        storageBucket: 'YOUR_STORAGE_BUCKET',              # <-- YOUR DATA HERE
        messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',     # <-- YOUR DATA HERE
        appId: 'YOUR_APP_ID',                              # <-- YOUR DATA HERE
        measurementId: 'YOUR_TRACKER_ID'                   # <-- YOUR DATA HERE
    }
};
```

All above settings are provided by the Firebase platform. For more information, feel free to access [Firebase official](https://firebase.google.com/docs) help:

- [Firebase Fundamentals](https://firebase.google.com/docs/guides) - Learn how to get started fast 
- [Manage Projects in Firebase](https://firebase.google.com/docs/projects/learn-more) - the basics

<br />

---
React Horizon UI `Firebase` - Provided by Simmmple and **AppSeed [App Generator](https://appseed.us/generator)**.
