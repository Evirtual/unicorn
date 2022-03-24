import React, { useState } from 'react'
import { Comps, Elems, Actheme } from 'pack'
import Actstore from 'actstore'

export default function AboutScreen() {
  const { store, handle } = Actstore({}, ['user', 'users'])
  const router = handle.useRouter()
  const { id } = router?.query || {}
  const { user, users } = store.get('user', 'users')
  const profile = users?.find(item => item.id === id) || {}
  const path = router.asPath
  const profileAboutPath = `/profile/${id}/about/`

  const [edit, setEdit] = useState()
  const [changeNav, setChangeNav] = useState()

  const handleNav = (e) => {
    const scrolled = e.nativeEvent.contentOffset.y
    scrolled > 264
      ? setChangeNav(true)
      : setChangeNav(false)
  }

  return (
    <About.Container>
      <Comps.Meta
        title={path === profileAboutPath ? (profile?.username || id) : "unicorn"}
        desc="about"
        url={path === profileAboutPath && `https://atunicorn.io/profile/${id}`}
        cover={path === profileAboutPath && profile.url} />
      <About.Content
        onScroll={handleNav}
        scrollEventThrottle={1}
        stickyHeaderIndices={[0]}
      >
        <Comps.Nav changeNav={changeNav} />
        <About.Wrap>
          {user && user?.id === ( profile?.id || id ) && 
            <About.Edit>
              <Elems.Button
                option
                edit
                icon="pencil"
                onPress={() => setEdit(true)} />
            </About.Edit>
          }
          {profile?.about
            ? <About.Text>{profile?.about}</About.Text>
            : <About.Text>
              {profile?.id || id
                ? `Welcome to @${profile?.username || id}`
                : "Welcome to @unicorn\n\nIt's a place to express\nyour uniqueness\n\nin ways that inspire us\nto feel more confident\nin our everyday life"
              }
            </About.Text>
          }
        </About.Wrap>
      </About.Content>
      {edit && <Comps.About profile={profile} onClose={() => setEdit(false)} />}
    </About.Container>
  )
}

const About = Actheme.create({
  Container: ['View', 'f:1 bg:grey'],
  Content: ['ScrollView', ['f:1', {
    contentContainerStyle: Actheme.style('jc,ai:c pt:s66 ph:s5 pb:s10')}]],
  Wrap: ['View', 'bg:white br:s5 w:100% nh,xw:s90 ai,jc:c bw:1 bc:black50 p:s10 mt:s2.5'],
  Text: ['Text', 'fs:s4 ta:c'],
  Edit: ['View', 'ps:ab t,r:s2 ai,jc:c z:3'],
})