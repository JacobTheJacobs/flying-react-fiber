import { Logo } from './logo'
import { Container, TopLeft, BottomLeft, BottomRight, Hamburger } from './styles'

export function Overlay() {
  return (
    <Container>
      <TopLeft>
        <h1>
          Cannabis
          <br />
          PAGES —
        </h1>
      </TopLeft>
      <BottomLeft>
        A runtime deconstruction of <a href="https://playful.software">playful.software</a>
      </BottomLeft>
      <BottomRight>
        Inspiration and ideas
        <br />
        Fundamentals
        <br />
        Finding models
        <br />
        Preparing them for the web
        <br />
        Displaying and changing models
        <br />
        Animation fundamentals
        <br />
        Effects and making things look good
        <br />
        Performance and time to load
        <br />
      </BottomRight>
      <Logo/>
    </Container>
  )
}
