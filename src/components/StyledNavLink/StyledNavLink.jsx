import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

export const StyledNavLink = styled(NavLink)`
  color: #e7eaf6;

  &.active {
    color: #8ecdeb;
  }
`;
