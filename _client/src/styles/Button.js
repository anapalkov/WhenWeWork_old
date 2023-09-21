import styled from "styled-components";

const COLORS = {
  primary: {
    "--main": "indigo",
    "--accent": "white",
  },
  secondary: {
    "--main": "DarkSlateBlue",
    "--accent": "white",
  },
  tertiary: {
    "--main": "lavenderblush",
    "--accent": "indigo",
  }
};

function Button({ variant = "fill", color = "primary", ...props }) {
  let Component;
  if (variant === "fill") {
    Component = FillButton;
  } else if (variant === "outline") {
    Component = OutlineButton;
  }

  return <Component style={COLORS[color]} {...props} />;
}

const ButtonBase = styled.button`
  cursor: pointer;
  font-size: 1rem;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 4px 8px;
  text-decoration: none;
`;

const FillButton = styled(ButtonBase)`
  background-color: rgba(255, 255, 255, 0.5); /* 50% transparent white background */
  color: var(--accent);

  &:hover {
    opacity: 0.9;
  }
`;

const OutlineButton = styled(ButtonBase)`
  background-color: rgba(255, 255, 255, 0.5); /* 50% transparent white background */
  color: var(--main);
  border: 2px solid var(--main);

  &:hover {
    background: hsl(235deg 85% 97%);
  }
`;

export default Button;
