import React from 'react'
import { Actheme } from '../theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Link = ({ href, prefetch, replace, scroll, shallow, assetPrefix = process.env.assetPrefix, ...rest }) => (
	<Styled.Link as={`${assetPrefix || ''}${href}`} href={href} passHref={true} prefetch={prefetch} replace={replace} scroll={scroll} shallow={shallow}>
	  <Styled.Text accessibilityRole="link" {...rest} />
	</Styled.Link>
)

const Styled = Actheme.create({
	Text: ['Text', 'c:yellow fb:bold fs:s10'],
	Link: 'Link'
})

const Icon = ({ svg, ...props }) => <FontAwesomeIcon {...props} alt={props.alt} icon={[ (props.solid ? 'fas' : props.brands ? 'fab' : 'fal'), props.icon || props.name]} solid={(props.solid?.toString())} />

const Button = Actheme.create({

  Touch: ['TouchableOpacity', 'jc,ai:c nw:s15 nh:s10', {
    post: 'bc:black100 br:s5 bg:mediumseagreen h:s12 mt:s5',
    seeMore : 'mt:s5 mb:s10 w:s50',
    disabled: 'op:0.25',
    inline: 'fd:row',
    nsfw: 'fd:row p:s2 bg:white mt:s5 br:s5 bw:1 bc:black50',
    loadingpost: 'w:100% xw,h:s100 jc,ai:c bw:1 bc:black50 br:s5 of:hd m:s5 bg:white',
    loadingprofile: 'w,h:100% jc,ai:c br:50% fs:s14 c:gainsboro',
    google: 'h:s12 bw:1 bc:black50 br:s5 mt:s5 w:s70 ph:s3'
  }],
  Text: ['Text', ['ta:c c:black fb:500 w:100% fs:s4', { numberOfLines: 1 }], {
    post: 'c:white',
    inline: 'ml:s2',
    icon: 'ta:l',
    nsfw: 'ml:s2', 
  }],
  Image: ['Image', 'w,h:100%'],

  Elem: ({text, source, info, size, icon, solid, iconColor, iconSize, imageWidth, imageHeight, fontSize, textColor, spin, post, disabled, inline, onPress, ...props}) => {
    return <Button.Touch info={info} post={post} inline={inline} disabled={disabled} spin={spin} onPress={!disabled ? onPress : null} {...props}>
      {source && <Button.Image source={source} style={Actheme.style([
        imageWidth && `w:${imageWidth}`, 
        imageHeight && `h:${imageHeight}`
      ].filter(item => item).join(' '))} />}
      {icon && <Icon color={Actheme.value(iconColor, 'color') || 'black'} style={Actheme.style(`fs:${iconSize || 's4'}`)} icon={icon} spin={spin} solid={solid} {...props} />}
      {text && <Button.Text icon={icon} post={post} inline={inline} style={Actheme.style([
        fontSize && `fs:${fontSize}`, 
        textColor && `c:${textColor}`
      ].filter(item => item).join(' '))} {...props}>{text}</Button.Text>}
    </Button.Touch>
  }

})

export default {
	Link,
	Icon,
	Button: Button.Elem
}
