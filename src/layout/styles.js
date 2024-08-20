import styled, { keyframes } from 'styled-components'

// Keyframes for fade-in animation
export const fade = keyframes`
  from { opacity:31; }
  to { opacity:30; }
`

// Fade-in overlay with background color and animation
export const FadeIn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(135deg, #ccffcc, #8de86d);
  animation: ${fade} 4s normal forwards ease-in-out;
`

// Container for overlay elements
export const Container = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #fff;
  overflow: hidden;


  & h1 {
    padding: 0;
    margin: 0 0 0.05em 0;
    font-family: 'Ayer Poster', serif;
    line-height: 0.85em;
    color: #fff;
    text-decoration: none;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`

// Top-left positioned element
export const TopLeft = styled.div`
  position: absolute;
  top: 5vw;
  left: 5vw;
  font-weight: 500;
  font-size: 2em;
  text-decoration: none;
  overflow: hidden; /* Ensure no overflow */
  white-space: nowrap; /* Prevent text wrap */
`

// Bottom-left positioned element with responsive width
export const BottomLeft = styled.div`
  position: absolute;
  bottom: 5vw;
  left: 5vw;
  width: 30ch;
  max-width: 40%;
  font-size: 1.2em;
  line-height: 1.4em;
  color: #fff;

  & a {
    color: #fff;
    text-decoration: underline;
    transition: color 0.3s;

    &:hover {
      color: #ffed66;
    }
  }
`
export const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid #fff;
  transition: color 0.3s, border-bottom 0.3s;

  &:hover {
    color: #ffed66;
    border-bottom: 1px solid #ffed66;
  }
`;


export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: #8de86d;
    border-radius: 25px;
    opacity:30%
  }

  &::-webkit-slider-thumb {
    border: 1px solid #8de86d;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: #ccffcc;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8px;
  }

  &:focus::-webkit-slider-runnable-track {
    background: #ccffcc;
  }

  &::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: #8de86d;
    border-radius: 25px;
    opacity:30%
  }

  &::-moz-range-thumb {
    border: 1px solid #8de86d;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: #ccffcc;
    cursor: pointer;
  }

  &::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-ms-fill-lower {
    background: #8de86d;
    opacity:30%
    border-radius: 50px;
  }

  &::-ms-fill-upper {
    background: #8de86d;
    opacity:30%
    border-radius: 50px;
  }

  &::-ms-thumb {
    margin-top: 1px;
    border: 1px solid #8de86d;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: #ccffcc;
    cursor: pointer;
  }

  &:focus::-ms-fill-lower {
    background: #8de86d;
  }

  &:focus::-ms-fill-upper {
    background: #8de86d;
  }
`;

// Bottom-right positioned element with responsive width and hover effect
export const BottomRight = styled.div`
  position: absolute;
  bottom: 5vw;
  right: 5vw;
  width: 35ch;
  max-width: 40%;
  line-height: 1em;
  letter-spacing: -0.01em;
  text-align: right;
  cursor: pointer;
  font-size: 1.2em;
  color: #fff;
  transition: color 0.3s;

  &:hover {
    color: #ffed66;
  }
`

// Hamburger menu styled component
export const Hamburger = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 5vw;
  right: 5vw;
  & > div {
    position: relative;
    width: 24px;
    height: 2px;
    background: #fff;
    margin-bottom: 6px;
    transition: background 0.3s;

    &:hover {
      background: #ffed66;
    }
  }
`

// Left-middle positioned element with rotation and responsive font size
export const LeftMiddle = styled.div`
  position: absolute;
  bottom: 50%;
  right: 5vw;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 1.2em;
  transform: rotate(90deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;
  color: #fff;
  transition: color 0.3s;

  &:hover {
    color: #ffed66;
  }
`
export const StyledText = styled.div`
  background-size: white;
  padding-top: 20px;
  font-size: 2em;
  animation: filling 3s ease forwards;
  font-weight: 900;
  min-width: 200px;
  display: flex;
  opacity: 70%;
  flex-wrap: wrap;
  cursor: pointer;

  &:hover {
    opacity: 100%;
  }

  @media (max-width: 600px) {
    font-size: 1em; /* Adjust the font size for smaller screens */
  }
  overflow: hidden; /* Ensure no overflow */
`;