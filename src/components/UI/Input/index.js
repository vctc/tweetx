import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding: 0.2rem 0.4rem;
  margin-bottom: 1rem;

  input {
    width: 100%;
    background: #f9f9f9;
    height: 50px;
    border-radius: 5px;
    padding: 10px;
    border: none;
    font-size: 1rem;
    color: #5d676d;
    outline: none;
  }
`;

export default ({
  type = "text",
  onBlur,
  name,
  value,
  onChange,
  placeholder,
  className
}) => {
  return (
    <Wrapper>
      <input
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        name={name}
        className={className}
      />
    </Wrapper>
  );
};
