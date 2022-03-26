import React from 'react'
import { Actheme } from '../../theme'
import Elems from '../../elems'

const Placeholder = Actheme.create({

  Container: ['View', 'f:1 ai:c w:100%', {
    flatlist: 'mt:s2.5',
    modal: 'ps:ab',
    screen: 'mt:s25'
  }],
  Content: ['View', 'bg:white br:s5 w:100% nh,xw:s90 ai,jc:c bw:1 bc:black50 p:s5', {
    modal: 'bg:grey bc:grey',
    post: 'bc:white',
    profile: 'bc:white'
  }],
  Text: ['Text', 'c:black300 fb:500 fs:s5 p:s5 ta:c', {
    title: 'c:black400 fs:s4.5',
    desc: 'c:black400 fb:400 fs:s4.25 p:0 mb:s5',
    profile: 'fs:s2.5 p:s1.5'
  }],
  Wrap: ['View', 'ai,jc:c ps:fixed l,r,t,b:0 z:999 bg:white'],
  Image: ['Image', 'w,h,br:s40'],

  Comp: (props) => {

    const {
      icon, 
      spin, 
      title, 
      flatlist, 
      modal, 
      screen, 
      post,
      logo, 
      image,
      action, 
      actionText, 
      actionTextColor, 
      desc, 
      disabled,
      profile } = props

    return (
      <Placeholder.Container flatlist={flatlist} modal={modal} screen={screen}>
        <Placeholder.Content modal={modal} post={post} profile={profile}>
          {(logo || image)
            ? <Placeholder.Image source={logo ? '/static/unilogo.gif' : image || null} />
            : icon &&
              <Elems.Icon icon={icon || 'yin-yang'} iconColor="black100" iconSize={profile ? 's10' : 's30'} spin={spin} />
          }
          {title && <Placeholder.Text title={desc} modal={modal} profile={profile}>{title || 'Empty'}</Placeholder.Text>}
          {desc && <Placeholder.Text desc={desc}>{desc || 'Empty'}</Placeholder.Text>}
          {action && <Elems.Button text={actionText} onPress={action} disabled={disabled} textColor={actionTextColor || 'lightsalmon'} style={Actheme.style('mt:s5')} />}
        </Placeholder.Content>
      </Placeholder.Container>
    )
  }
})

export default Placeholder.Comp
