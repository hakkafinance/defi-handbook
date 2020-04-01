var theme = {
  plain: {
    color: '#1a1a1a',
    backgroundColor: '#f7f7f7',
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: 'rgb(199, 196, 194)',
      },
    },
    {
      types: ['string', 'builtin'],
      style: {
        color: 'rgb(66, 130, 38)',
      },
    },
    {
      types: ['number', 'property'],
      style: {
        color: 'rgb(55, 120, 183)',
      },
    },
    {
      types: ['class-name', 'function', 'constant'],
      style: {
        color: 'rgb(201, 72, 36)',
      },
    },
    {
      types: ['variable', 'keyword', 'operator'],
      style: {
        color: 'rgb(165, 100, 22)',
      },
    },
    {
      types: ['attr-name', 'selector'],
      style: {
        color: 'rgb(176, 82, 161)',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'rgb(26, 26, 26)',
      },
    },
  ],
}

module.exports = theme
