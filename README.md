# Tweet React Component

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
        tweetURL="https://twitter.com/DirtyTesLa/status/1664031205430374402"
        onRender={() => console.log('rendered')}
        onError={(err: string) => console.log(err)}
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
