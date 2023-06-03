# Tweet - React Component

[![Build Status](https://img.shields.io/github/actions/workflow/status/wpdas/react-tweet/publish.yml?style=for-the-badge&colorB=000000)](https://github.com/wpdas/near-social-bridge/actions?query=workflow%3Apublish)
[![Build Size](https://img.shields.io/bundlephobia/minzip/@wpdas/react-tweet?color=000000&label=bundle&style=for-the-badge)](https://bundlephobia.com/package/near-social-bridge)
[![Version](https://img.shields.io/npm/v/@wpdas/react-tweet?style=for-the-badge&colorB=000000)](https://www.npmjs.com/package/near-social-bridge)

A simple Tweet component for ReactJS apps.

## Install

Install it using npm or yarn:

```sh
# npm
npm install @wpdas/react-tweet

# yarn
yarn add @wpdas/react-tweet
```

## How to use

```tsx
import { Tweet } from '@wpdas/react-tweet'

const App = () => {
  return (
    <>
      <Tweet
        tweetURL="https://twitter.com/wpdas/status/1648406388127801347"
        onRender={() => console.log('rendered')}
        onError={(err: string) => console.log(err)}
        options={{ theme: 'dark' }}
      />
    </>
  )
}

export default App
```

**tweetURL:** (must) this is the tweet URL

**onRender:** (optional) method called when the tweet renders

**onError:** (optional) method called when there's an issue with the provided URL

**options:** (optional) you can set some options like:

```ts
type Options = {
  conversation?: 'none' | 'all'
  cards?: 'hidden' | 'visible'
  linkColor?: string
  theme?: 'light' | 'dark'
}
```

### How it looks after rendering:

<img src='./md/tweet.png' height='550' alt='Tweet example' />

## Good to know

The component will be re-rendered when the `tweetURL` or `options` property is changed.
