import React from 'react'
import { Elems, Actheme } from 'pack'
import Actstore from 'actstore'

function MainScreen(props) {
  const { store, action } = Actstore({ actions }, ['count'])

  return (
    <Styled.Wrap>
      <Styled.Text>{process.env.description}</Styled.Text>
      <Elems.Link href="/alternate" fustyle="ta:c">
        Go to Alternate Screen and see heart
      </Elems.Link>
      <Styled.Upload action={action('APP_UPLOAD')} />
      <Styled.Cont>
        <Styled.Button onPress={action('MAIN_COUNT')}>Click Me Please to increase number {store.get('count')}</Styled.Button>
        <Styled.Text small aria-level="2">
          {process.env.name} {process.env.version}
        </Styled.Text>
      </Styled.Cont>
    </Styled.Wrap>
  )
}

export default MainScreen

const Styled = Actheme.create({
  File: 'Upload',
  Touch: ['TouchableOpacity', 'bg:pink'],
  Wrap: 'ai,jc:c fg:1',
  Cont: 'mt:s4',
  Text: ['Text', 'fs,mb:s6 ta:c', { small: 'fs:s3'}],
  Button: 'fs,mb:s6 c:green',
  Upload: props => <Styled.File {...props}>
    <Elems.Icon style={Actheme.style('c:black')} icon="heart"/>
  </Styled.File>
})

const actions = ({ store }) => ({
  MAIN_COUNT: () => store.set({ count: store.get('count') + 2 })
})
