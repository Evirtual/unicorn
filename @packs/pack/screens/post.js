import React, { useState } from 'react'
import { Elems, Comps, Actheme } from 'pack'
import Actstore from 'actstore'

export default function PostScreen() {
  const { act, store, handle } = Actstore({}, ['user', 'posts'])
  const router = handle.useRouter()
  const { id } = router?.query || {}
  const { user, users } = store.get('user', 'users')
  const post = (store.get('posts') || []).find(post => String(post.id) === id) || {}
  const profile = users?.find(user => user.id === post?.userId) || {}
  const [edit, setEdit] = useState()
  const [removing, setRemoving] = useState()

  return (
    <>
      <Comps.Meta
        title={post?.username}
        desc={post?.desc}
        url={`https://atunicorn.io/post/${id}`}
        cover={post?.url} />
      <Comps.Navalt />
      {edit && <Comps.Upload post={post} onClose={() => setEdit(false)} />}
      <Post.Container>
        <Post.Content removing={removing}>
          {(user && user?.id === ( profile?.id || post?.userId ) && !removing) && 
            <>
              <Post.Option>
                <Elems.Button
                  remove
                  icon="recycle"
                  iconSize="s3.5"
                  color="white"
                  onPress={() => act('APP_DELETEPOST', { userId: user?.id, postId: post?.id , url: post.url }).then(setRemoving(true), setTimeout(() => router.back(),1500))} />
              </Post.Option>
              <Post.Option edit>
                <Elems.Button
                  remove
                  icon="pencil"
                  iconSize="s3"
                  color="white"
                  onPress={() => setEdit(true)} />
              </Post.Option>
            </>
          }
          {removing 
            ? <Post.Wrap removing>
                <Elems.Icon style={Actheme.style('c:lightgray fs:s30')} icon="yin-yang" spin />
                <Post.Text removing>Removing</Post.Text>
              </Post.Wrap>
            : <>
                <Elems.Link href={`/profile/${post?.userId}`}>
                  <Post.Profile>
                    <Post.Wrap profile>
                      {profile?.url
                        ? <Post.Image source={profile.url} />
                        : <Elems.Icon style={Actheme.style('c:lightgray fs:s15')} icon="user-circle" solid />
                      }
                    </Post.Wrap>
                    <Post.Name>{`@${profile?.username || profile?.id}`}</Post.Name>
                  </Post.Profile>
                </Elems.Link>
                <Post.Wrap image>
                  {post?.url
                    ? <Post.Image source={[post.url, 'image'].join('#')} />
                    : <Elems.Icon style={Actheme.style('fs:s40 p:s20 c:lightgray')} spin icon="yin-yang" />
                  }
                </Post.Wrap>
                <Post.Wrap>
                  <Post.Text>{post?.desc || post?.userId}</Post.Text>
                </Post.Wrap>
              </>
          }
        </Post.Content>
      </Post.Container>
    </>
  )
}

const Post = Actheme.create({
  Container: ['ScrollView', ['f:1', {
    contentContainerStyle: Actheme.style('ai,jc:c p:s5 pt:s25 pb:s10')}]],
  Content: ['View', 'w:100% xw:s150 bw:1 bc:black50 br:s5 bg:white of:hd', {
    removing: 'xw:s90'
  }],
  Image: ['Image', 'w,h:100%'],
  Text: ['Text', 'fs:s5 p:s5', {
    removing: 'c:lightgray fb:500'
  }],
  Wrap: ['View', 'w:100%', {
    image: 'btw:1 bbw:1 bc:black50 ai,jc:c',
    profile: 'fd:row jc,ai:c w,h,br:s15 of:hd',
    removing: 'ai,jc:c w,h:90vw xw,xh:s90'}],
  Profile: ['View', 'w:100% fd:row ai:c p:s5'],
  Name: ['Text', 'fs:s4 fb:500 ml:s2'],
  Option: ['View', 'w,h,br:s8 bg:black200 ps:ab t,r:s2 ai,jc:c z:3', {
    edit: 'r:s12'
  }],
})