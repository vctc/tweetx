import styled, { css } from "styled-components";

export default styled.button`
  color: #fff;
  background: #ff748c;
  border-radius: 5px;
  font-size: 16px;
  letter-spacing: 1px;
  box-shadow: 8px 8px 8px -3px rgba(0, 0, 0, 0.1);
  border: none;
  outline: none;

  cursor: pointer;
  margin-bottom: 0.5rem;
  width: 100px;
  height: 40px;

  ${props => {
    return (
      props.ui === "flat" &&
      css`
      background: transparent;
      color: #5D676D;
      box-shadow: none;
      border: 1px solid lightgrey;
      border-radius: 12px;
			}
	`
    );
  }}

  ${props => {
    return (
      props.ui === "no-border" &&
      css`
      background: transparent;
      color: #5D676D;
      box-shadow: none;
      border: none;
      border-radius: 12px;
			}
	`
    );
  }}
`;
