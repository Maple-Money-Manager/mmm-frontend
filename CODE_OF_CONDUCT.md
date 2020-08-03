## Files/Folder structure guidelines:

Structure projects is to group similar files together, for example:

```
api/
  APIUtils.js
  APIUtils.test.js
  ProfileAPI.js
  UserAPI.js
components/
  Avatar.js
  Avatar.css
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
```

If a child component is used for a specific component:

```
pages/
 homepage/
  index.js
  NavigationButton.js
```

If the component is later generalised:

```
pages/
 HomePage.js
components/
 NavigationButton.js
```

## Commit messages format:

`[<ticket number>][<initials>] <message>`
