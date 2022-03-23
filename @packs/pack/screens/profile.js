import React, { useState, useEffect } from 'react'
import { Comps, Elems, Actheme } from 'pack'
import Actstore from 'actstore'

export default function ProfileScreen() {

  const { store, handle } = Actstore({}, ['user', 'posts'])
  const router = handle.useRouter()
  const { id } = router?.query || {}
  const { user, users } = store.get('user', 'users')
  const profile = users?.find(user => user.id === id) || {}
  const data = (store.get('posts') || []).filter(post => post.userId === id)
  
  const [posts, setPosts] = useState(data)
  const [mode, setMode] = useState('posts')
  const [edit, setEdit] = useState()
  const [changeNav, setChangeNav] = useState()

  useEffect(() => {
    setPosts(data)
  }, [user, mode, edit, id])

  const renderItem = ({item}) => 
    <Comps.Post
      id={id}
      post={item}
      user={user}
      profile={profile}
      onEdit={() => setEdit((posts.find(post => String(post.id) === String(item.id))) || {})}
      onRemove={() => setMode(!mode)} />

  const handleNav = (e) => {
    const scrolled = e.nativeEvent.contentOffset.y
    scrolled > 264
      ? setChangeNav(true)
      : setChangeNav(false)
  }

  return (
    <Profile.Container>
      <Comps.Meta
        title={profile.username || id}
        desc="profile"
        url={`https://atunicorn.io/profile/${id}`}
        cover={profile.url} />
      {profile?.id
        ? <Profile.Content 
            data={posts}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={<Comps.Placeholder flatlist icon="yin-yang" spin title="Balancing" />}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            windowSize={6}
            onScroll={handleNav}
            scrollEventThrottle={1}
            numColumns={6}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <Comps.Nav
                mode={mode}
                setMode={setMode}
                data={data} 
                posts={posts} 
                setPosts={setPosts}
                changeNav={changeNav} />}
          />
        : <>
            <Comps.Nav changeNav />
            <Comps.Placeholder icon="user-circle" title="Profile doesnt exist" />
          </>
      }
      {(mode === 'upload' || edit) && 
        <Comps.Upload post={edit} onClose={() => edit ? setEdit(false) : setMode(!mode)} />}
    </Profile.Container>
  )
}

const Profile = Actheme.create({
  Container: ['View', 'f:1 bg:#F2F2F2'],
  Content: ['FlatList', ['f:1', {
    contentContainerStyle: Actheme.style('ai,jc:c pt:s66 pb:s10'),
    columnWrapperStyle: Actheme.style('fw:wrap ai,jc:c'),
    ListHeaderComponentStyle: Actheme.style('ai,jc:c')}]],
  Text: ['Text', 'fs,mb:s6 ta:c', {
    small: 'fs:s3'}],
  Wrap: ['View', 'w:100% ai:c']
})