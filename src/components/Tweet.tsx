/**
 * Tweet component
 * Partial solution: https://www.labnol.org/code/19933-embed-tweet-with-javascript
 *
 */

import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import waitForTwttr from '../utils/waitForTwttr'

type Options = {
  conversation?: 'none' | 'all'
  cards?: 'hidden' | 'visible'
  linkColor?: string
  theme?: 'light' | 'dark'
}

type TweetStageProps = {
  tweetID: string
  options?: Options
  onError?: (error: string) => void
  onRender?: () => void
}

const TweetStage: React.FC<TweetStageProps> = ({ tweetID, options, onError, onRender }) => {
  const [ready, isReady] = useState(false)
  const [twttrReady, setTwttrReady] = useState(false)

  useEffect(() => {
    if (!ready && twttrReady) {
      const tweetElement = document.getElementById(tweetID)

      /* @ts-ignore */
      twttr.widgets
        .createTweet(tweetID, tweetElement, {
          conversation: options?.conversation || 'none', // or all
          cards: options?.cards || 'visible', // or visible
          linkColor: options?.linkColor || '#cc0000', // default is blue
          theme: options?.theme || 'light', // or dark
        })
        .then(function (el: any) {
          if (el.contentDocument?.querySelector) {
            el.contentDocument.querySelector('.footer').style.display = 'none'
          }
          isReady(true)
          if (onRender) {
            onRender()
          }
        })
        .catch(() => {
          if (onError) {
            onError('The tweet URL you provided is not valid or not public')
          }
        })
    }
  }, [twttrReady, ready, tweetID, onRender, onError, options])

  useEffect(() => {
    waitForTwttr()
      .then(() => setTwttrReady(true))
      .catch(() => {
        console.error('Twttr was not loaded!')
      })
  }, [])

  return (
    <>
      {/* @ts-ignore */}
      {window['twttr'] === undefined && (
        <Helmet>
          <script async src="https://platform.twitter.com/widgets.js" crossOrigin="anonymous"></script>
        </Helmet>
      )}

      {twttrReady && <div id={tweetID} style={{ width: '100%' }}></div>}
    </>
  )
}

type TweetProps = {
  tweetURL: string
  options?: Options
  onError?: (error: string) => void
  onRender?: () => void
}

const Tweet: React.FC<TweetProps> = ({ tweetURL, options, onError, onRender }) => {
  // Numbers only
  const url = new URL(tweetURL)
  const tweetID = url.pathname.match(/\d+/g)?.join('')
  const [tweet, setTweet] = useState<React.ReactNode>()
  const [status, setStatus] = useState<'reseting' | 'ready'>('ready')

  useEffect(() => {
    if (tweetID) {
      setTweet(undefined)
      setStatus('reseting')
    }
  }, [tweetURL, tweetID, options])

  useEffect(() => {
    if (status === 'reseting' && tweetID) {
      setTweet(<TweetStage tweetID={tweetID} options={options} onError={onError} onRender={onRender} />)
      setStatus('ready')
    }
  }, [tweetID, status, onError, onRender, options])

  if (!tweetURL) {
    return null
  }

  if (!tweetID) {
    if (onError) {
      onError('The URL you provided is not valid')
    }
    return null
  }

  return status === 'ready' ? <>{tweet}</> : null
}

export default Tweet
