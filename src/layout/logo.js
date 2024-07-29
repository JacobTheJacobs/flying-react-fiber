import styled from 'styled-components'

export const Image = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0) rotate(0deg);
  width: 75%;
  height: 75%;
  & g.skin {
    cursor: pointer;
  }
`

export function Logo() {
  return (
    <a href="0xca0a.gumroad.com/l/B4N4N4S">

    </a>
  )
}
