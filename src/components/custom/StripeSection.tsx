import styled from 'styled-components';

const StripeSection = styled.div<{ active: boolean; nestedPadding: number }>`
  display: block;
  margin: 0;
  margin-top: 2px;
  padding: 4px 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #8792a2;

  transition: color 0.2s ease;

  &:hover {
    cursor: pointer;
    ${({ active }) => !active && `color: #2a2f45;`}
  }

  padding-left: ${({ nestedPadding }) => nestedPadding}px;

  ${({ active }) =>
    active &&
    `
    color: #556cd6;
    background: #f5fbff;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-right: 12px;
  `}
`;

export default StripeSection;
