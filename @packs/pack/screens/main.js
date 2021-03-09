import React from 'react'
import { Elems, Actheme } from 'pack'
import Actstore from 'actstore'
import { GET } from 'fetchier'

function MainScreen(props) {
  const { store, action, act, handle } = Actstore({}, ['user', 'posts'])
  const { user, posts} = store.get('user', 'posts')
  const [ mode, setMode ] = React.useState()

  return <Inner.Container>
    <Inner.Menu>
      <Button.Comp icon="alicorn" text="Unicorn" iconColor="pink" logo />
      <Inner.Tabs>
        <Button.Comp tab text="Images" />
        <Button.Comp tab text="Videos" />
      </Inner.Tabs>
    </Inner.Menu>
    <Inner.Content>
      {!posts
        ? <Button.Comp icon="spinner-third" spin />
        : (mode != 'post' && mode != 'profileView' && mode != 'profileEdit') && posts.map((post, index) => <Post.Comp key={index} post={post} />)}
      {mode === 'post' && <Upload.Comp onClose={() => setMode()} />}
      {mode === 'profileView' && <ProfileView.Comp />}
      {mode === 'profileEdit' && <ProfileEdit.Comp />}
    </Inner.Content>
    {!user 
      ? <Button.Comp 
        icon={mode === 'profileView' ? 'times-circle' : 'info-circle'}
        iconColor={mode === 'profileView' ? 'red' : 'black'}
        onPress={mode === 'profileView' ? () => setMode() : () => setMode('profileView')}
        info />
      : <Button.Comp
        icon={mode === 'profileEdit' ? 'times-circle' : 'cog'}
        iconColor={mode === 'profileEdit' ? 'red' : 'blue'}
        onPress={mode === 'profileEdit' ? () => setMode() : () => setMode('profileEdit')}
        info />
      }
    {!user
      ? <Button.Comp icon="user-circle" user onPress={action('APP_LOGIN')} />
      : <Button.Comp
          icon={mode === 'post' ? 'times-circle' : 'plus-circle'}
          iconColor={mode === 'post' ? 'red' : 'green'}
          onPress={mode === 'post' ? () => setMode() : () => setMode('post')}
          user />
    }
  </Inner.Container>
}

export default MainScreen

const Inner = Actheme.create({
  Container: ['View', 'f:1 bg:black50'],
  Menu: ['View', 'bbw:1 bbc:black50', { md: 'fd:row jc:sb' }],
  Tabs: ['View', 'fd:row jc:c p:s5'],
  Content: ['ScrollView', ['f:1', { contentContainerStyle: Actheme.style('fg:1 ai,jc:c fd:row fw:wrap p:s5 w:100% xw:s400 as:c'), showsVerticalScrollIndicator: false }]],
})

const Button = Actheme.create({
  Touch: ['TouchableOpacity', 'jc,ai:c', {
    tab: 'mh:s5 fs:s20',
    info: 'bg:#e5e5e5 br:s20 ps:ab b,l:s5 z:2',
    user: 'bg:#e5e5e5 br:s20 ps:ab b,r:s5 z:2',
    logo: 'as:c m:s5 w,h:s15',
    post: 'bc:black100 br:s10 bw:2 bc:green h:s15',
    disabled: 'op:0.5'
  }],
  Text: ['Text', ['ta:c c:black fb:500 w:100%', { numberOfLines: 1 }], {
    tab: 'fs:s5',
    logo: 'c:pink',
    post: 'c:green fs:s5' }],
  Image: ['Image', 'w,h:100%'],
  Comp: ({text, source, info, logo, size, icon, iconColor, iconSize, spin, tab, post, disabled, onPress, ...props}) => {
    return <Button.Touch info={info} logo={logo} tab={tab} logo={logo} post={post} disabled={disabled} onPress={!disabled ? onPress : null} {...props}>
      {source && <Button.Image source={source} />}
      {icon && <Elems.Icon color={Actheme.value(iconColor, 'color') || 'black'} style={Actheme.style(`fs:${iconSize || 's10'}`)} icon={icon} spin={spin} />}
      {text && <Button.Text tab={tab} logo={logo} post={post} {...props}>{text}</Button.Text>}
    </Button.Touch>
  }
})

const Upload = Actheme.create({
  Wrap: ['View', 'fd:col w:100% xw:s100'],
  Touch: ['TouchableOpacity', 'w:100% xw,h:s100 jc,ai:c bw:1 bc:black100 br:s5 of:hd mb:s10'],
  File: 'Upload',
  Text: ['Text', ['ta:c c:black fb:500 w:100% mt:s5', { numberOfLines: 1 }]],
  Input: ['TextInput', ['c:black fs:s5 mb:s10 bw:1 bc:black100 p:s5 br:s2 bg:ts', { multiline: true, numberOfLines: 3 }], {
    active: 'bc:orange'
  }],
  Comp: props => {
    const { action, act } = Actstore({}, [])
    const [active, setActive] = React.useState()
    const [url, setUrl] = React.useState()
    const [desc, setDesc] = React.useState()

    console.log({ url, desc })

    return <Upload.Wrap>
      <Upload.File action={files => act('APP_UPLOAD', files).then(setUrl)}>
        <Upload.Touch>
          <Elems.Icon style={Actheme.style('c:black fs:s20')} icon="plus-circle"/>
          <Upload.Text>Upload Picture</Upload.Text>
        </Upload.Touch>
      </Upload.File>
      <Upload.Input onChangeText={setDesc} placeholder="Type your description" underlineColorAndroid="transparent" active={active} onFocus={() => setActive(true)} onBlur={() => setActive(false)} />
      <Button.Comp disabled={!Boolean(desc) || !Boolean(url)} onPress={() => act('APP_POST', { url, desc }).then(props.onClose)} text="Post" post />
    </Upload.Wrap>
  }
})

const ProfileView = Actheme.create({
  Wrap: ['View', 'fd:col w:100% xw:s100'],
  Comp: props => <ProfileView.Wrap>
  </ProfileView.Wrap>
})

const ProfileEdit = Actheme.create({
  Wrap: ['View', 'fd:col w:100% xw:s100'],
  Comp: props => <ProfileEdit.Wrap>
  </ProfileEdit.Wrap>
})

const Post = Actheme.create({
  Touch: ['TouchableOpacity', 'w:100% xw,h:s100 jc,ai:c bw:1 bc:black100 br:s5 of:hd m:s5'],
  Image: ['Image', 'w,h:100%'],
  Comp: ({post, ...props}) => {
    return <Post.Touch {...props}>
      <Post.Image source={post.url} />
    </Post.Touch>
  }
})
