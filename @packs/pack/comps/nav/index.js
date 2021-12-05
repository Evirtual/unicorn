import React from 'react'
import Elems from '../../elems'
import { Actheme } from '../../theme'
import Actstore from 'actstore'

const Nav = Actheme.create({

  Container: ['View', 'w:100% jc,ai:c z:2 mv:s10'],
  Wrap: ['View', 'jc,ai:c', {
    image: 'w,h,br:s25 bg:white of:hd mh:s7 mt:s5 mb:s3',
    row: 'fd:row',
    input: 'ps:ab z:2',
    search: 'ps:ab l:-s2',
    save: 'ps:ab r:-s2',
  }],
  Image: ['Image', 'w,h:100%'],
  Input: ['TextInput', ['c:black fs:s4 p:s2 pl:s10 pr:s10 bw:1 bc:black50 bg:white br:s5 ta:c w:s70', { multiline: false, numberOfLines: 1 }], {
    focus: 'bc:green'
  }],
  File: 'Upload',
  Touch: ['TouchableOpacity', 'w,h,br:s25 jc,ai:c bg:white200 br:s5 of:hd'],
  Image: ['Image', 'w,h:s25'],

  Comp: (props) => {
    const { act, store, action, handle } = Actstore({}, ['user', 'posts'])
    const router = handle.useRouter()
    const { user, users } = store.get('user', 'users')
    const { id } = router?.query || {}
    const [focus, setFocus] = React.useState()
    const [active, setActive] = React.useState()
    const [editUsername, setEditUsername] = React.useState()
    const [username, setUsername] = React.useState()
    const profile = users?.find(item => item.id === id) || {}
    const path = typeof window !== "undefined" && window.location.pathname

    return <Nav.Container>
      <Nav.Wrap row>
        {user && <Elems.Button icon="search" iconSize="s5" onPress={() => setActive(true)} /> }
        {(!user || active) && <Nav.Wrap input={user}>
          <Nav.Wrap search>
            { !user && <Elems.Button icon="search" iconColor="grey" />}
            { user && <Elems.Button icon="times-circle" iconColor="grey" iconSize="s5" onPress={() => setActive(false)} /> }
          </Nav.Wrap>
          <Nav.Input
            placeholder={path !== '/' && path !== '/about' ? `Search @${profile.username || id}` : 'Search @unicorn'}
            focus={focus}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}  />
          {!user && path !== '/' && <Nav.Wrap save>
            <Elems.Button icon="home" iconColor="grey" onPress={() => router?.push('/')} />
          </Nav.Wrap>}
        </Nav.Wrap>
        }
        {user && <Elems.Button icon="home" iconSize="s5" onPress={() => router?.push('/')} />}
        {user && id !== user.id && <Elems.Button icon="user-circle" iconSize="s5" onPress={() => router.push('/profile/' + user.id)} />}
        {user && id === user.id && <Elems.Button icon="power-off" iconSize="s5"  onPress={action('APP_LOGOUT')} />}
      </Nav.Wrap>
      <Nav.Wrap row>
        {!user && path === '/'
          ? <Elems.Button text="login" onPress={action('APP_LOGIN')} />
          : path === '/' || user && id === user.id && (path !== '/profile/' + user.id + '/about')
            ? <Elems.Button
                text={props.mode === 'post' ? 'back' : 'upload'}
                textColor={props.mode === 'post' ? 'red' : 'green'}
                onPress={props.mode === 'post' ? () => props.setMode() : () => props.setMode('post')} />
            :  <Elems.Button text="back" textColor="red" onPress={() => router.back()} />
        }
        <Nav.Wrap image>
          {user && id === user.id
            ? <Nav.File action={files => act('APP_UPLOAD', files)}>
              {!profile.url
                ? <Nav.Touch>
                    <Elems.Icon style={Actheme.style('c:grey fs:s10')} icon="camera" solid />
                  </Nav.Touch>
                : <Nav.Touch>
                    <Nav.Image source={profile.url} />
                  </Nav.Touch>}
              </Nav.File>
            : path !== '/' && path !== '/about' && !profile.url
              ? <Elems.Icon style={Actheme.style('c:black100 fs:s20')} icon="user-circle" solid />
              : <Nav.Image source={profile.url ? profile.url : 'https://cdn.dribbble.com/users/61660/screenshots/4409254/unicorn_03.gif'} />
          }
        </Nav.Wrap>
        <Elems.Button text="about" onPress={path === '/' ? () => router.push('/about/') : () => router.push('/profile/' + id + '/about/')} />
      </Nav.Wrap>
      <Nav.Wrap row>
        {!editUsername && <Elems.Button text={'@' + (profile.username ? profile.username : id ? id : 'unicorn')} onPress={ user && id === user.id ? () => setEditUsername(true) : null} /> }
        {user && id === user.id && editUsername && <Nav.Wrap row>
          <Nav.Wrap search>
            <Elems.Button icon="times-circle" iconColor="grey" iconSize="s5" onPress={() => setEditUsername(false)} />
          </Nav.Wrap>
          <Nav.Input
            onChangeText={setUsername}
            placeholder={profile.username || "set username"}
            focus={focus}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)} />  
          <Nav.Wrap save>
            <Elems.Button icon="save" iconColor="green" iconSize="s5" onPress={() => act('APP_USER', { username }, setEditUsername(false))} />
          </Nav.Wrap>
        </Nav.Wrap>}
        {user && id === user.id && !editUsername && !profile.username && path !== '/' && <Elems.Button icon="pencil" iconSize="s5" onPress={() => setEditUsername(true)} />}
      </Nav.Wrap>
    </Nav.Container>
  }
})

export default Nav.Comp
