import {
  Container,
  TopLeft,
  BottomLeft,
  BottomRight,
  StyledLink,
  IconWrapper,
  StyledInput,
  StyledText,
} from "./styles";


export function Overlay({ speed, set }) {
  return (
    <Container>
      <TopLeft>
        <StyledText>
          Inspiration and ideas 
        </StyledText>
      </TopLeft>
      <BottomLeft></BottomLeft>
      <BottomRight>
        <IconWrapper>
          <StyledInput
            type="range"
            min="0"
            max="5"
            value={speed}
            step="1"
            onChange={(e) => set(Number(e.target.value))}
          />
        </IconWrapper>
        <br/>
        <span style={{paddingRight:"80px"}}>

        </span>
        Made by <StyledLink href="https://example.com">Jake</StyledLink>
      </BottomRight>
    </Container>
  );
}
