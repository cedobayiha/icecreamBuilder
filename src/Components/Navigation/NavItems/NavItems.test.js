import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavItems from './Navitems';
import NavItem from '../NavItems/NavItem/NavItem';

configure({ adapter: new Adapter() });
let contain;
describe('<NavItems />', () => {
  beforeEach(() => {
    contain = shallow(<NavItems />)
  });
  it('should render 2 <NavItems /> elements if we are not authenticated', () => {

    expect(contain.find(NavItem)).toHaveLength(2);
  });

  it('should render 3 <NavItems /> elements if we are authenticated', () => {
    contain.setProps({ isAuth: true })
    expect(contain.find(NavItem)).toHaveLength(3);
  });

  it('should render 3 <NavItems /> elements if we are authenticated', () => {
    contain.setProps({ isAuth: true })
    expect(contain.contains(<NavItem link="/logout">Log out</NavItem>)).toEqual(true);
  });
});