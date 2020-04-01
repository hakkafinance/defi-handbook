import React from 'react'
import Prism from 'prismjs'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import theme from '../libs/codeBlockTheme'
import 'prismjs/components/prism-solidity.min.js'

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    borderRadius: '4px',
    overflowX: 'auto',
    fontSize: '13px',
    fontFamily: 'Fira Code',
  },
}))

export default ({ children, className, live, render }) => {
  const language = className.replace(/language-/, '')
  const classes = useStyles()

  return (
    <Highlight
      {...defaultProps}
      Prism={Prism}
      code={children.trim()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx(className, classes.wrapper)}
          style={{ ...style, padding: '20px' }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
